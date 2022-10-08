const Supplier = require('../models/supplier');
const uploadFile = require("../middlewares/upload");

const Suppliers = {

    // GET get all Suppliers
    getSuppliers: function(req, res) {
        Supplier.find({}).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving Suppliers."
            });
        })
    },
    // GET Supplier by id
    getSuppliersById: function(req, res) {
        const id = req.params.id;
        Supplier.findById(id).then(data => {
            if (!data)
                res.status(404).send({
                    message: "Supplier with id " + id + " is not found."
                });
            else res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retrieving Supplier with id " + id
            })
        })
    },
    // PUT update Supplier by id
    updateSupplier: function(req, res) {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        Supplier.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Failed to update Supplier with id=${id}.`
                    });
                } else res.send({
                    message: "Supplier was updated successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while updating Supplier with id=" + id
                });
            });
    },
    // DELETE delete Supplier by id
    deleteSupplier: function(req, res) {
        const id = req.params.id;

        Supplier.deleteOne({
                _id: id
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Failed to delete Supplier with id=${id}.`
                    });
                } else res.send({
                    message: "Supplier was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while deleting Supplier with id=" + id
                });
            });
    },
    // DELETE remove all Suppliers
    deleteAllSuppliers: function(req, res) {
        Supplier.deleteMany({})
            .then(data => {
                res.send({
                    message: "All Suppliers was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while deleting all Suppliers"
                });
            });
    },
    // UPLOAD carga de archivos
    upload : async (req, res) => {
        try{
            await uploadFile(req, res);

            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
        } catch (err) {
            if (err.code == `LIMIT_FILE_SIZE`) {
                return res.status(500).send({
                    message: "File size cannot be larger than 2MB!",
                });
            }

            res.status(500).send({
                message: `Could not upload the file: ${req.file.originalname}. ${err}`,
              });
        }
    },
    // GETLISTFILES mostrar archivos
    getListFiles : function (req, res) {
        const directoryPath = __basedir + "/app/resources/static/assets/uploads/";
      
        fs.readdir(directoryPath, function (err, files) {
          if (err) {
            res.status(500).send({
              message: "Unable to scan files!",
            });
          }
      
          let fileInfos = [];
      
          files.forEach((file) => {
            fileInfos.push({
              name: file,
              url: baseUrl + file,
            });
          });
      
          res.status(200).send(fileInfos);
        });
    },
    // DOWNLOAD descarga de archivo
    download = (req, res) => {
        const fileName = req.params.name;
        const directoryPath = __basedir + "/app/resources/static/assets/uploads/";
      
        res.download(directoryPath + fileName, fileName, (err) => {
          if (err) {
            res.status(500).send({
              message: "Could not download the file. " + err,
            });
          }
        });
      };
}

module.exports = Suppliers;