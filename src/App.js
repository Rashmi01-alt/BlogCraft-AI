import React from "react";
import Header from "./components/Header";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import styles from "./index.css";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <BlogForm />
        <BlogList />
      </div>
    </div>
  );
};

export default App;
