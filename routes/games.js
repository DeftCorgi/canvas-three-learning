module.exports = app => {
  app.get('/games/ricochet', (req, res) => {
    res.render('pages/games/ricochet');
  });

  app.get('/games/spaceinvaders', (req, res) => {
    res.render('pages/games/spaceinvaders');
  });
};
