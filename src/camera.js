import * as THREE from "three";

export function createAudienceCamera() {

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );

    // 客席中央
    camera.position.set(0, 0, 900);

    return camera;
}