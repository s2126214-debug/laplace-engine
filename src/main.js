import { createVideoElement, startVideo } from "./video";
import { nextScene } from "./sceneManager";
import { createSystemStatus } from "./systemStatus";
import { createProbability } from "./probability";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createAudienceCamera } from "./camera";
import { createHUD } from "./hud";
import "./style.css";
import * as THREE from "three";
import { createUniverse } from "./universe";
import { createNetwork } from "./network";

// シーン
const scene = new THREE.Scene();

// カメラ
const camera = createAudienceCamera();


// レンダラー
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);

document.body.innerHTML = "";
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.03;

createHUD();

createProbability();

createSystemStatus();

const video = createVideoElement();

startVideo(video).catch((err) => {
  console.error(err);
});

setTimeout(() => {

    const p = document.getElementById("probability");

    p.style.transition = "opacity 2s";

    p.style.opacity = "1";

}, 7000);

// 星空
const stars = createUniverse(scene);

// AIネットワーク
const network = createNetwork(scene);

// アニメーション
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    stars.rotation.y += 0.00015;
    stars.rotation.x += 0.00005;

    network.rotation.y += 0.0004;

    // AIが呼吸するような演出
    network.userData.time += 0.02;

    const s =
        1 +
        Math.sin(network.userData.time) *
        0.03;

    network.scale.set(s,s,s);

    renderer.render(scene,camera);

}

animate();

window.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();

        nextScene();

    }

});

// リサイズ対応
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});