
require("dotenv").config();
require("./model/db")
const express = require("express");
const app = express();
const PORT = process.env.PORT || process.env.DEVPORT;
const Routes = require("./routes")
app.use(express.json());
app.use(express.urlencoded({extended:false}));
Routes.getOrderRoutes(app);
app.listen(PORT);