const express = require('express');

const connectToMongo = require('./db');
const handleAuth = require('./routes/auth');
const handleNotes = require('./routes/notes');

const app = express();
const port = 5000;

connectToMongo("mongodb://localhost:27017/notebook-app").then(()=>{
    console.log("Connected to MongoDB");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Available Routes
app.use('/api/auth', handleAuth);
app.use('/api/notes', handleNotes);

app.listen(port, () => {
  console.log(`Server started on port : ${port}`)
})