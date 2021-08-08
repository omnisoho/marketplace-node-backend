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
        `${global.baseDir}/public/images/uploads/${req.file.filename}`
      ),
    }).then((image) => {
      fs.writeFileSync(
        `${global.baseDir}/public/images/temp/${image.name}`,
        image.data
      );

      // return filename if successful
      return res.status(200).send(req.file.filename);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(`Error when to trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
