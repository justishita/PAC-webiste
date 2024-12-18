const express = require('express');
const router = express.Router();
const {createCategory, getCategories,deleteCategory,updateCategory} = require('../controllers/galleryControllers');

router.post('/create', createCategory);

router.get('/get', getCategories);

router.delete('/delete/:categoryId', deleteCategory);

router.put('/update/:categoryId', updateCategory);

module.exports = router;

