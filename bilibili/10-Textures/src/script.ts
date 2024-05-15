import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import doorUrl from "./assets/door.jpeg";
import iceUrl from "./assets/ice_surface.jpeg";

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

const manager = new THREE.LoadingManager();

manager.onLoad = () => {
  console.log("onLoad");
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log("onProgress", url, itemsLoaded, itemsTotal);
};

manager.onError = (url) => {
  console.log("onError", url);
};

const textureLoader = new THREE.TextureLoader(manager);
const doorTexture = textureLoader.load(doorUrl);
const iceTexture = textureLoader.load(iceUrl);

// 创建一个球体
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Object
const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ map: iceTexture, wireframe: false })
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
