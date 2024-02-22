import * as THREE from '../vendor/threejs/three.module.js';
import { OrbitControls } from '../vendor/threejs/OrbitControls.js';
import {STLLoader} from '../vendor/threejs/STLLoader.js';

export default class Model3d{
    constructor(camScreen, part){
        this.scene = new THREE.Scene();
        this.stlLoader = new STLLoader();
        this.cam = camScreen;
        this.part = part;
    }

    init(){
        const content = document.getElementById( 'content' );
        const element = document.createElement( 'div' );
        element.className = 'list-item';
        const sceneElement = document.createElement( 'div' );
        element.appendChild( sceneElement );
        const descriptionElement = document.createElement( 'div' );
        descriptionElement.innerText = this.cam.name;
        element.appendChild( descriptionElement );
        this.scene.userData.element = sceneElement;
        content.appendChild( element );

    };
    setCam(){
        let camera = (this.cam.type === true)? new THREE.OrthographicCamera( -5, 5, 5,-5, 5, 100 ):new THREE.PerspectiveCamera( 50, 1, 1, 100 );
        camera.position.set(this.cam.position.x,this.cam.position.y,this.cam.position.z);
        this.scene.userData.camera = camera;
    };
    orbitControl(){
        const controls = new OrbitControls( this.scene.userData.camera, this.scene.userData.element );
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.enablePan = false;
        controls.enableZoom = false;
        this.scene.userData.controls = controls;
    };
    loadModels(){
        this.stlLoader.load(this.part.path, (root)=>{
            // root.center();
            let mater = new THREE.MeshPhongMaterial(this.part.colors)
            let mesh = new THREE.Mesh(root, mater);
            mesh.name = this.part.name;
            mesh.scale.set(this.part.scaleRatio, this.part.scaleRatio, this.part.scaleRatio);
            mesh.position.set(this.part.position.x, this.part.position.y, this.part.position.z);
            this.scene.add(mesh);
        });
        this.scene.add( new THREE.HemisphereLight( 0xffffbb, 0x080820,0.5) );
        const light = new THREE.DirectionalLight( '#4CAF50', 2);
        light.position.set( this.cam.position.x, this.cam.position.y, this.cam.position.z);
        this.scene.add(light);
    };
  
}