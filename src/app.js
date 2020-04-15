const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'../public')));

const port = process.env.PORT || 3000

app.get('',(req, res)=>{

    res.send('Hello COVIDCoach');

});


// Run using node src/app.js
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});