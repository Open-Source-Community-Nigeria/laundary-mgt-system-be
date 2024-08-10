const express = require("express");
const router = express.Router();
const {
  addClient,
  clientList,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clients.controllers");

// Organisation
router.get("/client/list", clientList);
router.get("/client/get/:id", getClient);
router.post("/client/add", addClient);
router.put("/client/update/:id", updateClient);
router.delete("/client/delete/:id", deleteClient);

module.exports = router;
