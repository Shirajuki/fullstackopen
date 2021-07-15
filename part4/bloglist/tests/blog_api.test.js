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
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYjIiLCJpZCI6IjYwZjAwZDExMmVlMTBjNmZkODdhNTY4NyIsImlhdCI6MTYyNjM0NDkxN30.47Dj3xpvzFEBvc4nBhMn4FCO1FbGXWFvXqXiw4JL3QY";
beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});
const baseUrl = "/api/blogs";
describe("GET /api/blogs", () => {
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

    const titles = response.body.map((b) => b.title);
    expect(titles).toContain("Bob the builder - trilogy");
  });
  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get(baseUrl);

    const blogs = response.body;
    expect(blogs[0].id).toBeDefined();
  });
});

describe("POST /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Bob the builder last book",
      author: "Bob",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
    };

    await api
      .post(baseUrl)
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(baseUrl);
    const titles = response.body.map((b) => b.title);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Bob the builder last book");
  });
  test("a valid blog can be added with missing likes property defaulting to zero", async () => {
    const newBlog = {
      title: "Bob the builder last book",
      author: "Bob",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post(baseUrl)
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(baseUrl);
    const titles = response.body.map((b) => b.title);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Bob the builder last book");
    expect(response.body[initialBlogs.length].likes).toBe(0);
  });
  test("a valid blog can be added with missing likes property defaulting to zero", async () => {
    const newBlog = {
      title: "Bob the builder last book",
      author: "Bob",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post(baseUrl)
      .set({ Authorization: token })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(baseUrl);
    const titles = response.body.map((b) => b.title);
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Bob the builder last book");
    expect(response.body[initialBlogs.length].likes).toBe(0);
  });
  test("a blog cannot be added when property title are missing", async () => {
    const newBlog = {
      author: "Bob",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 0,
    };

    await api
      .post(baseUrl)
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(baseUrl);
    expect(response.body).toHaveLength(initialBlogs.length);
  });
  test("a blog cannot be added when property url are missing", async () => {
    const newBlog = {
      title: "Bob the builder last book",
      author: "Bob",
      likes: 0,
    };

    await api
      .post(baseUrl)
      .set({ Authorization: token })
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(baseUrl);
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});
describe("DELETE /api/blogs/:id", () => {
  test("a blog can be deleted", async () => {
    const r = await api.get(baseUrl);
    const ids = r.body.map((b) => b.id);

    const id = ids[1];
    await api
      .delete(`${baseUrl}/${id}`)
      .set({ Authorization: token })
      .expect(204);

    const response = await api.get(baseUrl);
    const titles = response.body.map((b) => b.title);
    expect(response.body).toHaveLength(initialBlogs.length - 1);
    expect(titles).not.toContain(initialBlogs[1].title);
  });
  test("deleting an invalid blog id does nothing", async () => {
    const id = "asdfg";
    await api
      .delete(`${baseUrl}/${id}`)
      .set({ Authorization: token })
      .expect(400);

    const response = await api.get(baseUrl);
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});
describe("PUT /api/blogs/:id", () => {
  test("a blog can edited", async () => {
    const r = await api.get(baseUrl);
    const ids = r.body.map((b) => b.id);

    const newBlog = { ...initialBlogs[1], id: ids[1], likes: 10 };

    await api
      .put(`${baseUrl}/${newBlog.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(baseUrl);
    expect(response.body).toHaveLength(initialBlogs.length);
    expect(response.body[1].likes).toBe(10);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
