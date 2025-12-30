const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

const multerStorage = multer.memoryStorage();

// filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
}).array("images", 10);

// ensure dir
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// PRODUCT resize
const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  ensureDir("public/images/products");

  await Promise.all(
    req.files.map(async (file) => {
      const filename = `product-${Date.now()}-${Math.random()}.jpeg`;
      await sharp(file.buffer)
        .resize(300, 300)
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${filename}`);

      file.path = `public/images/products/${filename}`;
    })
  );

  next();
};

// BLOG resize
const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  ensureDir("public/images/blogs");

  await Promise.all(
    req.files.map(async (file) => {
      const filename = `blog-${Date.now()}-${Math.random()}.jpeg`;
      await sharp(file.buffer)
        .resize(300, 300)
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${filename}`);

      file.path = `public/images/blogs/${filename}`;
    })
  );

  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
