const config = {};
// GUI for dynamic value selection
const gui = new dat.GUI();
const init = () => {
  // thing that draws our models on screen
  var renderer = new THREE.WebGLRenderer();

  // configure our renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('blue');
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  // container for everything
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, // fov
    window.innerWidth / window.innerHeight, // aspect ratio
    1, // near clipping plane
    1000 // far clipping plane
  );
  // const camera = new THREE.OrthographicCamera(-10, 10, 10, -10);

  config.light = 0;
  // instantiate objecst
  const boxGrid = createBoxGrid(20, 0.5);
  const plane1 = createPlane(50, 50);
  let light1 = createDirectionalLight('white', 0.8);
  const sphere1 = createSphere(0.1);

  // controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // move stuff around
  camera.position.z = 10;
  camera.position.y = 4;
  camera.position.x = 1;
  camera.lookAt(boxGrid);

  plane1.rotateX(Math.PI / 2);
  plane1.name = 'plane-1';

  boxGrid.name = 'boxGrid1';

  light1.translateY(3.6);
  light1.name = 'light';

  // add stuff to the scene
  scene.add(camera);
  scene.add(boxGrid);
  scene.add(plane1);
  scene.add(light1);
  light1.add(sphere1);

  // add GUI properties
  gui.add(light1, 'intensity', 0, 10);
  gui.add(light1.position, 'x', -10, 10);
  gui.add(light1.position, 'y', 1, 10);
  gui.add(light1.position, 'z', -10, 10);
  gui.add(config, 'light', [0, 1, 2, 3]);

  const canvas = document.getElementById('webgl');
  canvas.appendChild(renderer.domElement);

  controls.update();
  // render
  update(renderer, scene, camera, controls);
};

const update = (renderer, scene, camera, controls) => {
  controls.update();
  renderer.render(scene, camera);

  // orbit the light in the sky
  const light = scene.getObjectByName('light');
  light.userData.orbit += light.userData.orbitSpeed;
  light.position.x = Math.sin(light.userData.orbit) * light.userData.orbitSize;
  light.position.z = Math.cos(light.userData.orbit) * light.userData.orbitSize;

  window.requestAnimationFrame(() => update(renderer, scene, camera, controls));
};

const createBoxGrid = (size, gap = 0.4) => {
  const boxGrid = new THREE.Group();

  // create boxes in a size x size grid
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const height = 1 + Math.random() * 4;
      const box = createBox(1, height, 1);
      box.position.y = box.geometry.parameters.height / 2;
      box.position.x = i + i * gap;
      box.position.z = j + j * gap;
      boxGrid.add(box);
    }
  }

  // center boxgrid
  const offset = -(size + (size - 1) * gap - 1) / 2;
  boxGrid.translateX(offset);
  boxGrid.translateZ(offset);
  return boxGrid;
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
  planeMesh.receiveShadow = true;
  return planeMesh;
};

const createSphere = radius => {
  const sphereGeo = new THREE.SphereGeometry(radius);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 'yellow' });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  return sphereMesh;
};

const createPointLight = (color = 'white', intensity = 0.2) => {
  const light = new THREE.PointLight(color, intensity);
  light.castShadow = true;
  light.shadow.bias = 0.001;
  light.penumbra = 0.7;
  return light;
};

const createDirectionalLight = (color = 'white', intensity = 0.2) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.x = 7.2;
  light.castShadow = true;
  light.shadow.bias = 0.001;

  light.shadow.camera.left = -20;
  light.shadow.camera.right = 20;
  light.shadow.camera.top = 20;
  light.shadow.camera.bottom = -20;

  light.userData = { orbit: 0, orbitSpeed: 0.003, orbitSize: 4 };

  // gui controls for orbiting light
  gui.add(light.userData, 'orbitSpeed', 0, 0.01);
  gui.add(light.userData, 'orbitSize', 0, 10);

  // const helper = new THREE.CameraHelper(light.shadow.camera);
  // light.add(helper);
  return light;
};

init();
