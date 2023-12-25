import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs/get")
      .then((response) => {
        console.log("Original data:", response.data);
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        console.log("Sorted data:", sortedBlogs);
        setBlogs(sortedBlogs);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching blogs. Please check the console for details.");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Latest Blogs</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
