const express = require("express");
const initRouter = require("./router");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load('./src/api/swagger.yaml');

require('dotenv').config()
const {EntityRelationError} = require("./commons/error");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   // parse application/json
app.use(bodyParser.json())
app.use(morgan("dev"));
app.use(cors())
// middleware
initRouter(app);

const path = require('path')
app.use('/', express.static(path.join(__dirname, '../public')))


app.get("/api", (req, res)=>{
    return res.send({
        message : "ok"
    })
});
const mongoose = require("mongoose");
app.use((err, req, res, next) => {
    console.error(err.stack)
    if (err instanceof mongoose.Error.ValidationError || err instanceof EntityRelationError){
        return res.status(400).send(err)
    }
    if (err.code === 11000){
        return res.status(400).send({
            message: "Duplicate data error",
            keyValue: err.keyValue
        })
    }
    res.status(500).send('Something broke!')
})

app.listen(process.env.PORT, ()=>{
    console.log('App is running on PORT:', process.env.PORT);
})