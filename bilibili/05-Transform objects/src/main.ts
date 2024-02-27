import * as THREE from "three";

const scene = new THREE.Scene();

// red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const size = {
  width: 800,
  height: 600,
};

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);

// Renderer
const canvas = document.querySelector("canvas.webgl")!;
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(size.width, size.height);

mesh.position.set(0, 0, 0);
camera.position.set(-0.5, -0.5, 2);

console.info("camera.position", camera.position);
// console.info("mesh.position.normalize()", mesh.position.normalize());
// console.info("mesh.position", mesh.position);
// console.info("mesh.length()", mesh.position.length());

console.info("distance to center", mesh.position.length());
console.info("distance to camera", mesh.position.distanceTo(camera.position));

renderer.render(scene, camera);
