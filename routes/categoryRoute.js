const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const {categoryController} = require('../controllers/categoryController')

const categoryRoute = express.Router()

categoryRoute.post('/category', categoryController.createCategory);
categoryRoute.get('/category', categoryController.getCategory);
categoryRoute.put('/category/:id', categoryController.updateCategory);
categoryRoute.delete('/category/:id', categoryController.deleteCategory);


module.exports = categoryRoute;