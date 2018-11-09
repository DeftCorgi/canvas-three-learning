module.exports = app => {
  app.get('/p5/practice', (req, res) => {
    res.render('pages/p5/practice');
  });
};
