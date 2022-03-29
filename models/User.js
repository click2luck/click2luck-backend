const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email",
      ],
    },
    role: {
      type: String,
      required: true,
      default: "basico"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
