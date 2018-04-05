This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Installation

Install Three.js package

```
npm install three
```

## Run Demo

```
npm start
```
Web browser will automatically open at localhost:3000

## Customize Canvas Size

Default canvas size is full screen.
```
renderer.setSize(window.innerWidth, window.innerHeight);
camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);

//Dynamically resize render size
handleWindowResize(event){
    console.log(this);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize( window.innerWidth, window.innerHeight );

}
``` 

## Usage

render earth component at root document
```
let planetTexture = require("./img/earth2.jpg");
ReactDOM.render(<Earth planetTexture={planetTexture}/>, document.getElementById('root'))
``'