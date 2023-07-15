const { default: mongoose } = require("mongoose");
const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    return res.status(200).send({
      blogCount: blogs.length,
      message: "get all blogs",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in getAllBlogs ", success: false, error });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "blog not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "get blog successful",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in get blog by id ", success: false, error });
  }
};
exports.getBlogsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("blogs");
    if (!user) {
      return res.status(404).send({
        message: "user not found!",
        success: false,
      });
    }
    return res.status(200).send({
      message: "get blogs by user",
      blogsCount: user.blogs.length,
      blogs: user.blogs,
      success: true,
    });
  } catch (error) {}
};
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "please provide required fields",
        success: false,
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser)
      return res.status(404).send({
        message: "user not found",
        success: false,
      });
    const blog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(201).send({
      message: "post creation succesful",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in creating blog", success: false, error });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "blog updated",
      success: true,
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in updating blog", success: false, error });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res
      .status(200)
      .send({ message: "Done deleting blog", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in deleting blog", success: false, error });
  }
};
