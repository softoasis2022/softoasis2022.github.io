import { GLTFLoader } from 'GLTFLoader';
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
});
renderer.setClearColor(0x000000, 0);

let camera = new THREE.PerspectiveCamera(30, 1);
camera.position.set(10, 80, 120);

scene.background = null; //new THREE.Color('white');

const ambientLight = new THREE.AmbientLight(0xffffff, 3.0); // 부드러운 조명
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 방향성 조명
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

let loader = new GLTFLoader();
loader.load('gltf/Chocolate_Splash_Free_005.gltf', function(gltf) {
    scene.add(gltf.scene);
    
    gltf.scene.traverse(function(child) {
        if (child.isMesh) {
            console.log(child.material);
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        renderer.render(scene, camera);
    }
    animate();
});

renderer.setSize(400, 400);
renderer.render(scene, camera);
