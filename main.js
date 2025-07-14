//import * as THREE from 'three';
import { getRenderer, getCubes, getControls, getScene, getCamera} from './initmodule.js';

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


function animate() {
    requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(getRenderer())) {
        const canvas = getRenderer().domElement;
        getCamera().aspect = canvas.clientWidth / canvas.clientHeight;
        getCamera().updateProjectionMatrix();
    }
    getCubes().forEach((cube) => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
    });

    getControls().update();
    getRenderer().render(getScene(), getCamera());
}
animate();