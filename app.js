require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./controllers');

app.use(Express.json());

app.use('/user', controllers.userController); 

app.use(require('./middleware/validate-jwt'));
app.use('/workoutlog', controllers.workoutController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(5557, () => {
            console.log(`[Server]: App is listening on 5557.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });