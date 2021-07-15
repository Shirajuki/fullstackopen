const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const max = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === max);
};

const mostBlogs = (blogs) => {
  const authors = {};
  let max = 0;
  let author;
  for (const blog of blogs) {
    authors[blog.author] = (authors[blog.author] ?? 0) + 1;
    if (authors[blog.author] > max) {
      max = authors[blog.author];
      author = blog.author;
    }
  }
  if (!author) return null;
  return { author: author, blogs: max };
};

const mostLikes = (blogs) => {
  const authors = {};
  let max = 0;
  let author;
  for (const blog of blogs) {
    authors[blog.author] = (authors[blog.author] ?? 0) + blog.likes;
    if (authors[blog.author] > max) {
      max = authors[blog.author];
      author = blog.author;
    }
  }
  if (!author) return null;
  return { author: author, likes: max };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
