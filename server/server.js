const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { dbconnect } = require("./config/database");

const blogRoutes  = require("./routes/blogRoutes");


const PORT = 5000;
dbconnect();

app.use(cors({ origin: "*" }));
app.use(express.json());

// mongoose.connect(
//   "mongodb://localhost:27017/AI",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
 
// );

app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
