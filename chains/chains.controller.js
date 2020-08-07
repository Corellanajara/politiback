const Chains = require('./chains.model.js');

//Create new chain
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const chain = new Chains({
      course : req.body.course,
      creator: req.body.creator,
      chain : req.body.chain,
      responses : req.body.responses,
      date: new Date()
    });

    // Save materia in the database
    chain.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear los chains."
        });
    });
};

// Retrieve all chains from the database.
exports.findByCourse = (req, res) => {
    Chains.find({course:req.params.id})
    .then(chains => {
        res.send(chains);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las chains."
        });
    });
};
// Retrieve all chains from the database by id.
exports.findAll = (req, res) => {
    Chains.find()
    .then(chains => {
        res.send(chains);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las chains."
        });
    });
};

// Update a chain
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "chain content can not be empty"
        });
    }

    // Find and update materia with the request body
    Chains.findByIdAndUpdate(req.params.id, {
      course : req.body.course,
      creator: req.body.creator,
      chain : req.body.chain,
      responses : req.body.responses,
      date: new Date()

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

// Delete a chain with the specified noteId in the request
exports.delete = (req, res) => {
    Chains.findByIdAndRemove(req.params.id)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "chain no encontrado id " + req.params.id
            });
        }
        res.send({message: "chain borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "chain no encontrado id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el chain id " + req.params.id
        });
    });
};
