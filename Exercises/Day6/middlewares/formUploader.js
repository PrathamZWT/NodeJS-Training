import multer from "multer";

let fileTypeValid = false;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads2");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    fileTypeValid = true;
    cb(null, true);
    console.log(file);
  } else {
    cb(new Error("Invalid file type, only PDF is allowed!"), false);
    fileTypeValid = false;
  }
};
const upload2 = multer({ storage: storage, fileFilter }).single("pdf-file");
console.log(upload2);
export const pdfUploadFilter = (req, res, next) => {
  upload2(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(404).json({
          message: "Only one file is allowed. Please upload a single file.",
        });
      }
      return res.status(404).json({ message: err.message });
    }
    if (err) {
      return res.status(404).json({ message: err.message });
    }
    const fileSizeInBytes = req.file.size;
    const maxFileSizeInBytes = 10 * 1024 * 1024;
    if (fileSizeInBytes > maxFileSizeInBytes) {
      return res.status(404).json({
        message: "File size exceeds 10 MB. Please upload a smaller file.",
      });
    }
    next();
  });
};
