const multer = require("multer");
const { TMP_DIR } = require("../config");

const storage = multer.diskStorage({
  destination: TMP_DIR,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
