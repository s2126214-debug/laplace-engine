import * as THREE from "three";

export function createUniverse(scene) {

  const starCount = 5000;

  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 4000;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 3,
    transparent: true,
    opacity: 0.9
  });

  const stars = new THREE.Points(
    geometry,
    material
  );

  scene.add(stars);

  return stars;
}