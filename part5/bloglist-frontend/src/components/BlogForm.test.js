import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("blogform rendering", () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "https://test.url.com/",
  };
  test("renders content", () => {
    const component = render(<BlogForm createBlog={() => ""} />);
    const div = component.container.querySelector(".blogForm");
    // component.debug();
    // console.log(prettyDOM(div));
    expect(div).toHaveTextContent("title author url");
  });

  test("check if eventhandler is called with correct details", () => {
    const getBlogInfo = (createdBlog) => {
      expect(createdBlog).toEqual(
        expect.objectContaining({
          title: "Test blog",
          author: "Test author",
          url: "https://test.url.com/",
        })
      );
    };
    const component = render(<BlogForm createBlog={getBlogInfo} />);
    const button = component.getByText("create");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    fireEvent.change(title, { target: { value: blog.title } });
    expect(title.value).toBe("Test blog");

    fireEvent.change(author, { target: { value: blog.author } });
    expect(author.value).toBe("Test author");

    fireEvent.change(url, { target: { value: blog.url } });
    expect(url.value).toBe("https://test.url.com/");

    fireEvent.click(button);
  });
});
