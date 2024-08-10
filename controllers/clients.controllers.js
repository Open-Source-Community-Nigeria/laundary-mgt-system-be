const Client = require("../models/clients.modal");

// List Client
const clientList = (req, res) => {
  Client.find({})
    .then((client) => {
      if (client.length === 0) {
        return res
          .status(204)
          .json({ status: 204, message: "No content found" });
      }
      res.status(200).json({ status: 200, data: client });
    })
    .catch((err) => res.status(400).json({ status: 400, error: err.message }));
};

// Fetch Organisation [One]
const getClient = (req, res) => {
  const id = req.params.id;
  Client.findById(id)
    .then((client) => {
      if (!client) {
        return res
          .status(404)
          .json({ status: 404, message: "No content found with the given ID" });
      }
      res.status(200).json({ status: 200, data: client });
    })
    .catch((err) => res.status(400).json({ status: 400, error: err.message }));
};

//Add Organisation
const addClient = async (req, res) => {
  try {
    const { name, email, phone_number, created_by } = req.body;
    // check if name was entered
    if (!name) {
      return res.status(400).json({
        status: 400,
        error: "Client Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "Client Email is required",
      });
    }
    if (!phone_number) {
      return res.status(400).json({
        status: 400,
        error: "Phone Number is required",
      });
    }

    if (!created_by) {
      return res.status(400).json({
        status: 400,
        error: "userID is required",
      });
    }
    // check organisation exist
    const exist = await Client.findOne({ email });
    if (exist) {
      return res.status(400).json({
        status: 400,
        error: "Client Already Added",
      });
    }

    // create organisation in db
    const client = await Client.create({ name, email, phone_number, userID });
    // return res.status(201);
    return res.status(201).send({
      staus: 201,
      message: "Client Added Successful",
      data: client,
    });
  } catch (error) {
    console.log(error);
  }
};

// update Client
const updateClient = async (req, res) => {
  const id = req.params.id;
  try {
    const { name, email, phone_number, created_by } = req.body;
    // check if name was entered
    if (!name) {
      return res.status(400).json({
        status: 400,
        error: "Client Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "Client Email is required",
      });
    }
    if (!phone_number) {
      return res.status(400).json({
        status: 400,
        error: "Phone Number is required",
      });
    }

    if (!created_by) {
      return res.status(400).json({
        status: 400,
        error: "userID is required",
      });
    }
    const update = await Organisation.findByIdAndUpdate(
      { _id: id },
      { name, email, phone_number, created_by }
    )
      .then((update) =>
        res.status(200).json({
          staus: 200,
          message: "Client Updated Successful",
          data: update,
        })
      )
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

// delete Client
const deleteClient = (req, res) => {
  const id = req.params.id;
  Client.findByIdAndDelete({ _id: id })
    .then((deleteData) =>
      res.status(200).json({
        staus: 200,
        message: "Client deleted Successful",
        data: deleteData,
      })
    )
    .catch((err) => console.log(err));
};

module.exports = {
  addClient,
  clientList,
  getClient,
  updateClient,
  deleteClient,
};
