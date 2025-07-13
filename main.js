import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 5;        

//lighting
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
const ambientlight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientlight);


//cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [
    makeInstance(geometry, 0x42ff29,  -2),
    makeInstance(geometry, 0x007bff, 0),
    makeInstance(geometry, 0xff00a2,  2),
];

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    cubes.forEach((cube) => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
    });

    controls.update();
    renderer.render(scene, camera);
}
animate();





//------Utilities------

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
    renderer.setSize(width, height, false);
    }
    return needResize;
}

function makeInstance(geometry, color, xpos) {
    const material = new THREE.MeshPhongMaterial({color});
    material.shininess = 500;
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    cube.position.x = xpos;
    
    return cube;
}


//colour picker
const colourpicker3 = document.getElementById('colour3');
colourpicker3.addEventListener('input', function(e) {
    let selectedColor = e.target.value; //string like #ffffffff
    const newColour = new THREE.Color(selectedColor);
    cubes[2].material.color.copy(newColour); 
});

const colourpicker2 = document.getElementById('colour2');
colourpicker2.addEventListener('input', function(e) {
    let selectedColor = e.target.value; //string like #ffffffff
    const newColour = new THREE.Color(selectedColor);
    cubes[1].material.color.copy(newColour); 
});

const colourpicker1 = document.getElementById('colour1');
colourpicker1.addEventListener('input', function(e) {
    let selectedColor = e.target.value; //string like #ffffffff
    const newColour = new THREE.Color(selectedColor);
    cubes[0].material.color.copy(newColour); 
});

