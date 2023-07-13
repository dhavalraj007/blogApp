const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
} = require("../controllers/blogController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("/all-blogs", authenticateToken, getAllBlogs);
router.get("/blog/:id", authenticateToken, getBlogById);
router.get("/user-blogs/:id", authenticateToken, getBlogsByUser);
router.post("/create-blog", authenticateToken, createBlog);
router.put("/update-blog/:id", authenticateToken, updateBlog);
router.delete("/delete-blog/:id", authenticateToken, deleteBlog);

module.exports = router;
