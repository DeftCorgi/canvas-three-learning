module.exports = app => {
  app.get('/three/helloworld', (req, res) => {
    res.render('pages/three/helloworld');
  });

  app.get('/three/fog', (req, res) => {
    res.render('pages/three/fog');
  });
};
