import * as THREE from 'three';

export default class Editor {
    constructor(scene) {
        this.scene = scene;
        this.initColorPickers();
        this.initMetalness();
        this.initSaveButton();
        this.initLoadButton();
        this.initModalHandlers();
        this.saved_presets = []; //string names
        this.testfunction();
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

    initSaveButton() {
        document.getElementById('save_preset_btn').addEventListener('click', () => { this.savePopUp() });
    }

    initLoadButton() {
        document.getElementById('load_preset_btn').addEventListener('click', () => { this.loadPopUp() });
    }

    initModalHandlers() {
        let modallength = document.getElementsByClassName("modal").length; 
        for(let i=0; i < modallength; i++){
            let modal = document.getElementsByClassName("modal")[i];
            document.getElementsByClassName("close")[i].onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }

    }

    savePopUp() {
        let modal = document.getElementsByClassName("modal")[0];
        let preset_name = document.getElementById('preset_name').value;
        
        if (preset_name.length !== 0) {
            document.getElementById('succsave').innerHTML = 
            `   
                <h2>Preset Saved Successfully: ${preset_name}</h2>
                <p>Congratulations, friend</p>
            `
            document.getElementById('succsave').style.display = 'block';
            document.getElementById('failedsave').style.display = 'none';
            this.save_preset(preset_name);
        } else {
            document.getElementById('succsave').style.display = 'none';
            document.getElementById('failedsave').style.display = 'block';
        }
        
        modal.style.display = "block";
        //check to see if array updated
        console.log('presets saved in array: ' + this.saved_presets);

    }

    loadPopUp() {
        let modal = document.getElementsByClassName("modal")[1];
        
        if(this.saved_presets.length == 0){
            document.getElementById('nullpresets').style.display = 'block';
        }else{
            console.log('test');
            //display array
            document.getElementById('somepresets').innerHTML = 
            `
            <div style="border: 1px dotted black; display: flex; justify-content: space-between; padding: 20px; background-color: aquamarine; margin: 10px;">
                <div>Test</div> <div><input type="button" value="Load"></div>
            </div>
            `
        }
        // this.load_preset();
        modal.style.display = "block";
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

    save_preset(preset_name) {
        fetch('http://localhost:8000/save', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': preset_name,
                'cube1_colour': this.scene.cubes[0].material.color.getHexString(), //format is aaaaaa (no #)
                'cube2_colour': this.scene.cubes[1].material.color.getHexString(),
                'cube3_colour': this.scene.cubes[2].material.color.getHexString()
            })
        })
            .then(async response => {
                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(error);
                }
                return response.json();
            })
            .then(this.saved_presets.push(preset_name)) 
            .catch(error => console.error('Error:', error));
    }



    testfunction(){
        //FOR TESTING ONLY:
        this.saved_presets.push('tester save file!');
    }
}

