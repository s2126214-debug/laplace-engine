import * as THREE from "three";

export function createNetwork(scene) {

    const group = new THREE.Group();

    const nodeCount = 80;
    const positions = [];

    const nodeGeometry = new THREE.SphereGeometry(3.5, 10, 10);

    const nodeMaterial = new THREE.MeshBasicMaterial({
        color: 0x66ccff
    });

    for(let i=0;i<nodeCount;i++){

        const x=(Math.random()-0.5)*900;
        const y=(Math.random()-0.5)*500;
        const z=(Math.random()-0.5)*900;

        positions.push(new THREE.Vector3(x,y,z));

        const node=new THREE.Mesh(nodeGeometry,nodeMaterial);

        node.position.set(x,y,z);

        group.add(node);

    }

    const lineMaterial=new THREE.LineBasicMaterial({

        color:0x44bbff,
        transparent:true,
        opacity:0.15

    });

    for(let i=0;i<positions.length;i++){

        for(let j=i+1;j<positions.length;j++){

            if(positions[i].distanceTo(positions[j])<170){

                const geometry=new THREE.BufferGeometry().setFromPoints([
                    positions[i],
                    positions[j]
                ]);

                const line=new THREE.Line(geometry,lineMaterial);

                group.add(line);

            }

        }

    }

    scene.add(group);

    group.userData.time = 0;

    return group;

}