const axios = require("axios");
const Blog = require("../models/Blog");

module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBlog: async (req, res) => {
    try {
      const { title, content } = req.body;

      // Call ChatGPT API to enhance content
      const enhancedContent = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: content,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer <YOUR_OPENAI_API_KEY>",
          },
        }
      );

      const newBlog = new Blog({
        title,
        content: enhancedContent.data.choices[0].text,
      });

      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
