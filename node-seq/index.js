const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { ValidationError } = require('express-validation');
const port = 3000;
const host = "localhost";
require('dotenv').config();

app.get('/', function (req, res) {
    // res.send('Welcome to NodeJS');
    throw new Error("Unknown error");
});

app.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
    require('./src/connection').sequelize.sync({ force: false }).then(res => {
        console.log("Successfully connected.");
    }).catch(err => {
        console.error("Connection failed: ", err);
    });
    require('./src/apis/common.apis')(app);

    /**
     * Error handler
     */
    app.use((err, _req, res, _next) => {
        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err);
        }
        res.status(200).send(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))));
    });
});

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));