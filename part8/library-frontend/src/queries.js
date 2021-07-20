import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
    }
  }
`;
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`;
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
      born
    }
    published
    genres
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`;
