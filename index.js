const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const cors = require('cors');

//import router module
const userRoute = require('./routes/userRoute');
const cakeRoute = require('./routes/cakeRoute');

// DB Connection
mongoose.connect(process.env.MONGO_URL, 
	{useNewUrlParser: true, useUnifiedTopology: true});


// DB Notif or Test Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to Database`));



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


// app.get("/", (req, res)=> res.send("hello"));


//connect router module
app.use("/api/user", userRoute);
app.use("/api/cake", cakeRoute);


app.listen(PORT, () => console.log(`Server running at port ${PORT}`));