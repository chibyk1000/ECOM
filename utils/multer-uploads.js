const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file)
    cb(null, path.join(__dirname, '../static'))
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const file_ext = file.originalname.split('.')
      const ext = file_ext[file_ext.length -1]
  //  console.log(file)
    cb(null, 'product' + "-" + uniqueSuffix+'.'+ext);
  },
});

const filefilter = function (req, file, cb) {
       const mimetypes = ["image/jpeg", "image/jpg", "image/png"];

       if (!mimetypes.includes(file.mimetype)) {
     return cb(new Error('invalid file type'))
       }
}

const upload = multer({ storage: storage});

module.exports = upload