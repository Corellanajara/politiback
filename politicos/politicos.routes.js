module.exports = (app) => {
    const politicos = require('./politicos.controller.js');

    app.post('/politicos/', politicos.create);

    app.get('/politicos/', politicos.findAll);

    app.put('/politicos/:id', politicos.update);

    app.delete('/politicos/:id', politicos.delete);
}
