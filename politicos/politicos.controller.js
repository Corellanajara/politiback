const Politicos = require('./politicos.model.js');

//Create new politico
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const politico = new Politicos({
      titulo : req.body.titulo,
      descripcion : req.body.descripcion,
      contenido : req.body.contenido,
      pifias : req.body.pifias,
      imagenes : req.body.imagenes
    });

    // Save materia in the database
    politico.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear los politicos."
        });
    });
};

// Retrieve all politicos from the database.
exports.findAll = (req, res) => {
    Politicos.find()
    .then(politicos => {
        res.send(politicos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las politicos."
        });
    });
};

// Update a politico
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "politico content can not be empty"
        });
    }

    // Find and update materia with the request body
    Politicos.findByIdAndUpdate(req.params.materiaId, {
      titulo : req.body.titulo,
      descripcion : req.body.descripcion,
      contenido : req.body.contenido,
      pifias : req.body.pifias,
      imagenes : req.body.imagenes
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

// Delete a politico with the specified noteId in the request
exports.delete = (req, res) => {
    Politicos.findByIdAndRemove(req.params.id)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "politico no encontrado id " + req.params.id
            });
        }
        res.send({message: "politico borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "politico no encontrado id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el politico id " + req.params.id
        });
    });
};
