import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js'
import { isAdmin, isAuth } from '../utils.js';


const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const name = req.query.name || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const products = await Product.find({...nameFilter,});
    res.send(products);
})
);


productRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts})
}))

productRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: 'Product wasnot found ...'})
    }

}));

productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        if (product.reviews.find((x) => x.name === req.user.name)) {
          return res
            .status(400)
            .send({ message: 'You already submitted a review' });
        }
        const review = {
          name: req.user.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
          message: 'Review Created',
          review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
);
  
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler( async (req, res)=>{
    const product = new Product({
      name: 'sample' + Date.now(),
      image: '/image',
      price: 0,
      category: 'Sample Category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample',
    });

    const createdProduct = await product.save();
    res.send({message: 'Product created', product: createdProduct});
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler( async (req, res)=> {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description; 

      const updatedProduct = await product.save();
      res.send({message: "Product Updated", product: updatedProduct});
    }else {
      res.status(404).send({message: "Product not found"})
    }
}) );

productRouter.delete('/:id',isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    const deleteProduct = await product.remove();
    res.send({message: 'Product Deleted', product: deleteProduct});
  }else{
    res.status(404).send({message: 'Product not Found !!!'})
  }
}))
export default productRouter;