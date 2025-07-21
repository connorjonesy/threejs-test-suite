import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default class Scene {
    constructor(canvasId = '#c') {
        this.canvas = document.querySelector(canvasId);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.camera.position.z = 5;

        //lighting
        this.setupLighting();

        //objects
        this.cubes = this.createCubes();

        //controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        //handle window resize
        window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
    }

    setupLighting() {
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
        directionalLight.position.set(-1, 2, 4);
        this.scene.add(directionalLight);
        const ambientLight = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(ambientLight);
    }

    createCubes() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const colors = [0x42ff29, 0x007bff, 0xff00a2];
        const positions = [-2, 0, 2];

        return positions.map((x, i) => {
            return this.createCube(geometry, colors[i], x);
        });
    }

    createCube(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color, shininess: 500 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = x;
        this.scene.add(cube);
        return cube;
    }

    handleResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
    }

    resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    getScene() { return this.scene; }
    getCamera() { return this.camera; }
    getRenderer() { return this.renderer; }
    getCubes() { return this.cubes; }
    getControls() { return this.controls; }

    //animation loop
    update() {
        if (this.resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
        this.cubes.forEach((cube) => {
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.005;
        });

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

