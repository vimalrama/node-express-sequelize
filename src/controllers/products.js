const {Product} = require('../models/user')
const {isArray} = require('util')


exports = module.exports = {
    getAllProducts: () => {
        return Product.findAll({})
    },
    
    addProduct: async (reqBody) => {

        //Validate data
        if (!reqBody.name) {
            throw new Error("Cannot create product without name")
        }
        // Add more such validations here

        return Product.create({
            name: reqBody.name,
            vendor: reqBody.vendor,
            price: reqBody.price,
            category: reqBody.category
        })


    },
    deleteProduct: async(reqBody) => {
       return Product.destroy({
            where: {
                id: reqBody.id
            }
        })   
    }   
}