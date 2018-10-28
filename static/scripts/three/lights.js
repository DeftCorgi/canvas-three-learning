const init = () => {
  // GUI for dynamic value selection
  const gui = new dat.GUI();

  // thing that draws our models on screen
  var renderer = new THREE.WebGLRenderer();

  // container for everything
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, // fov
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
  );

  // instantiate objecst
  const box1 = createBox(1, 1, 1);
  const plane1 = createPlane(20, 20);
  const light1 = createLight('white', 3);
  const sphere1 = createSphere(0.1);

  // controls
  // const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // move stuff around
  camera.position.z = 10;
  camera.position.y = 4;
  camera.position.x = 1;
  camera.lookAt(box1.position);

  plane1.rotateX(Math.PI / 2);
  plane1.name = 'plane-1';

  box1.position.y = box1.geometry.parameters.height / 2;

  light1.translateY(5);

  // add stuff to the scene
  scene.add(camera);
  scene.add(box1);
  scene.add(plane1);
  scene.add(light1);
  light1.add(sphere1);

  // add GUI properties
  gui.add(light1, 'intensity', 0, 10);
  gui.add(light1.position, 'y', 0, 10);
  gui.add(camera.position, 'x', -10, 10);
  gui.add(camera.position, 'y', -10, 10);
  gui.add(camera.position, 'z', -10, 10);

  // set size of our renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('blue');

  const canvas = document.getElementById('webgl');
  canvas.appendChild(renderer.domElement);

  // controls.update();
  // render
  update(renderer, scene, camera);
};

const update = (renderer, scene, camera) => {
  // controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(() => update(renderer, scene, camera));
};

const createBox = (width, height, depth, color = 0x00ff00) => {
  const boxGeo = new THREE.BoxGeometry(width, height, depth);
  const boxMat = new THREE.MeshPhongMaterial({ color });
  const boxMesh = new THREE.Mesh(boxGeo, boxMat);
  boxMesh.castShadow = true;
  return boxMesh;
};

const createPlane = (width, height, color = '#800000') => {
  const planeGeo = new THREE.PlaneGeometry(width, height);
  const planeMat = new THREE.MeshPhongMaterial({
    color,
    side: THREE.DoubleSide
  });
  const planeMesh = new THREE.Mesh(planeGeo, planeMat);
  planeMesh.recieveShadows = true;
  return planeMesh;
};

const createSphere = radius => {
  const sphereGeo = new THREE.SphereGeometry(radius);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 'yellow' });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  return sphereMesh;
};

const createLight = (color = 'white', intensity = 0.2) => {
  const light = new THREE.SpotLight(color, intensity);
  return light;
};

init();
