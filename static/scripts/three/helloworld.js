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

  // move stuff around
  camera.position.z = 5;
  camera.position.y = 1;
  camera.position.x = 1;
  camera.lookAt(box1.position);

  // add stuff to the scene
  scene.add(camera);
  scene.add(box1);

  // think that draws our models on screen
  var renderer = new THREE.WebGLRenderer();

  // set size of our renderer
  renderer.setSize(window.innerWidth, window.innerHeight);

  const canvas = document.getElementById('webgl');
  canvas.appendChild(renderer.domElement);

  // render
  renderer.render(scene, camera);
};

const createBox = (width, height, depth) => {
  const boxGeo = new THREE.BoxGeometry(width, height, depth);
  const boxMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const boxMesh = new THREE.Mesh(boxGeo, boxMat);
  return boxMesh;
};

init();
