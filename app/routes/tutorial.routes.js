const { create, getCreate, findOne, update,
  getAll

} = require("../controllers/tutorial.controller");

module.exports = app => {

  var router = require("express").Router();

  // Create a new Tutorial
  router.get("/", getAll)
  router.post("/create", create);

  router.get("/create", getCreate);

  // Retrieve a single Tutorial with id
  router.get("/:id", findOne);

  // Update a Tutorial with id
  router.put("/:id", update);

  app.use('/tutorials', router);
};
