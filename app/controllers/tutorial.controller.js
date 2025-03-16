const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

module.exports = {
  getAll: async (req, res) => {
    let tutorials = await Tutorial.findAll();
    return res.render('tutorial.ejs', { tutorials })
  },
  // Create and Save a new Tutorial
  create: async (req, res) => {
    // Validate request
    // if (!req.body.title) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }

    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    await Tutorial.create(tutorial);
    return res.redirect('/tutorials')

  },

  getCreate: (req, res) => {
    return res.render('create.ejs')
  },

  // Find a single Tutorial with an id
  findOne: (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  },

  // Update a Tutorial by the id in the request
  update: (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  }
}

