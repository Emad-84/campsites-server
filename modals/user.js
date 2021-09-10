const { mongo } = require("mongoose");
const mongoose = require("mongoose");
const passportLocalMangoose = require("passport-local-mongoose"); // it will handle the username and password internally
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// plug the local passport to the schema.
userSchema.plugin(passportLocalMangoose); // plugin provides static methods like authanticate.

module.exports = mongoose.model("User", userSchema);
