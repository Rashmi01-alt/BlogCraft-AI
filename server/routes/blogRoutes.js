const express = require("express");
const router = express.Router();

const { getAllBlogs, createBlog } = require("../controllers/blogcontroller");

router.get("/get", getAllBlogs);
router.post("/create", createBlog);

module.exports = router;
