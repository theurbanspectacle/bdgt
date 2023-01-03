const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } - This requires HTTPS, we can put this in for future development. THEURBANSPECTACLE
}));

// So that we don't store cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

const handlebarsEngine = handlebars.create({});
app.engine('handlebars', handlebarsEngine.engine);
app.set('view engine', 'handlebars');
app.use(routes);
app.use(express.static("public"));

// Syncing sequelize models to DB, then turn on server. THEURBANSPECTACLE
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch(error => {
  console.error('Sequelize failed', error);
});
  