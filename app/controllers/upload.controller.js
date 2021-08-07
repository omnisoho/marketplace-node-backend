const fs = require('fs');
const db = require('../models');

const Image = db.images;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file === undefined) {
      return res.send('Please select a file to upload.');
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        `${global.baseDir}/app/public/images/uploads/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        `${global.baseDir}/app/public/images/temp/${image.name}`,
        image.data
      );

      // return filename if successful
      return res.send(req.file.filename);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
