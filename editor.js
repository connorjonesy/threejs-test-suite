import * as THREE from 'three';
import {getCubes} from './initmodule.js';

//colour picker
const colourpicker3 = document.getElementById('colour3');
colourpicker3.addEventListener('input', function(e) {
    let selectedColor = e.target.value; //string like #ffffffff
    const newColour = new THREE.Color(selectedColor);
    getCubes()[2].material.color.copy(newColour); 
});

const colourpicker2 = document.getElementById('colour2');
colourpicker2.addEventListener('input', function(e) {
    let selectedColor = e.target.value; //string like #ffffffff
    const newColour = new THREE.Color(selectedColor);
    getCubes()[1].material.color.copy(newColour); 
});

const colourpicker1 = document.getElementById('colour1');
colourpicker1.addEventListener('input', function(e) {
    let selectedColor = e.target.value; //string like #ffffffff
    const newColour = new THREE.Color(selectedColor);
    getCubes()[0].material.color.copy(newColour); 
});

//TODO:: Fix -- metalness only affects meshstandard materials. not phong
//metallic button
document.getElementById('metal').addEventListener('change', (e) => {
    const checkbox = e.target;
    const metalness = 1;
    if (checkbox.checked) {
        console.log("Checkbox is checked");
        getCubes()[0].material.metalness = metalness;
    } else {
        console.log("Checkbox is not checked");
    }
});