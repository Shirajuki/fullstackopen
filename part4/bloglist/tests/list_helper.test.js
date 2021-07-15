const listHelper = require("../utils/list_helper");
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful - part 1",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const listWithMultipleBlog = [
  ...listWithOneBlog,
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "Go To Statement Considered Harmful - part 2",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17fa",
    title: "Go To Statement Considered Harmful - part 3",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17fb",
    title: "Bob the builder - trilogy",
    author: "Bob",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
    __v: 0,
  },
];
test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMultipleBlog);
    expect(result).toBe(7);
  });
});
describe("favorite blog", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog equals that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlog);
    expect(result).toEqual(listWithMultipleBlog[0]);
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog equals that", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 3 });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog equals that", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(listWithMultipleBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 7 });
  });
});
