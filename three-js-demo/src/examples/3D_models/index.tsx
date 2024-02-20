import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelPath from "./matilda.glb?url";
import { createEffect, createMemo, createSignal } from "solid-js";
console.info("model", modelPath);

export interface Props {}

async function load3DModel(url: string) {
  // 创建 GLTFLoader 实例
  const loader = new GLTFLoader();
  return new Promise<THREE.Group>((resolve, reject) => {
    // 加载 GLB 模型
    loader.load(
      url,
      function (gltf) {
        resolve(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}

export default function Models(props: Props) {
  const [modelScene, setModelScene] = createSignal<THREE.Group>();

  createEffect(async () => {
    const currentModel = await load3DModel(modelPath);
    setModelScene(currentModel);
  });

  const element = createMemo(() => {
    if (!modelScene()) return null;

    // 初始化场景
    const scene = new THREE.Scene();

    // 初始化相机
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.set(2, 2, 2);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 添加光源
    const light = new THREE.AmbientLight(0xffffff, 10);
    scene.add(light);
    scene.add(modelScene()!);

    // 渲染场景
    renderer.render(scene, camera);

    return renderer.domElement;
  });

  return <div>{element()}</div>;
}
