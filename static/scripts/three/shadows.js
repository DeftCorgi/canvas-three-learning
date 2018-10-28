const init = () => {
  // GUI for dynamic value selection
  const gui = new dat.GUI();

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

  // instantiate objecst
  const box1 = createBox(1, 1, 1);
  const plane1 = createPlane(20, 20);
  const light1 = createLight('white', 0.8);
  const sphere1 = createSphere(0.1);

  // controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // move stuff around
  camera.position.z = 10;
  camera.position.y = 4;
  camera.position.x = 1;
  camera.lookAt(box1.position);

  plane1.rotateX(Math.PI / 2);
  plane1.name = 'plane-1';

  box1.position.y = box1.geometry.parameters.height / 2 + 1;
  box1.name = 'box1';

  light1.translateY(3.6);

  // add stuff to the scene
  scene.add(camera);
  scene.add(box1);
  scene.add(plane1);
  scene.add(light1);
  light1.add(sphere1);

  // add GUI properties
  gui.add(light1, 'intensity', 0, 10);
  gui.add(light1.position, 'y', 0, 10);

  const canvas = document.getElementById('webgl');
  canvas.appendChild(renderer.domElement);

  controls.update();
  // render
  update(renderer, scene, camera, controls);
};

const update = (renderer, scene, camera, controls) => {
  controls.update();
  renderer.render(scene, camera);

  // spin the box
  const box = scene.getObjectByName('box1');
  box.rotateY(Math.PI / 40);
  box.rotateX(Math.PI / 50);

  window.requestAnimationFrame(() => update(renderer, scene, camera, controls));
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

const createLight = (color = 'white', intensity = 0.2) => {
  const light = new THREE.SpotLight(color, intensity);
  light.castShadow = true;
  return light;
};

init();
