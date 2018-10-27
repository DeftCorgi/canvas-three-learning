module.exports = app => {
  app.get('/', (req, res) => {
    res.render('pages/home');
  });

  app.get('/circles', (req, res) => {
    res.render('pages/circles');
  });

  app.get('/movingcircles', (req, res) => {
    res.render('pages/moving_circles');
  });

  app.get('/userinteractions', (req, res) => {
    res.render('pages/user_interactions');
  });

  app.get('/gravity', (req, res) => {
    res.render('pages/gravity');
  });

  app.get('/collisions', (req, res) => {
    res.render('pages/collisions');
  });
};
