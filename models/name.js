var mongoose = require("mongoose");

var nameSchema = mongoose.Schema({
  photos: { type: String },  
  skase: {type: String}
});


var Name = mongoose.model("Name", nameSchema);

module.exports = Name;