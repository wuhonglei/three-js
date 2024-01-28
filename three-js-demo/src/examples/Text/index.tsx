import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { faker } from "@faker-js/faker";

import type { Font } from "three/examples/jsm/loaders/FontLoader.js";

import { createEffect, createSignal, createMemo, onCleanup } from "solid-js";

import "./index.css";

import fontJson from "./font/Roboto-Medium_Regular.json?url";

async function loadFont(url: string): Promise<Font> {
  const loader = new FontLoader();
  const font = await new Promise<Font>((resolve, reject) => {
    loader.load(url, (font) => {
      resolve(font);
    });
  });
  return font;
}

export default function Line() {
  const [text, setText] = createSignal("Hello World");
  const [color, setColor] = createSignal("#eb0c16");
  const [font, setFont] = createSignal<Font | null>(null);

  createEffect(async () => {
    const font = await loadFont(fontJson);
    setFont(font);
  });

  createEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      // 只处理可见字符
      const char = event.key;
      console.info("char", char);
      // 英文字符
      const pattern = /^[a-zA-Z\d]$/;
      if (pattern.test(char)) {
        return setText((text) => text + char);
      }

      // 删除字符
      if (char === "Backspace") {
        console.info("delete");
        return setText((text) => text.slice(0, -1));
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyPress);
    });
  });

  const element = createMemo(() => {
    if (!font()) return null;

    // 创建场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 创建TextGeometry
    const geometry = new TextGeometry(text(), {
      font: font()!,
      size: 0.5,
      height: 0,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: color() });

    // 创建网格（Mesh）并添加到场景中
    const textMesh = new THREE.Mesh(geometry, material);
    scene.add(textMesh);

    // 渲染场景
    renderer.render(scene, camera);

    return renderer.domElement;
  });

  function changeColor() {
    setColor(faker.color.rgb());
  }

  return (
    <div>
      {element()}
      <div class="control">
        <button onClick={changeColor}>修改颜色</button>
      </div>
    </div>
  );
}
