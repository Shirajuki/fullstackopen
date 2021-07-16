import React from "react";
import "@testing-library/jest-dom/extend-expect";
// import { prettyDOM } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("blog rendering", () => {
  const blog = {
    id: 1,
    title: "Test blog",
    author: "Test author",
    url: "https://test.url.com/",
    likes: 123,
    user: "1337",
  };
  test("renders content", () => {
    const component = render(
      <Blog blog={blog} likeBlog={() => ""} deleteBlog={() => ""} />
    );
    const div = component.container.querySelector(".blog");
    const divHidden = div.querySelector("div[hidden]");
    // component.debug();
    // console.log(prettyDOM(div));
    expect(div).toHaveTextContent("Test blog Test author");
    expect(divHidden).toHaveTextContent("url: https://test.url.com/likes: 123");
  });
  test("clicking the button calls event handler once", () => {
    const component = render(
      <Blog blog={blog} likeBlog={() => ""} deleteBlog={() => ""} />
    );
    const button = component.getByText("view");
    fireEvent.click(button);
    const div = component.container.querySelector(".togglableContent");
    // console.log(prettyDOM(div));
    expect(div).not.toHaveAttribute("hidden");
    expect(div).toHaveTextContent("url: https://test.url.com/likes: 123");
  });
  test("clicking like twice calls event handler twice", () => {
    const mockHandler = jest.fn();
    const component = render(
      <Blog blog={blog} likeBlog={mockHandler} deleteBlog={() => ""} />
    );
    const button = component.getByText("like");
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(1);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
