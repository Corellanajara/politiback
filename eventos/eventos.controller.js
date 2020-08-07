const Eventos = require('./eventos.model.js');

//Create new evento
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const evento = new Eventos({
      course : req.body.course,
      start : req.body.start,
      end : req.body.end,
      title : req.body.title,
      color : req.body.color,
      actions : req.body.actions,
      allDay : req.body.allDay,
      resizable : req.body.resizable,
      draggable : req.body.draggable
    });

    // Save materia in the database
    evento.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear los eventos."
        });
    });
};

// Retrieve all eventos from the database.
exports.findByCourse = (req, res) => {
    Eventos.find({course:req.params.id})
    .then(eventos => {
        res.send(eventos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las eventos."
        });
    });
};
// Retrieve all eventos from the database by id.
exports.findAll = (req, res) => {
    Eventos.find()
    .then(eventos => {
        res.send(eventos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las eventos."
        });
    });
};

// Update a evento
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "evento content can not be empty"
        });
    }

    // Find and update materia with the request body
    Eventos.findByIdAndUpdate(req.params.id, {
      course : req.body.course,
      start : req.body.start,
      end : req.body.end,
      title : req.body.title,
      color : req.body.color,
      actions : req.body.actions,
      allDay : req.body.allDay,
      resizable : req.body.resizable,
      draggable : req.body.draggable

    }, {new: true})
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.id
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.id
        });
    });
};

// Delete a evento with the specified noteId in the request
exports.delete = (req, res) => {
    Eventos.findByIdAndRemove(req.params.id)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "evento no encontrado id " + req.params.id
            });
        }
        res.send({message: "evento borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "evento no encontrado id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el evento id " + req.params.id
        });
    });
};



