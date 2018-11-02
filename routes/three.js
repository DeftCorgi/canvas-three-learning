module.exports = app => {
  app.get('/three/helloworld', (req, res) => {
    res.render('pages/three/helloworld');
  });

  app.get('/three/fog', (req, res) => {
    res.render('pages/three/fog');
  });

  app.get('/three/lights', (req, res) => {
    res.render('pages/three/lights');
  });

  app.get('/three/shadows', (req, res) => {
    res.render('pages/three/shadows');
  });

  app.get('/three/animationrig', (req, res) => {
    res.render('pages/three/animationrig');
  });

  app.get('/three/materials', (req, res) => {
    res.render('pages/three/materials');
  });
};
