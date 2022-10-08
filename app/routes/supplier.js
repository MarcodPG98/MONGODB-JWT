const { authJwt } = require("../middlewares");
const controller = require("../controllers/supplierController");

module.exports = function(app) {
  
  app.get("/api/supplier/all", [authJwt.verifyToken, authJwt.isAdmin], [controller.getSuppliers]);

  app.get("/api/supplier/:id", [authJwt.verifyToken, authJwt.isAdmin], [controller.getSuppliersById]);

  app.put("/api/supplier/:id", [authJwt.verifyToken, authJwt.isAdmin], [controller.updateSupplier]);

  app.delete("/api/supplier/:id", [authJwt.verifyToken, authJwt.isAdmin], [controller.deleteSupplier]);

  app.delete("/api/supplier/all", [authJwt.verifyToken, authJwt.isAdmin], [controller.deleteAllSuppliers]);

  app.post("/api/supplier/upload", [authJwt.verifyToken, authJwt.isAdmin], [controller.upload]);

  app.get("/api/supplier/files", [authJwt.verifyToken, authJwt.isAdmin], [controller.getListFiles]);
  
};