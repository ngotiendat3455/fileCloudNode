const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

const updateProductImage =  async(req, res) => {
    console.log('updateProductImage', req.files);
    if(!req.files){
        throw new CustomError.BadRequestError('No Files Uploaded');
    }

    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload image');
    }
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload image smaller than 1MB');
    }
    const moveUrl = path.join(__dirname, '../public/upload/' + productImage.name);
    await productImage.mv(moveUrl);

    res.status(StatusCodes.OK).json({
        src: '/upload/' + productImage.name
    })
}

const uploadProductImageCloud = async(req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload'
    })
    console.log('result', result);

    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(StatusCodes.OK).json({
        image: result.secure_url
    });
}
module.exports = {
    updateProductImage,
    uploadProductImageCloud
}