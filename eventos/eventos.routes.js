module.exports = (app) => {
    const eventos = require('./eventos.controller.js');

    app.post('/eventos/', eventos.create);

    app.get('/eventos/', eventos.findAll);

    app.get("/eventos/:id", eventos.findByCourse);

    app.put('/eventos/:id', eventos.update);

    app.delete('/eventos/:id', eventos.delete);
}
