const bodyParser = require('body-parser');
const express=require('express');
const app=express();
const PORT=5000;
require('./config');
app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT,()=>{
    console.log("server is running on "+PORT);
})