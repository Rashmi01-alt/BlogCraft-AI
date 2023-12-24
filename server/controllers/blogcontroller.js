const axios = require("axios");
const Blog = require("../models/Blog");

 const  getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

 const createBlog = async (req, res) => {
   try {
     const { title, content } = req.body;

     // Call ChatGPT API to enhance content
     const enhancedContent = await axios.post(
       "https://api.openai.com/v1/engines/davinci/completions",
       {
         //model: "gpt-3.5-turbo",
         prompt: content,
         max_tokens: 150,
       },
       {
         headers: {
           "Content-Type": "application/json",
           Authorization:
             "Bearer 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",
         },
       }
     );
     //  const response = await axios.post(
     //    "https://api.openai.com/v1/chat/completions",
     //    {
     //      model: "gpt-3.5-turbo",
     //      messages: [
     //        { role: "system", content: "You are a helpful assistant." },
     //        { role: "user", content: content },
     //      ],
     //    },
     //    {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
     //      headers: {
     //        "Content-Type": "application/json",
     //        Authorization:
     //          "Bearer  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",
     //      },
     //    }
     //  );

     const newBlog = new Blog({
       title,
       content: enhancedContent.data.choices[0].text,
     });

     const savedBlog = await newBlog.save();
     res.status(201).json(savedBlog);
   } catch (error) {
     console.error("Error creating blog:", error); // Log the error
     res.status(500).json({ message: "Internal Server Error" });
   }
 };

  module.exports = { createBlog, getAllBlogs };