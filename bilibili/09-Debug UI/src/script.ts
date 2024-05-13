import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import GUI from "lil-gui";

const gui = new GUI({
  width: 340,
  title: "Nice debug ui",
  closeFolders: true,
});

// gui.hide();

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

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

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
  return;
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

const myObject = {
  color: "#de7147",
  sayHello: () => {
    gsap.to(mesh.rotation, {
      x: mesh.rotation.x + Math.PI * 2,
      y: mesh.rotation.y + Math.PI * 2,
      z: mesh.rotation.z + Math.PI * 2,
    });
  },
  subdivision: 2,
};

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: myObject.color,
  wireframe: true,
});

// Object
const mesh = new THREE.Mesh(geometry, material);
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

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(mesh.position, "x").min(-3).max(3).step(0.01).name("haha");

gui.add(camera.position, "x").min(-3).max(3).step(0.01).name("x");
gui.add(camera.position, "y").min(-3).max(3).step(0.01).name("y");
gui.add(camera.position, "z").min(-3).max(3).step(0.01).name("z");

gui.add(mesh, "visible");
gui.add(mesh.material, "wireframe");
gui.addColor(myObject, "color").onChange((value) => {
  material.color.set(value);
});
gui.add(myObject, "sayHello").name("rotation");
gui
  .add(myObject, "subdivision")
  .min(1)
  .max(10)
  .step(1)
  .onChange((value) => {
    mesh.geometry.dispose(); // 释放内存
    const newGeometry = new THREE.BoxGeometry(1, 1, 1, value, value, value);
    mesh.geometry = newGeometry;
  });

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
