const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'../public')));

// Useful if we want to deply to Heroku later
const port = process.env.PORT || 3000

app.get('',(req, res)=>{

    res.send('Hello COVIDCoach');

});


// Run using node src/app.js
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
}); 

//Heroku notes:
// When working off a branch, push via git push heroku your-branch-name:master
// Heroku URL: https://covid-coach.herokuapp.com/