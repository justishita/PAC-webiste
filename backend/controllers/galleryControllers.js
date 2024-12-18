const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');
const supportedFileExtensions = ["jpg", "png", "jpeg"];
// const createCategory = async (req, res) => {
//   try {
//     const { categoryName } = req.body;
//     const { image } = req.files;

//     if (!categoryName || !image) {
//       return res.status(400).json({
//         success: false,
//         message: "Category name and image are required.",
//       });
//     }
//     const fileExtension = image.name.split('.').pop().toLowerCase();
//     if (!supportedFileExtensions.includes(fileExtension)) {
//       return res.status(400).json({
//         success: false,
//         message: "File extension is not supported. Use jpg, png, or jpeg.",
//       });
//     }
//     const fileName = `${Date.now()}.${fileExtension}`;
//     const imagePath = path.join(__dirname, 'frontend', 'public', 'images', fileName);
//     try {
//       fs.renameSync(image.tempFilePath, imagePath);
//     } catch (err) {
//       console.error("Failed to store image:", err);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to store image.",
//       });
//     }

//     let category = await Category.findOne({ name: categoryName });
//     if (!category) {
//       category = await Category.create({
//         name: categoryName,
//         images: [`http://127.0.0.1:${process.env.PORT}/images/${fileName}`],
//       });
//     } else {
//       category.images.push(`http://127.0.0.1:${process.env.PORT}/images/${fileName}`);
//       await category.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Category created/updated successfully.",
//       category,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create/update category.",
//     });
//   }
// };
//
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const { image } = req.files;

    if (!categoryName || !image) {
      return res.status(400).json({
        success: false,
        message: "Category name and image are required.",
      });
    }
    const fileExtension = image.name.split('.').pop().toLowerCase();
    if (!supportedFileExtensions.includes(fileExtension)) {
      return res.status(400).json({
        success: false,
        message: "File extension is not supported. Use jpg, png, or jpeg.",
      });    }

    const fileName = `${Date.now()}.${fileExtension}`;

    const destinationDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'images');
    console.log("Destination Directory:", destinationDir);
    
    const imagePath = path.join(destinationDir, fileName);
    console.log("Image Path:", imagePath);

    // Ensure destination directory exists
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
      console.log("Created destination directory:", destinationDir);
    }
    // Use the `mv` method to move the file
    await image.mv(imagePath, (err) => {
      if (err) {
        console.error("Failed to move image:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to store image.",
        });
      } else {
        console.log("Image moved successfully to:", imagePath);
      }
    });    

    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({
        name: categoryName,
        images: [`http://127.0.0.1:${process.env.PORT}/images/${fileName}`],
      });
    } else {
      category.images.push(`http://127.0.0.1:${process.env.PORT}/images/${fileName}`);
      await category.save();
    }

    res.status(200).json({
      success: true,
      message: "Category created/updated successfully.",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create/update category.",
    });
  }
};

// 
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    let category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    category.images.forEach((imageUrl) => {
      const imageName = path.basename(imageUrl);
      const imagePath = path.join(__dirname, '..', 'public', 'images', imageName);

      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    });

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
    });
  }
};

// Update a category's name
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { newName } = req.body;

    if (!newName) {
      return res.status(400).json({
        success: false,
        message: "New category name is required.",
      });
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name: newName },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update category.",
    });
  }
};

module.exports = { createCategory, getCategories, deleteCategory, updateCategory };



