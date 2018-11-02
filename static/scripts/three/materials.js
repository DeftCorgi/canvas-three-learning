const init = () => {
  // renderer stuff
  const renderer = new THREE.WebGLRenderer();
  const canvas = document.getElementById('webgl');
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('292F36');
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvas.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#292F36');

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // the ground
  const plane = createPlane(500, 500);
  const sphere1Mat = new THREE.MeshPhongMaterial({
    color: '#4ECDC4',
    shininess: 3000
  });
  const sphere1 = createSphere(2, sphere1Mat);

  const sphere2Mat = new THREE.MeshPhongMaterial({
    color: '#FF6B6B',
    shininess: 70
  });
  const sphere2 = createSphere(2, sphere2Mat);

  const sphere3Mat = new THREE.MeshPhongMaterial({
    color: 'pink',
    shininess: 1
  });
  const sphere3 = createSphere(2, sphere3Mat);

  const light1 = createLight(0.8);
  const light2 = createLight(0.8);

  scene.add(camera);
  scene.add(plane);
  scene.add(sphere1);
  scene.add(sphere2);
  scene.add(sphere3);
  scene.add(light1);
  scene.add(light2);

  // stuff
  camera.position.set(-0.709, 26.898, 26.522);
  camera.rotation.set(-0.792, -0.018, -0.019);
  // camera.lookAt(sphere1.position);

  sphere2.position.x = -10;
  sphere3.position.x = 10;

  light1.position.y = 10;
  light1.position.x = 5;
  light1.position.z = 3;

  light2.position.y = 10;
  light2.position.x = -5;
  light2.position.z = -3;

  controls.update();
  update(renderer, scene, camera);
};

const update = (renderer, scene, camera) => {
  renderer.render(scene, camera);
  console.log(camera.position);
  console.log(camera.rotation);
  window.requestAnimationFrame(() => update(renderer, scene, camera));
};

const createPlane = (w, h) => {
  const planeGeo = new THREE.PlaneGeometry(w, h);
  const planeMat = new THREE.MeshPhongMaterial({
    color: '#292F36',
    shininess: 100,
    side: THREE.DoubleSide
  });
  const planeMesh = new THREE.Mesh(planeGeo, planeMat);
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = Math.PI / 2;
  return planeMesh;
};

const createSphere = (
  radius = 5,
  sphereMat = new THREE.MeshPhongMaterial({ color: 'yellow' })
) => {
  const sphereGeo = new THREE.SphereGeometry(radius, 20, 16);
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereMesh.castShadow = true;
  sphereMesh.position.y = radius;
  return sphereMesh;
};

const createLight = (brightness = 0.3) => {
  const light = new THREE.PointLight('white', brightness);

  // helper to visualize light position
  const helperGeo = new THREE.SphereGeometry(0.2);
  const helperMat = new THREE.MeshPhongMaterial({
    color: 'yellow'
  });
  const helperMesh = new THREE.Mesh(helperGeo, helperMat);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  // light.add(helperMesh);

  return light;
};

init();
