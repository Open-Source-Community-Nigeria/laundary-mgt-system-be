const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userImage: { type: String, required: true },
    isPremuim: Boolean,
  },
  { timestamps: true }
); // This will automatically add createdAt and updatedAt fields

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
