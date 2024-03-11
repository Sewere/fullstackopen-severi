describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/api/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, {
      username: "Sepi",
      password: "salainen",
    }).then((response) => {
      localStorage.setItem("loggedBlogUser", JSON.stringify(response.body));
      cy.visit("");
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("Logout").click();
    cy.contains("login");
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-btn").click();

    cy.contains("Wrong credentials");
  });

  it("login button shows error with no credentials", function () {
    cy.contains("Logout").click();
    cy.contains("login").click();
    cy.contains("Wrong credentials");
  });

  it("user can login", function () {
    cy.contains("Logout").click();
    cy.get("#username").type("Sepi");
    cy.get("#password").type("salainen");
    cy.get("#login-btn").click();
    cy.contains("logged in");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Sepi", password: "salainen" });
    });

    it("new blog can be made", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("New Blog Title");
      cy.get("#author").type("Author Name");
      cy.get("#url").type("https://example.com");
      cy.get("#save-btn").click();
      cy.contains("New Blog Title");
    });

    it("user can like blog", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("New Blog Title");
      cy.get("#author").type("Author Name");
      cy.get("#url").type("https://example.com");
      cy.get("#save-btn").click();
      cy.contains("Show Info").click();
      cy.get("#like-btn").click();
      cy.contains("Likes: 1");
    });

    it("user who made blog can delete it", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("New Blog Title");
      cy.get("#author").type("Author Name");
      cy.get("#url").type("https://example.com");
      cy.get("#save-btn").click();
      cy.contains("Show Info").click();
      cy.contains("Delete").click();
      cy.contains("New Blog Title Author Name").should("not.exist");
    });

    it("only user who made blog can see the delete button", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("titteli");
      cy.get("#author").type("authori");
      cy.get("#url").type("www.fi");
      cy.get("#save-btn").click();
      cy.contains("Logout").click();
      cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, {
        username: "someUser",
        password: "password",
      });
      cy.contains("login").click();
      cy.get("#username").type("someUser");
      cy.get("#password").type("password");
      cy.get("#login-btn").click();
      cy.contains("Show Info").click();
      cy.contains("titteli").should("not.contain", "Remove");
    });

    it("blogs are ordered by likes", function () {
      cy.createBlog({
        title: "First Blog",
        author: "Author A",
        url: "https://example.com",
      });
      cy.createBlog({
        title: "Second Blog",
        author: "Author B",
        url: "https://example.com",
      });
      cy.createBlog({
        title: "Third Blog",
        author: "Author C",
        url: "https://example.com",
      });

      cy.contains("First Blog")
        .parent()
        .find(".visible-btn")
        .as("firstBlogShowInfoButton");
      cy.contains("Second Blog")
        .parent()
        .find(".visible-btn")
        .as("secondBlogShowInfoButton");
      cy.contains("Third Blog")
        .parent()
        .find(".visible-btn")
        .as("thirdBlogShowInfoButton");

      cy.get("@firstBlogShowInfoButton").click();
      cy.get("@secondBlogShowInfoButton").click();
      cy.get("@thirdBlogShowInfoButton").click();

      cy.contains("First Blog")
        .parent()
        .find(".like-btn")
        .as("firstBlogLikeButton");
      cy.contains("Second Blog")
        .parent()
        .find(".like-btn")
        .as("secondBlogLikeButton");
      cy.contains("Third Blog")
        .parent()
        .find(".like-btn")
        .as("thirdBlogLikeButton");

      cy.get("@firstBlogLikeButton").click();
      cy.get("@secondBlogLikeButton").click().click().click();
      cy.get("@thirdBlogLikeButton").click().click().click().click().click();

      cy.get(".blog").should("have.length", 3);
      cy.get(".blog").eq(0).should("contain", "Third Blog");
      cy.get(".blog").eq(1).should("contain", "Second Blog");
      cy.get(".blog").eq(2).should("contain", "First Blog");
    });
  });
});
