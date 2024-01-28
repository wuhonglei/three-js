import * as THREE from "three";

import "./index.css";

export interface Props {}

export default function Line(props: Props) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  // create a blue LineBasicMaterial
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  const canvas = document.createElement("canvas");
  canvas.width = 256; // 设置Canvas的尺寸
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#ffffff"; // 文字颜色
    ctx.font = "48px serif"; // 文字样式
  }
  ctx?.fillText("Hello World", 0, 48); // 文字内容，以及在Canvas上的位置

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  const material1 = new THREE.MeshBasicMaterial({
    map: texture,
  });
  // 创建一个平面几何体并应用材质
  const geometry1 = new THREE.PlaneGeometry(10, 10);
  const mesh = new THREE.Mesh(geometry1, material1);

  scene.add(line, mesh);
  renderer.render(scene, camera);

  return (
    <>
      {renderer.domElement}
      <div id="info">Description</div>
    </>
  );
}
