require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const MONGODB_URI = process.env.MONGODB_URI;
const jwt = require("jsonwebtoken");

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (_, args) => {
      console.log(args.genre);
      if (args.author && args.genre)
        return Book.find({
          author: args.author,
          genres: { $all: [args.genre] },
        }).populate("author");
      else if (args.author)
        return Book.find({ author: args.author }).populate("author");
      else if (args.genre)
        return Book.find({ genres: { $all: [args.genre] } }).populate("author");
      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const nauthors = await Promise.all(
        authors.map(async (a) => {
          const bookCount = await Book.countDocuments({ author: a._id });
          return {
            ...a.toObject(),
            bookCount,
          };
        })
      );
      return nauthors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError("not authenticated");
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        author = newAuthor.save();
      }
      if (args?.title < 2) {
        throw new UserInputError("Too short book title", {
          invalidArgs: args.title,
        });
      } else if (args?.author < 4) {
        throw new UserInputError("Too short author name", {
          invalidArgs: args.author,
        });
      }
      const book = new Book({ ...args, author: author._id });
      const nbook = await book.save();
      return {
        ...nbook.toObject(),
        author: { ...author.toObject(), name: args.author },
      };
    },
    editAuthor: async (_, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError("not authenticated");

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (_, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre || "nothing",
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret")
        throw new UserInputError("wrong credentials");
      const userForToken = {
        id: user._id,
        username: user.username,
        favoriteGenre: user.favoriteGenre || "nothing",
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
