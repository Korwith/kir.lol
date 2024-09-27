import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { MTLLoader } from 'MTLLoader';
import { GLTFLoader } from 'GLTFLoader';
import { FBXLoader } from 'FBXLoader';

const content = document.querySelector('.content');
let loop_running = false;

let current = {};
function handleGLB(url, scene, camera, render) {
    const glb_loader = new GLTFLoader();
    glb_loader.load(url, function(gltf) {
        gltf.scene.traverse(function(child) {
            if (child.isMesh) {
                child.material.depthWrite = true;
            }
        })

        defaultView(gltf.scene, camera);
        scene.add(gltf.scene);
        render.render(scene, camera);
    });
}

function generate(files) {
    let rect = content.getBoundingClientRect();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
    let render = new THREE.WebGLRenderer();
    let controls = new OrbitControls(camera, render.domElement);
    current.rect = rect;
    current.scene = scene;
    current.camera = camera;
    current.render = render;
    current.controls = controls;
    current.files = files;

    let scaleFactor = 1;
    render.setSize(rect.width, rect.height);
    render.setPixelRatio(window.devicePixelRatio * scaleFactor);
    render.setClearColor(0x000000, 0);
    content.appendChild(render.domElement);

    if (!loop_running) {
        renderLoop();
        loop_running = true;
    }
    addLighting(scene);
    handleGLB(files.glb, scene, camera, render);
}

function renderLoop() {
    current.controls.update();
    current.render.render(current.scene, current.camera);
    requestAnimationFrame(renderLoop);
}

function addLighting(scene) {
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(light);
    scene.add(directionalLight);
}

function defaultView(object, camera) {
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 0, 0);

    let bounding = new THREE.Box3().setFromObject(object);
    let center = bounding.getCenter(new THREE.Vector3());
    let size = bounding.getSize(new THREE.Vector3());

    let maxDim = Math.max(size.x, size.y, size.z);
    let fov = camera.fov * (Math.PI / 180);
    let cameraDistance = 1.25 * (Math.abs(maxDim / (2 * Math.tan(fov / 2))));

    if (window.innerWidth < 767) {
        cameraDistance *= 1.4;
    }

    camera.position.copy(center);
    camera.position.z += cameraDistance;
    camera.lookAt(center);
}

function loadURL(url) {
    let accepted = ['glb'];
    let format = url.split('.').pop();
    if (!accepted.includes(format)) { return };
    let dict = {};
    dict[format] = url;
    generate(dict);
}

function checkState() {
    let valid = {
        'url': loadURL,
    }
    
    let href = window.location.href;
    if (!href.includes('?=')) { return };
    let args = href.split('?=');

    for (var i = 0; i < args.length; i++) {
        let this_arg = args[i];
        let data = this_arg.split('-');
        let key = data[0];
        let value = data[1];

        if (!valid[key]) { continue };
        valid[key](value);
    }
}

function handleRenderSize() {
    if (!current.render) { return };
    let rect = content.getBoundingClientRect();
    current.render.setSize(rect.width, rect.height);
    current.render.setPixelRatio(rect.width / rect.height);
    current.camera.aspect = rect.width / rect.height;
    current.camera.updateProjectionMatrix();
}

checkState();
window.onresize = handleRenderSize;