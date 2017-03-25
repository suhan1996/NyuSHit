// app.js

// Use __dirname to construct absolute paths for:

// 1. express-static
// 2. hbs views

// (the instructions have details on how to do this)

// LISTEN ON PORT 3000

// express static setup
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');