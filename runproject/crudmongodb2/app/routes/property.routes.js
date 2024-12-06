module.exports = app => {
  const property = require("../controllers/property.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", property.create);

  // Retrieve all Tutorials
   // router.get("/", users.findAll);

 //   router.post("/login", users.login);
   

  // Retrieve all published Tutorials
  // router.get("/published", users.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Create a new Tutorial
  // router.delete("/", tutorials.deleteAll);

  app.use("/api/property", router);
};
