import * as THREE from "three";

export function createNetwork(scene){

    const group = new THREE.Group();

    const points=[];

    for(let i=0;i<80;i++){

        const mesh=new THREE.Mesh(

            new THREE.SphereGeometry(2,8,8),

            new THREE.MeshBasicMaterial({
                color:0x00ffff
            })

        );

        mesh.position.set(

            (Math.random()-0.5)*500,
            (Math.random()-0.5)*500,
            (Math.random()-0.5)*500

        );

        group.add(mesh);

        points.push(mesh);

    }

    const material=new THREE.LineBasicMaterial({

        color:0x00ffff,
        transparent:true,
        opacity:0.2

    });

    for(let i=0;i<points.length;i++){

        for(let j=i+1;j<points.length;j++){

            if(points[i].position.distanceTo(points[j].position)<120){

                const geometry=new THREE.BufferGeometry().setFromPoints([

                    points[i].position,
                    points[j].position

                ]);

                group.add(new THREE.Line(geometry,material));

            }

        }

    }

    scene.add(group);

    return group;

}