import multer from 'multer';
import express from 'express';
import {isAuth} from '../utils.js'
const uploadRouter = express.Router();


//null becasue that is error section...
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads')
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({storage});
//this is upload middle ware which will upload file to destination and set the name of the file....
//we are expecting single file named image....from multer
uploadRouter.post('/',isAuth,  upload.single('image'), (req, res)=>{
    res.send(`${req.file.path}`)
});

export default uploadRouter;