module.exports = app => {
  app.get('/three/helloworld', (req, res) => {
    res.render('pages/three/helloworld');
  });
};
