const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');


const storage = multer.diskStorage({});


const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
};


const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    },
}).single('ResImg'); 

cloudinary.config({
    cloud_name: 'dk3muiuks',
    api_key: '695946447985799',
    api_secret: 'KBwZOqdZzs_E_pMq7v1iKtsGgc0'
});


const uploadImage = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            req.imageURL = result.secure_url;
            next();
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Server error while uploading image' });
        }
    });
};

module.exports = uploadImage;
