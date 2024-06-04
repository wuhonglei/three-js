import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

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

const loader = new FontLoader();
loader.load("fonts/optimer_regular.typeface.json", (font) => {
  console.info("font", font);
  // 创建文本几何体
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true,
  });

  // 创建网格并添加到场景
  const textMesh = new THREE.Mesh(textGeometry, material);
  // 将字体放在中心
  // textGeometry.computeBoundingBox();
  textGeometry.center();
  // 打印字体位置
  console.info("textGeometry.boundingBox", textGeometry.boundingBox);

  scene.add(textMesh);
});

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })
);
// scene.add(mesh);

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
