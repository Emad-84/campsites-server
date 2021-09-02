const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send the all the partners to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });

partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    // will autmaticllay get statuscode and header from app.all()
    res.end(`Will send details of partner: ${req.params.partnerId}`);
  })
  .post((req, res) => {
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put((req, res) => {
    res.write(`updating the partner: ${req.params.partnerId}\n`);
    res.end(
      `Will update the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

module.exports = partnerRouter;
