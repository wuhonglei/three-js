import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement;

  if (!fullscreenElement) {
    if (canvas!.requestFullscreen) {
      canvas!.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// Scene
const scene = new THREE.Scene();

const count = 50; // 50 个三角形
const pointArray = new Array(count * 3 * 3)
  .fill(undefined)
  .map((_) => Math.random() - 0.5);
const positionArray = new Float32Array(pointArray);
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttribute);

// Object
const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 3);
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas!,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.enabled = false;

const tick = () => {
  requestAnimationFrame(tick);

  controls.update();

  renderer.render(scene, camera);
};

tick();
