const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const initialBlogs = [
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful - part 1",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
  },
  {
    id: "5a422aa71b54a676234d17fb",
    title: "Bob the builder - trilogy",
    author: "Bob",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});
describe("GET /api/blogs", () => {
  const baseUrl = "/api/blogs";
  test("blogs are returned as json", async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("all notes are returned", async () => {
    const response = await api.get(baseUrl);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get(baseUrl);

    const contents = response.body.map((b) => b.title);
    expect(contents).toContain("Bob the builder - trilogy");
  });
  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get(baseUrl);

    const contents = response.body;
    expect(contents[0].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
