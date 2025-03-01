const Category = require('../models/categoryModel')

const categoryController = {
    async createCategory(req, res) {
        try {
            const {name} = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: 'Category name is required'
                })
            }

            const data = {
                name
            }

            const category = await Category.create(data)

            return res.status(201).json({
                success: true,
                message: 'Category event created',
                data: category
            })
        } catch (error) {
            console.log(error)

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async getCategory(req, res) {
        try {
            const category = await Category.find()

            return res.status(200).json({
                success: true,
                message: 'Get data category success',
                data: category
            })
        } catch (error) {
            console.log(error)

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    
    async updateCategory(req, res) {
        try {
            const {id} = req.params;

            const data = {
                name: req.body.name
            }

            const category = await Category.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
            );

            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'Category not found'
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Category success updated',
                data: category
            })

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
            
        }
    },

    async deleteCategory(req, res) {
        try {
            const {id} = req.params;

            const category = await Category.findOneAndDelete({_id: id})

            if (!category) {
                return res.status(400).json({
                    success: true,
                    message: 'Category not found'
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Category success deleted'
            })
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })

        }
    }
} 

module.exports = {categoryController}