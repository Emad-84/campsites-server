const express = require("express");
const authenticate = require("../authanticate");
const multer = require("multer");
const cors = require("./cors");

const storage = multer.diskStorage({
  destination: (require, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false); // false tells multer to refuse the file
  }
  cb(null, true); // true tells multer to accept the file
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(
    cors.cors,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("Get operation not supported on /imageUpload");
    }
  )
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    upload.single("imageFile"),
    (req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.json(req.file); // multer add file obj to req obj which has more info about file/files
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("Put operation not supported on /imageUpload");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("Delete operation not supported on /imageUpload");
    }
  );

module.exports = uploadRouter;
