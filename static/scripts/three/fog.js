const init = () => {
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

  // move stuff around
  camera.position.z = 5;
  camera.position.y = 1.8;
  camera.position.x = 1;
  camera.lookAt(box1.position);

  plane1.rotateX(Math.PI / 2);
  plane1.name = 'plane-1';

  box1.position.y = box1.geometry.parameters.height / 2;

  // add stuff to the scene
  scene.add(camera);
  scene.add(box1);
  scene.add(plane1);

  // add fog
  scene.fog = new THREE.FogExp2('blue', 0.2);

  // think that draws our models on screen
  var renderer = new THREE.WebGLRenderer();

  // set size of our renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('blue');

  const canvas = document.getElementById('webgl');
  canvas.appendChild(renderer.domElement);

  // render
  update(renderer, scene, camera);
};

const update = (renderer, scene, camera) => {
  renderer.render(scene, camera);

  const plane = scene.getObjectByName('plane-1');
  // plane.rotateZ(Math.PI / 20);
  camera.translateZ(0.01);

  window.requestAnimationFrame(() => update(renderer, scene, camera));
};

const createBox = (width, height, depth, color = 0x00ff00) => {
  const boxGeo = new THREE.BoxGeometry(width, height, depth);
  const boxMat = new THREE.MeshBasicMaterial({ color });
  const boxMesh = new THREE.Mesh(boxGeo, boxMat);
  return boxMesh;
};

const createPlane = (width, height, color = '#800000') => {
  const planeGeo = new THREE.PlaneGeometry(width, height);
  const planeMat = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide
  });
  const planeMesh = new THREE.Mesh(planeGeo, planeMat);
  return planeMesh;
};

init();
