import React, { Component } from 'react';
import * as THREE from 'three';

class Earth extends Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

    this.mouseX = 0;
    this.mouseY = 0;
  }

  componentDidMount() {


    //Scene
    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    camera.position.y = 3;
    camera.lookAt( scene.position );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(2);

    //Earth
    let planetTexture = this.props.planetTexture;
    const geometry = new THREE.SphereGeometry( 5, 62, 62 );
    const texture = new THREE.TextureLoader().load(planetTexture);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: texture,
      shininess: 10
    });
    const mesh = new THREE.Mesh(geometry, material);
    //set earth to face Atlantic Ocean
    mesh.rotation.y = -1.199;
    scene.add(mesh);


    //Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 3.5);
    scene.add(ambientLight);

    //white light with reflective effect
    let pointLightWhite	= new THREE.PointLight( 0xffffff, 0.9, 100 );
    pointLightWhite.position.set(-8,15,25);
    scene.add( pointLightWhite );

    // 3 point-light sources from the right side.
    let pointLightPinkMid	= new THREE.PointLight( 0xAB1C7D, 8, 160 );
    pointLightPinkMid.position.set(100, -60, -50);
    scene.add( pointLightPinkMid );

    let pointLightPinkBottom	= new THREE.PointLight( 0xAB1C7D, 9, 200 );
    pointLightPinkBottom.position.set(100, -140, -50);
    scene.add( pointLightPinkBottom );

    let pointLightPinkTop	= new THREE.PointLight( 0xAB1C7D, 9, 200 );
    pointLightPinkTop.position.set(170, 20, -50);
    scene.add( pointLightPinkTop );

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

    //rotation effect
    this.mesh.rotation.y += 0.05 * ((this.mouseX-1200) * 0.001 - this.mesh.rotation.y);
    this.mesh.rotation.x += 0.05 * ((this.mouseY) * 0.001 - this.mesh.rotation.x);

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

  handleWindowResize(){
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