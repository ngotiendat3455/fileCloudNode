const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const createProduct =  async(req, res) => {
    console.log('req.body', req.body);
    const product = await Product.create(req.body);
    // res.send('create product');
    res.status(StatusCodes.OK).json({ product })
}

const getAllProducts =async(req, res) => {
    // res.send('all products');
    const productList = await Product.find({});
    res.status(StatusCodes.OK).json({ products:  productList})
}

module.exports = {
    createProduct,
    getAllProducts
}