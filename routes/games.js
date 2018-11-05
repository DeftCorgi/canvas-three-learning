module.exports = app => {
  app.get('/games/ricochet', (req, res) => {
    res.render('pages/games/ricochet');
  });
};
