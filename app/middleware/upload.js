const multer = require('multer');

// check the file type
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload images only.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${global.baseDir}/public/images/uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadFile = multer({ storage, fileFilter: imageFilter });

module.exports = uploadFile;
