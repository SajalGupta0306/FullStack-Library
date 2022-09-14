const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// Get All Authors
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (
    req.query.searchedAuthorName !== null &&
    req.query.searchedAuthorName !== ""
  ) {
    searchOptions.name = new RegExp(req.query.searchedAuthorName, "i");
  }
  // {} means no condition and get everything
  try {
    const authorsList = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authorsList,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

// new author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create a new Author
router.post("/", async (req, res) => {
  const author = req.body.authorName; // authorName is defined in the formFields.ejs
  const authorObj = new Author({
    name: author,
  });
  try {
    const response = await authorObj.save();
    // res.redirect(`author/${response.id}`);
    res.redirect("author"); // redirects to the /author route
  } catch {
    // redirects to the new.ejs file
    res.render("authors/new", {
      author: authorObj,
      errorMessage: "Error creating author...",
    });
  }
});

module.exports = router;
