import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
const mesh3 = new THREE.Mesh(geometry, material);
const mesh4 = new THREE.Mesh(geometry, material);
// scene.add(mesh2);
// scene.add(mesh3);
// scene.add(mesh4);

// 创建一个网格 (Mesh) 来组合几何体和材质
const circle = new THREE.Mesh(
  new THREE.CircleGeometry(1, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(mesh1);

// scene.add(circle);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas!,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

gsap.to(mesh1.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh1.position, { x: 0, duration: 1, delay: 2 });

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = clock.getDelta();
  // console.info("elapsedTime", elapsedTime);
  //   console.info("deltaTime", deltaTime);
  //   const distance = Math.sin(elapsedTime);
  // mesh1.rotation.z += (deltaTime * Math.PI) / 8;

  //   mesh1.position.x = Math.sin(elapsedTime);
  //   mesh1.position.y = Math.cos(elapsedTime);
  //   mesh2.position.x = -distance;
  //   mesh3.position.y = distance;
  //   mesh4.position.y = -distance;
  //   camera.position.x = Math.sin(elapsedTime);
  //   camera.position.y = Math.cos(elapsedTime);
  //   camera.lookAt(mesh1.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
