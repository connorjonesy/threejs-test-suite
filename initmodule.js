import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//init scene
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


//starter scene 3d objects - cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [
    makeInstance(geometry, 0x42ff29,  -2, scene),
    makeInstance(geometry, 0x007bff, 0, scene),
    makeInstance(geometry, 0xff00a2,  2, scene),
];
const controls = new OrbitControls(camera, renderer.domElement);


export function getScene(){
    return scene;
}

export function getCamera(){
    return camera;
}

export function getRenderer(){
    return renderer;
}

export function getCubes(){
    return cubes;
}

export function getControls(){
    return controls;
}

function makeInstance(geometry, color, xpos, scene) {
    const material = new THREE.MeshPhongMaterial({color});
    material.shininess = 500;
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    cube.position.x = xpos;
    
    return cube;
}