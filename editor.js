import * as THREE from 'three';

export default class Editor {
    constructor(scene) {
        this.scene = scene;
        this.initColorPickers();
        this.initMetalness();
        this.initLoadButton();
    }
    initColorPickers() {
        document.getElementById('colour1').addEventListener('input', (e) => {
            let selectedColor = e.target.value; //string like #ffffffff
            const newColour = new THREE.Color(selectedColor);
            this.scene.cubes[0].material.color.copy(newColour);
        });
        document.getElementById('colour2').addEventListener('input', (e) => {
            let selectedColor = e.target.value; //string like #ffffffff
            const newColour = new THREE.Color(selectedColor);
            this.scene.cubes[1].material.color.copy(newColour);
        });
        document.getElementById('colour3').addEventListener('input', (e) => {
            let selectedColor = e.target.value; //string like #ffffffff
            const newColour = new THREE.Color(selectedColor);
            this.scene.cubes[2].material.color.copy(newColour);
        });
    }

    initMetalness() {
        //TODO:: Fix -- metalness only affects meshstandard materials. not phong
        //metallic button
        document.getElementById('metal').addEventListener('change', (e) => {
            const checkbox = e.target;
            const metalness = 1;
            if (checkbox.checked) {
                console.log("Checkbox is checked");
                this.scene.getCubes()[0].material.metalness = metalness;
            } else {
                console.log("Checkbox is not checked");
            }
        });
    }

    initLoadButton() {
        document.getElementById('load_preset_btn').addEventListener('click', () => { this.popUp() });
    }

    popUp() {
        let modal = document.getElementById("modal");
        modal.style.display = "block";
        //if(presets.length == 0)
        document.getElementById('close').onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    load_preset() {
        const url = new URL('http://localhost:8000/load');
        url.searchParams.append('preset_name', preset_name); // like this http://localhost:8000/load?preset_name=preset_value

        fetch(url.toString(), {
            method: 'GET',
            mode: 'cors'
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
    }

    save_preset() {
        document.getElementById('save_preset_btn').addEventListener('click', () => {
            const preset_name = document.getElementById('preset_name').value;
            fetch('http://localhost:8000/save', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': preset_name,
                    'cube1_colour': getCubes()[0].material.color.getHexString(), //format is aaaaaa (no #)
                    'cube2_colour': getCubes()[1].material.color.getHexString(),
                    'cube3_colour': getCubes()[2].material.color.getHexString()
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
        });
    }


    succ_alert(data) {
        if (1 > 0) { //data status = success, succ_save popup
            console.log("placeholder1");
        } else { // data status failed, fail_save popup
            console.log("placeholder2");
        }
    }

}
