import * as THREE from '../vendor/threejs/three.module.js';
import Model3d from "./model3D.js";

const clickbtn = ['#btn-open-vd1','#btn-open-vd2','#btn-open-vd3', '#btn-open-vd4', '#btn-open-vd4s','#btn-open-vd5', '#btn-open-vd5s','#btn-open-hc6', '#btn-open-hc6s', '#btn-open-hc7'];
// Threejs
const models = [
    {
        name: 'VD1',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/bt1_3d.stl',
        angle: {x:0, y:0, z:0},
        position: {x: 0,y:-3,z:0,},
        colors: { color: '#4CAF50', specular: 'black', shininess: 1 },
        axis_rotate: '0',
        scaleRatio:  0.2,
    },
    {
        name: 'VD2',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/bt2_3d.stl',
        angle: {x:0, y: 0, z:0},   
        // rotation angle y: -MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'blue', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio:  0.3,
    },
    {
        name: 'VD3',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/bt5.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'red', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.2,
    },
    {
        name: 'VD4',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/sliding01.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.2,
    },
    {
        name: 'VD4s',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/sliding01s.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.2,
    },
    {
        name: 'VD5',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/vd5.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'VD5s',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/vd5s.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'hc6',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/hc06.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'hc6s',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/hc06s.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'hc7',
        coordinate: new THREE.Object3D(),
        path: './static/js/model/hc07.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    }
];

const camScreen = [
    {
        id: 0,
        "name": "DUNG",
        "type": true, // Orthographic Cam == true
        "position": {x: 0,y:0,z:10},
        "isOrbit": false,
    },
    {
        id: 1,
        "name": "CANH",
        "type": true, // Orthographic Cam == true
        "position": {x: -10,y:0,z:0},
        "isOrbit": true,
    },
    {
        id: 2,
        "name": "BANG",
        "type": true, // Orthographic Cam == true
        "position": {x: 0,y:10,z:0},
        "isOrbit": true,
    },
    {
        id: 3,
        "name": "3D",
        "type": false, // PerspectiveCamera Cam == false
        "position": {x: 10,y:10,z:10},
        "isOrbit": true,
    },
];

var load_screens = (scenes, model, comScreen)=>{
    comScreen.forEach((screen)=>{
        var models3D = new Model3d(screen, model);
        models3D.init();
        models3D.setCam();
        if(screen.isOrbit === true){
            models3D.orbitControl();
        };
        models3D.loadModels();
        scenes.push(models3D.scene);
    });
};



$(document).ready(()=>{
    var canvas = document.getElementById('in3d');
    const scenes = [];
    load_screens(scenes, models[0],camScreen);
    
    clickbtn.forEach((clickbtn, index)=>{
        $(clickbtn).click(()=>{
            scenes = [];
            load_screens(scenes, models[index],camScreen);
        });
    });
    var renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );
    animate();
    function updateSize() {

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
    
        if ( canvas.width !== width || canvas.height !== height ) {
    
            renderer.setSize( width, height, false );
    
        }
    
    }
    function animate() {
    
        render();
        requestAnimationFrame( animate );
    
    };
    function render() {

        updateSize();
        
        canvas.style.transform = `translateY(${window.scrollY}px)`;

        renderer.setClearColor( 0xffffff );
        renderer.setScissorTest( false );
        renderer.clear();

        renderer.setClearColor( 0xe0e0e0 );
        renderer.setScissorTest( true );

        scenes.forEach( function ( scene ) {
            
            // so something moves
            // scene.children[ 0 ].rotation.y = Date.now() * 0.001;

            // get the element that is a place holder for where we want to
            // draw the scene
            const element = scene.userData.element;

            // get its position relative to the page's viewport
            const rect = element.getBoundingClientRect();

            // check if it's offscreen. If so skip it
            if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                    rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {

                return; // it's off screen

            }

            // set the viewport
            const width = rect.right - rect.left;
            const height = rect.bottom - rect.top;
            const left = rect.left;
            const bottom = renderer.domElement.clientHeight - rect.bottom;

            renderer.setViewport( left, bottom, width, height );
            renderer.setScissor( left, bottom, width, height );

            //camera.aspect = width / height; // not changing in this example
            //camera.updateProjectionMatrix();

            //scene.userData.controls.update();

            renderer.render( scene, scene.userData.camera );

        } );

    }

});