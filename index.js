const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const pagesRoutes = require('./routes/pages');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// middleware
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'static')));

// routes
require('./routes/pages')(app);

app.listen(3000);
