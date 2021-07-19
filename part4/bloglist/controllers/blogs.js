const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" });
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id)
    return response.status(401).json({ error: "token missing or invalid" });
  const userId = request?.user?.id || "";
  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else response.status(403).end();
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post("/:id/comment", async (request, response) => {
  const body = request.body;
  if (!body.comment) response.status(403).end();
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: [body.comment] } },
    {
      runValidators: true,
    }
  ).populate("user");
  response.json(updatedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    runValidators: true,
    new: true,
  }).populate("user");
  response.json(updatedBlog);
});
module.exports = blogsRouter;
