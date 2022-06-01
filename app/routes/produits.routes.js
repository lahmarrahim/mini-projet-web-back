module.exports = app => {
  const produitsController = require("../controllers/ProduitController.js");


  var router = require("express").Router();


  // Create a new Product
  router.post("/add", produitsController.add);

  // Retrieve all Products
  router.get("/findAll", produitsController.findAll);

  // Retrieve a single Product with id
  router.get("/find/:id", produitsController.findOne);

  // Update a Product with id by user
  router.put("/update/:id", produitsController.update);

  // Delete a Product with id
  router.delete("/delete/:id", produitsController.delete);

  // Create a new Product
  router.delete("/", produitsController.deleteAll);






  app.use("/api/produits", router);
};