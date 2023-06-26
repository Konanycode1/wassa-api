const multer = require('multer')
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg':'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req,file, collback)=>{
        collback(null, 'images');
    },
    filename: (req,file, collback)=>{
        const name = file.originalname.split(' ').join('_').split("-").join("_");
        const extension = MIME_TYPES[file.mimetype];
        collback(null, name+Date.now()+'.'+extension);
    }
});
module.exports = multer({storage}).single('logo')