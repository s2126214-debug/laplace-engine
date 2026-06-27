import "./style.css";
import * as THREE from "three";

// ===== Scene =====
const scene = new THREE.Scene();

// ===== Camera =====
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  5000
);

camera.position.z = 800;

// ===== Renderer =====
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);

document.body.appendChild(renderer.domElement);

// =====================
// 星空
// =====================

const starCount = 5000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 4000;
}

const starGeometry = new THREE.BufferGeometry();

starGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 4,
  sizeAttenuation: true,
});

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

// =====================
// AI NETWORK
// =====================

const network = new THREE.Group();

const nodes = [];

for (let i = 0; i < 70; i++) {

  const node = new THREE.Mesh(

    new THREE.SphereGeometry(2.5, 8, 8),

    new THREE.MeshBasicMaterial({

      color: 0x00ffff

    })

  );

  node.position.set(

    (Math.random() - 0.5) * 500,
    (Math.random() - 0.5) * 500,
    (Math.random() - 0.5) * 500

  );

  network.add(node);

  nodes.push(node);

}

const lineMaterial = new THREE.LineBasicMaterial({

  color: 0x00ffff,

  transparent: true,

  opacity: 0.15,

});

for (let i = 0; i < nodes.length; i++) {

  for (let j = i + 1; j < nodes.length; j++) {

    if (nodes[i].position.distanceTo(nodes[j].position) < 120) {

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([

        nodes[i].position,

        nodes[j].position,

      ]);

      const line = new THREE.Line(lineGeometry, lineMaterial);

      network.add(line);

    }

  }

}

scene.add(network);

// =====================
// HUD
// =====================

const hud = document.createElement("div");

hud.style.position = "absolute";
hud.style.left = "40px";
hud.style.top = "40px";
hud.style.color = "#66ffff";
hud.style.fontFamily = "monospace";
hud.style.fontSize = "20px";
hud.style.whiteSpace = "pre";
hud.style.pointerEvents = "none";

document.body.appendChild(hud);

// =====================
// Animation
// =====================

let t = 0;

function animate() {

  requestAnimationFrame(animate);

  t += 0.01;

  stars.rotation.y += 0.00015;
  stars.rotation.x += 0.00005;

  network.rotation.y += 0.001;
  network.rotation.x += 0.0002;

  const probability = (99.998 + Math.sin(t) * 0.001).toFixed(3);

  hud.innerHTML = `LAPLACE ENGINE

Universe : LOCKED

Probability : ${probability} %

Entropy : STABLE

Nodes : ${nodes.length}`;

  renderer.render(scene, camera);

}

animate();

// =====================

window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});