module.exports = (app) => {
    const chains = require('./chains.controller.js');

    app.post('/chains/', chains.create);

    app.get('/chains/', chains.findAll);

    app.get("/chains/:id", chains.findByCourse);

    app.put('/chains/:id', chains.update);

    app.delete('/chains/:id', chains.delete);
}
