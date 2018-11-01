const config = {};
// GUI for dynamic value selection
const gui = new dat.GUI();
const init = () => {
  // thing that draws our models on screen
  var renderer = new THREE.WebGLRenderer();

  // configure our renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('white');
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
  const cameraRig = new THREE.Group();
  cameraRig.add(camera);

  config.light = 0;
  scene.fog = new THREE.FogExp2('white', 0.01);

  // instantiate objecst
  const city = createCity(6, 1.7, 5, 0.3);
  const plane1 = createPlane(100, 100);
  let light1 = createDirectionalLight('white', 0.8);
  const sphere1 = createSphere(0.1);

  // controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // move stuff around
  cameraRig.position.y = 100;
  cameraRig.position.z = 30;

  // Tweens

  new TWEEN.Tween(cameraRig.position)
    .to({ z: -50, y: 5, x: [10, 0] }, 10000)
    .start();

  plane1.rotateX(Math.PI / 2);
  plane1.name = 'plane-1';

  // boxGrid.name = 'boxGrid1';

  light1.position.x = 5;
  light1.position.y = 10;
  light1.position.z = -15;

  light1.name = 'light';

  // add stuff to the scene
  scene.add(cameraRig);
  // scene.add(boxGrid);
  scene.add(city);
  scene.add(plane1);
  scene.add(light1);
  light1.add(sphere1);

  // add GUI properties
  gui.add(light1, 'intensity', 0, 10);

  const canvas = document.getElementById('webgl');
  canvas.appendChild(renderer.domElement);

  controls.update();
  // render
  update(renderer, scene, camera, controls);
};

const update = (renderer, scene, camera, controls) => {
  // updates
  controls.update();
  TWEEN.update();

  // render our scene after updates
  renderer.render(scene, camera);

  // orbit the light in the sky
  // const light = scene.getObjectByName('light');
  // light.userData.orbit += light.userData.orbitSpeed;
  // light.position.x = Math.sin(light.userData.orbit) * light.userData.orbitSize;
  // light.position.z = Math.cos(light.userData.orbit) * light.userData.orbitSize;

  window.requestAnimationFrame(() => update(renderer, scene, camera, controls));
};

const createCity = (size, gap, blockSize = 5, blockGap = 0.4) => {
  const blockWidth = blockSize + blockSize * blockGap;
  const city = new THREE.Group();
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const block = createBoxGrid(blockSize, blockGap);
      block.position.x = i * blockWidth + i * gap;
      block.position.z = j * blockWidth + j * gap;
      city.add(block);
    }
  }

  // centre city
  const offset = -(size * blockWidth + (size - 1) * gap - 1) / 2;
  city.translateX(offset);
  city.translateZ(offset);

  return city;
};

const createBoxGrid = (size, gap = 0.4) => {
  const boxGrid = new THREE.Group();

  // create boxes in a size x size grid
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const height = 1 + Math.random() * 10;
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

const createBox = (width, height, depth, color = 'grey') => {
  const boxGeo = new THREE.BoxGeometry(width, height, depth);
  const boxMat = new THREE.MeshPhongMaterial({ color });
  const boxMesh = new THREE.Mesh(boxGeo, boxMat);
  boxMesh.castShadow = true;
  return boxMesh;
};

const createPlane = (width, height, color = 'black') => {
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
