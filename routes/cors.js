const cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: flase };
  }
  callback(null, corsOptions);
};

exports.cors = cors(); // accept all origin / wildcard *
exports.corsWithOptions = cors(corsOptionsDelegate); // origins indicated in whitelist.
