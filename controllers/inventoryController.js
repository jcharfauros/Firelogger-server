let express = require("express");
let router = express.Router();

let sequelize = require("../db");
let validateSession = require("../middleware/validate-session");
let Inventory = sequelize.import("../models/inventory");

//User can add/create new Inventory Item
router.post("/create", validateSession, (req, res) => {
  Inventory.create({
    category: req.body.inventory.category,
    name: req.body.inventory.name,
    year: req.body.inventory.year,
    model: req.body.inventory.model,
    serial_number: req.body.inventory.serial_number,
    pic_url: req.body.inventory.pic_url,
    value: req.body.inventory.value,
    owner_id: req.user.id, //attaches a user's id number to their inventory item
  })
    .then((inventory) => {
      res.status(200).json({
        message: `Inventory item has been added to the Firelogger Database`,
        log: inventory,
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

//User can remove/delete an Itemfrom inventory via ID
router.delete("/:id/delete", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Inventory.destroy(query).then(() =>
    res
      .status(200)
      .json({ message: "Inventory item Removed from Firelogger Database" })
  );
});

router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  Inventory.findAll({
    where: { owner_id: userid },
  })
    .then((Inventory) => res.status(200).json(Inventory))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
  const updateInventory = {
    description: req.body.inventory.description,
    definition: req.body.inventory.definition,
    result: req.body.inventory.result,
    owner_id: req.user.id,
  };

  const query = { where: { id: req.params.entryId, owner_id: req.user.id } };

  Inventory.update(updateInventory, query)
    .then((inventory) => res.status(200).json(inventory))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
