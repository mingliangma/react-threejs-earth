import React, { Component } from 'react';
import * as THREE from 'three';

class Earth extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)

    this.mouseX = 0;
    this.mouseY = 0;
  }

  componentDidMount() {

    //Scene
    const scene = new THREE.Scene()

    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    camera.position.y = 2;
    camera.lookAt( scene.position );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#ffffff');
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Earth
    let planetTexture = this.props.planetTexture;
    const geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const texture = new THREE.TextureLoader().load(planetTexture);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: texture,
      shininess: 0
    });
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)


    //Light
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const directionLightWhite	= new THREE.DirectionalLight( 0xffffff, 1 );
    directionLightWhite.position.set(0,0,5);
    scene.add( directionLightWhite );

    const directionLight1 = new THREE.DirectionalLight( 0xff24b7, 3.5 );
    directionLight1.position.set( 10, -1, -7);
    scene.add( directionLight1 );

    const directionLight2 = new THREE.DirectionalLight( 0xff24b7, 3.5 );
    directionLight2.position.set( 5, -10, -7);
    scene.add( directionLight2 );

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.mesh = mesh;

    //Resize canvas when window size changes
    window.addEventListener( 'resize', this.handleWindowResize.bind(this));

    this.mount.appendChild(this.renderer.domElement);
    this.start()
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.mesh.rotation.y = (this.mouseX-1000) * 0.001;
    this.mesh.rotation.x = (this.mouseY) * 0.0005;

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  handleMouse(event){
    this.mouseX = ( event.clientX - window.innerWidth/2 );
    this.mouseY = ( event.clientY - window.innerHeight/2 );
  }

  handleWindowResize(event){
    console.log(this);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );

  }

  render() {
    return (
      <div
        ref={(mount) => { this.mount = mount }}
        onMouseMove={(event => this.handleMouse(event))}
      />
    )
  }
}

export default Earth;