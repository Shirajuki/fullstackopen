describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.get("#login-button").contains("login");
  });
});
describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Bloglist");
    cy.contains(
      "Bloglist app, Department of Computer Science, University of Helsinki 2021"
    );
  });
  it("login fails with wrong password", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });
  it("login form can be opened", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.contains("Matti Luukkainen logged in");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
      cy.createBlog({
        title: "first blog",
        author: "cypress",
        url: "https://cypress.created.this.blog/",
      });
      cy.createBlog({
        title: "second blog",
        author: "cypress",
        url: "https://cypress.created.this.blog/",
      });
      cy.createBlog({
        title: "third blog",
        author: "cypress",
        url: "https://cypress.created.this.blog/",
      });
      cy.createBlog({
        title: "fourth blog",
        author: "cypress",
        url: "https://cypress.created.this.blog/",
      });
    });
    it("a new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("input#title").type("a blog created by cypress");
      cy.get("input#author").type("mr.cypress");
      cy.get("input#url").type("https://cypress.created.this.blog/");
      cy.wait(150);
      cy.get("#submit-blog").click({ force: true });
      cy.contains("a blog created by cypress");
    });

    it("user can like a blog", function () {
      cy.contains("first blog").siblings().contains("view").click();
      cy.contains("first blog").siblings().contains("like").click();
      cy.contains("first blog").siblings().contains("likes: 1");
    });
    it("user can delete a blog", function () {
      cy.contains("second blog").siblings().contains("view").click();
      cy.contains("second blog").siblings().contains("remove").click();
      cy.get("html").get("div#root").should("not.contain", "second blog");
    });
    it.only("liking blogs will sort blogs after", function () {
      cy.contains("first blog").siblings().contains("view").click();
      cy.contains("first blog").siblings().contains("like").click();
      cy.contains("first blog").siblings().contains("likes: 1");
      cy.wait(300);
      cy.contains("first blog cypress").siblings().contains("like").click();
      cy.contains("first blog cypress").siblings().contains("likes: 2");
      cy.wait(300);
      cy.contains("third blog").siblings().contains("view").click();
      cy.contains("third blog").siblings().contains("like").click();
      cy.contains("third blog").siblings().contains("likes: 1");
      cy.wait(300);
      let expectedOrdering = [
        "first blog",
        "third blog",
        "second blog",
        "fourth blog",
      ];
      cy.get("div.blog")
        .should("have.length", 4)
        .each(() => ($el, index) => {
          expect($el).should("contain", expectedOrdering[index]);
        })
        .then(($lis) => {
          expect($lis).to.have.length(4);
        });
      cy.contains("third blog cypress").siblings().contains("like").click();
      cy.contains("third blog cypress").siblings().contains("likes: 2");
      cy.wait(300);
      cy.contains("third blog cypress").siblings().contains("like").click();
      cy.contains("third blog cypress").siblings().contains("likes: 3");
      cy.wait(300);
      expectedOrdering = [
        "third blog",
        "first blog",
        "second blog",
        "fourth blog",
      ];
      cy.get("div.blog")
        .should("have.length", 4)
        .each(() => ($el, index) => {
          expect($el).should("contain", expectedOrdering[index]);
        })
        .then(($lis) => {
          expect($lis).to.have.length(4);
        });
    });
  });
});
