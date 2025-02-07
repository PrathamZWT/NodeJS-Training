import multer from "multer";

let fileTypeValid = false;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./products");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    fileTypeValid = true;
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only PNG, JPEG and JPG is allowed!"),
      false
    );
    fileTypeValid = false;
  }
};
const upload = multer({ storage: storage, fileFilter }).single("product-image");
export const fileUploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "Only one file is allowed. Please upload a single file.",
        });
      }
      return res.status(404).json({ message: err.message });
    }
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    if (req.file === undefined) {
      next();
    } else {
      req.body.image_url = req.file.path;
      const fileSizeInBytes = req.file.size;
      const maxFileSizeInBytes = 5 * 1024 * 1024;
      if (fileSizeInBytes > maxFileSizeInBytes) {
        return res.status(400).json({
          message: "File size exceeds 5 MB. Please upload a smaller file.",
        });
      }
      next();
    }
  });
};
