require('dotenv').config();
require('express-async-errors');

const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');
// cloud config
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// router
const productRoute = require('./routes/productRoutes');
app.use(express.static('./public'))
app.use(fileUpload({
  useTempFiles: true 
}))
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products', productRoute);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log('process.env.MONGO_URI', process.env.MONG_URL);
    await connectDB(process.env.MONG_URL);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
