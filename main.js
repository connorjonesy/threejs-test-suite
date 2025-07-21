import Editor from './editor.js';
import Scene from './scene.js';


class Main {
  constructor() {
    this.scene = new Scene();
    this.editor = new Editor(this.scene);
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.scene.update();
  }
}

new Main(); //start the app