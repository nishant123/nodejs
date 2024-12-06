const db = require("../models");
const Userdb = db.user;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(1);
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "User can not be empty!" });
    return;
  }

  // Create a User
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role:req.body.role,
    phone:req.body.phone,
    address:req.body.address,
    tnc:req.body.tnc
  });

  console.log('user',user);
  // Save Tutorial in the database

  user.save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const name = req.query.name;
//   var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

//   Userdb.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

// Find a single login
exports.login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  //const options: { email: email,password: password };

  console.log('email1'+email);
  console.log('password1'+password);
  const check =  Userdb.findOne({email:email}).then(data => {
    
        if (!data)
          res.status(404).send({ message: "Not found user with id " + email });
        else {          
          if(data.password=== password) {
            console.log('password matching');
            res.status(200).send({ data: data });

          } else {
            res.status(404).send({ message: "Not found user " + email });
          }
        }
        
        

      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id=" + email });
      });
  console.log('check'+check);
//  const check = user.findOne({email: email}).then(data => {

//     if (!data)
//       res.status(404).send({ message: "Not found user with id " + email });
//     else res.send(data);
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .send({ message: "Error retrieving user with id=" + email });
//   });
  


  // user.findById(id)
  //   .then(data => {
  //     if (!data)
  //       res.status(404).send({ message: "Not found user with id " + id });
  //     else res.send(data);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .send({ message: "Error retrieving user with id=" + id });
  //   });

  //   static getUser(options: {
  //     loginId: string,
  //   }) {
  //     return UserModel.findOne({
  //       where: options,
  //       raw: true,
  //       nest: true
  //     });
  //   }
};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   Signup.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else res.send({ message: "Tutorial was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   SignUp.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Signup.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Tutorials were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
