const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// middleware
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'static')));
app.use(
  '/lib/dat.gui/',
  express.static(path.join(__dirname, 'node_modules/dat.gui/build/'))
);
app.use(
  '/lib/three/',
  express.static(path.join(__dirname, 'node_modules/three/build/'))
);
app.use(
  '/lib/three-orbit-controls',
  express.static(path.join(__dirname, 'node_modules/three-orbit-controls/'))
);

app.use(
  '/lib/tween/',
  express.static(path.join(__dirname, 'node_modules/@tweenjs/tween.js/src/'))
);

// routes
require('./routes/canvas')(app);
require('./routes/three')(app);

app.listen(process.env.PORT || 3000);
