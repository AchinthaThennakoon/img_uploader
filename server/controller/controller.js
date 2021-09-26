const uploadModel = require('../model/schema');
const fs = require('fs');

exports.index =async (req,res)=>{
    //fetch images and store
    const all_images = await uploadModel.find();
    res.render('main',{images:all_images});
}

exports.upload=(req,res)=>{

    const files=req.files;

    //check errors
    if(!files){
        const error= new Error('please choose images');
        error.httpStatusCode =400;
        return next(error);
    }

    //convert images to base64 encoding
    let imgs = files.map((file)=>{
        let img = fs.readFileSync(file.path)

        return encode_img = img.toString('base64');
    });

    let result=imgs.map((src,index)=>{
        //store data in db
        let img_upload={
            filename:files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64: src
        };

        let newUpload =  new uploadModel(img_upload);

        return newUpload
        .save()
        .then(()=>{
            return {msg :`${files[index].originalname}image uploaded successfully`}
        })
        .catch((err) =>{
            if(err){
                if(err.name==='MongoError' && err.code===11000){
                    return Promise.reject({error:err.message || `${files[index].originalname} missing`})
                }
            }
        })
    })
    Promise.all(result)
        .then(msg =>{
            //res.json(msg);
            res.redirect('/');
        })
        .catch(err=>{
            res.json(err);
        })
}