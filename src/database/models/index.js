// Desging of model form

const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const { Schema } = mongoose;
const existsForm = require("./existsForm");

//initialize slug
mongoose.plugin(slug)
const Forms = new Schema({
  name: { type: String, required: true},
  lastName: { type: String, required: true},
  type: {
    type: String,
    enum: [
      "Cedula de ciudadania",
      "Cedula de extranjeria",
      "Permiso especial de permanencia",
      "Pasaporte",
      "Tarjeta de identidad",
      "NIT"
    ],
    required: true,
  },
  cc: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  birthday: { type: String, required: true },
  image: { type: String,  default: 'placeholder.jpg', required: false },
  createAt: { type: Date, default: Date.now },
  slug: { type: String, cc: 'cc', slug_padding_size: 2 },
});
Forms.statics.existsForm = existsForm;


module.exports =  mongoose.model("Forms", Forms);
