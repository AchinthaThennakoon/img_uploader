const multer=require('multer');

//creating storage
var imgStorage =multer.diskStorage({
    destination: function(req,file,cb){

        //directory to store
        cb(null,"uploads");
    },
    filename: function(req,file,cb){
        //set img name
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null,file.fieldname+'-'+Date.now()+ext);
    }
});

store = multer({storage:imgStorage});
module.exports=store;