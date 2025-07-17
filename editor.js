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


//TODO:: attach this to the save button
fetch('http://localhost:8000/save', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        cube1_colour: '#caac25ff', //probably will be like #aaaaaa
        cube2_colour: '#007bff',
        cube3_colour: '#ff00a2'
    })
})
.then(async response => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return response.json();
})
.then(data => succ_alert(data)) //html pop up success alert
.catch(error => console.error('Error:', error));


//TODO:: write this properly
fetch('http://localhost:8000/load', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 

    })
})
.then(async response => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return response.json();
})
.then(data => succ_alert(data)) //html pop up success alert
.catch(error => console.error('Error:', error));

//TODO:: write this correctly
function succ_alert(data){
    if(1 > 0){ //data status = success, succ_save popup
        console.log("placeholder");
    }else{ // data status failed, fail_save popup

    }
}