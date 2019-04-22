const route = require('express').Router()
const ctrl = require('../controllers/products')

route.get('/', (req, res) => {
    ctrl.getAllProducts(req.query)
        .then((products) =>
                res.status(200).json(products)
                // res.render('products',{
                //     products: products,
                //     isAuthenticated: req.isAuthenticated,
                //     username: req.username
                // })
        )
        .catch((err) =>
            res.status(500).json({message: err.message})
        )
})

route.post('/', (req, res) => {
    ctrl.addProduct(req.body)
        .then((addedProduct) =>
                res.status(201).json(addedProduct)
        )
        .catch((err) =>
            res.status(500).json({message: err.message})
        )
})

route.post('/delete',(req,res) => {
    ctrl.deleteProduct(req.body)
    .then((product) =>
         res.status(200).json(product)
        )
        .catch((err) =>
            res.status(500).json({message: err.message})
        )
})



exports = module.exports = route