import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import GUI from "lil-gui";

import doorUrl from "./assets/door.jpeg";
import iceUrl from "./assets/ice_surface.jpeg";
import checkerboardUrl from "./assets/checkerboard-1024x1024.png";
import checkerboardUrlSmall from "./assets/checkerboard-8×8.png";
import metalUrl from "./assets/Metal_pattern_007d.png";
import alphaUrl from "./assets/alphamap.png";
import matCapUrl from "./assets/matcaps/6.png";
import blueGradient from "./assets/matcaps/蓝色渐变.png";

const gui = new GUI({
  width: 340,
  title: "Nice debug ui",
  closeFolders: true,
});

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
  // console.log("onLoad");
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  // console.log("onProgress", url, itemsLoaded, itemsTotal);
};

manager.onError = (url) => {
  console.log("onError", url);
};

const textureLoader = new THREE.TextureLoader(manager);
const doorTexture = textureLoader.load(doorUrl);
const iceTexture = textureLoader.load(iceUrl);
const checkerboardTexture = textureLoader.load(checkerboardUrl);
const checkerboardTextureSmall = textureLoader.load(checkerboardUrlSmall);
const metalTexture = textureLoader.load(metalUrl);
const alphaTexture = textureLoader.load(alphaUrl);
const matCapTexture = textureLoader.load(matCapUrl);
const blueGradientTexture = textureLoader.load(blueGradient);

// 立方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// 球体
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);

// plane 平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);

// torus
const torusGeometry = new THREE.TorusGeometry(0.4, 0.2, 16, 32);

// const material = new THREE.MeshBasicMaterial({
//   // color: "purple",
//   map: iceTexture,
//   // alphaMap: alphaTexture,
//   transparent: true, // 启用透明度
//   opacity: 1, // 设置不透明度
// });
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial({
//   wireframe: false,
//   wireframeLinewidth: 5,
//   flatShading: true,
// });

// const material = new THREE.MeshMatcapMaterial({
//   matcap: blueGradientTexture,
// });

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// 创建深度材质
// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial({});

// const material = new THREE.MeshPhongMaterial({
//   specular: 0x1188ff, // 高光颜色
//   shininess: 30, // 高光强度
// });

const material = new THREE.MeshStandardMaterial({
  // color: 0x0077ff, // 基础颜色
  metalness: 0.5, // 金属度
  roughness: 0.5, // 粗糙度
  map: doorTexture,
});

gui.add(material, "metalness").min(0).max(1).step(0.01).name("金属度");
gui.add(material, "roughness").min(0).max(1).step(0.01).name("粗糙度");

// Object
const boxMesh = new THREE.Mesh(boxGeometry, material);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material);
const torusMesh = new THREE.Mesh(torusGeometry, material);

boxMesh.position.x = -1.5;
sphereMesh.position.x = 0;
torusMesh.position.x = 1.5;

scene.add(boxMesh, sphereMesh, planeMesh, torusMesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 3);
camera.lookAt(boxMesh.position);
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
