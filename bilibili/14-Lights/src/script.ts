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

const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00, // 绿色
  metalness: 0.5, // 中等金属感
  roughness: 0.1, // 低粗糙度，高光泽
});

// Step 3: 添加光源
const ambientLight = new THREE.AmbientLight(0x404040, 2); // 环境光
scene.add(ambientLight);

const pointLight2 = new THREE.PointLight(0xffffff, 0.7); // 点光源
pointLight2.position.set(0, 5, 5);
scene.add(pointLight2);

// direction light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(0, 5, 5);
// scene.add(directionalLight);

// hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);
hemisphereLight.position.set(0, 5, 0);
scene.add(hemisphereLight);

// sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.set(-1.5, 0, 0);

// cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

// donut
const donut = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
donut.position.set(1.5, 0, 0);

// plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 3, 1, 1),
  new THREE.MeshStandardMaterial({
    color: 0xdddddd, // 绿色
    metalness: 0.5, // 中等金属感
    roughness: 0.7, // 低粗糙度，高光泽
  })
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.6;

scene.add(sphere, cube, donut, plane);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 3);
camera.lookAt(cube.position);
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
