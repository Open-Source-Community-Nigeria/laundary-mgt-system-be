const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // This will automatically add createdAt and updatedAt fields

const ClientsModel = mongoose.model("Clients", clientsSchema);

module.exports = ClientsModel;
