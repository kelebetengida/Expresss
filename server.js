const path = require('path');

const express = require('express');
const fs = require("fs")


const app =express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
require("./Routes/routes")(app);


app.listen(PORT, ()=> {console.log(`server listening on port: ${PORT}`)})