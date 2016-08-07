var mongoose = require("mongoose");

var publicSchema = mongoose.Schema({
 public: { type: String },
 write: { type: String },
 delet:{type:String}
  
});


var Public = mongoose.model("Public", publicSchema);

module.exports = Public;