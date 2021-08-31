let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Inventory = require("../db").import("../models/log");

router.get("/", validateSession, (req, res) => {
    let userid = req.user.id;
    Inventory.findAll({
      where: { user: userid },
    })
      .then((Inventory) => res.status(200).json(Inventory))
      .catch((err) => res.status(500).json({ error: err }));
  });
  
  router.put("/update/:entryId", validateSession, function (req, res) {
    const updateInventory = {
      description: req.body.inventory.description,
      definition: req.body.inventory.definition,
      result: req.body.inventory.result,
      user: req.user.id,
    };
  
    const query = { where: { id: req.params.entryId, user: req.user.id } };
  
    Inventory.update(updateInventory, query)
      .then((inventory) => res.status(200).json(inventory))
      .catch((err) => res.status(500).json({ error: err }));
  });

  module.exports = router;
  