import * as THREE from 'three';
import './style.css';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';
//boiler plate code
//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,2,0)
scene.add(camera)
//renderer
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'), antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//resize fundtion
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
//render function
function render(){
    renderer.render(scene, camera);
}
//animate function
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    render();
    highlight();
    reset();
    TWEEN.update();
}
//change scene color
scene.background = new THREE.Color(0x87CEEB);

//import glb
let model;
const loader = new GLTFLoader();
loader.load('room-gallery.glb', (glb)=>{
    model = glb.scene;
    scene.add(model);
    // glb.position.set(0,0,0);
    model.castShadow = true;
    model.receiveShadow = true;
    // console.log(model.children[2].name);
    console.log(model.children[6].name);
    const l1 = new THREE.PointLight(0xffffff, 0.5, 10);
    scene.add(l1);
    l1.position.set(model.children[0].position.x+1, model.children[0].position.y, model.children[0].position.z);
    // light.rotation.x = -Math.PI/2;
    l1.castShadow = true; 
    const l2 = new THREE.PointLight(0xffffff, 0.5, 10);
    scene.add(l2);
    l2.position.set(model.children[1].position.x-1, model.children[1].position.y, model.children[1].position.z);
    // light.rotation.x = -Math.PI/2;
    l2.castShadow = true; 
    const l3 = new THREE.PointLight(0xffffff, 0.5, 10);
    scene.add(l3);
    l3.position.set(model.children[5].position.x+1, model.children[5].position.y, model.children[5].position.z);
    // light.rotation.x = -Math.PI/2;
    l3.castShadow = true; 
    const l6 = new THREE.PointLight(0xffffff, 0.5, 10);
    scene.add(l6);
    l6.position.set(model.children[6].position.x-1, model.children[6].position.y, model.children[6].position.z);
    // light.rotation.x = -Math.PI/2;
    l6.castShadow = true; 
    const l4 = new THREE.PointLight(0xffffff, 0.5, 10);
    scene.add(l4);
    l4.position.set(model.children[7].position.x+2, model.children[7].position.y, model.children[7].position.z);
    // light.rotation.x = -Math.PI/2;
    l4.castShadow = true; 
    const l5 = new THREE.PointLight(0xffffff, 0.5, 10);
    scene.add(l5);
    l5.position.set(model.children[8].position.x-2, model.children[8].position.y, model.children[8].position.z);
    // light.rotation.x = -Math.PI/2;
    l5.castShadow = true; 
})
//light
// const light = new THREE.PointLight(0xffffff, 1, 100);
// scene.add(light);
// light.position.set(0,5,0);
// light.castShadow = true;
// light.rotation.x = -Math.PI/2;
//customize controls
const updateCameraOrbit= () => {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    controls.target.copy(camera.position).add(forward);
}
controls.addEventListener('end', () => {
    updateCameraOrbit();
})
updateCameraOrbit();
//highlight function
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function OMM(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', OMM,false);
function highlight(){
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(model.children);
    if(intersects.length > 0){
        for(let i=0; i<intersects.length; i++){
            const results= intersects[i].object.name.localeCompare('Object_3');
            const result= intersects[i].object.name.localeCompare('Object_3_1');
            if(results === 0 || result === 0){
                continue;
            }
            else{intersects[i].object.material.transparent = true;
                intersects[i].object.material.opacity = 0.5;
                // console.log(intersects[i].object.name);
            }
            
    }
}
}
function reset(){
    for(let i=0; i<model.children.length; i++){
       if(model.children[i].material){
            //   model.children[i].material.transparent = false;
              model.children[i].material.opacity = 1;
       }
    }
}
//click function
function click(){
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(model.children);
    if(intersects.length > 0){
        let result = intersects[0].object.name.localeCompare('Object_10');
        if(result>0 || result<0){
            let rO = intersects[0].object.name.localeCompare('painting9');
            let rT = intersects[0].object.name.localeCompare('painting3');
            let rTH = intersects[0].object.name.localeCompare('painting5');
            let rF = intersects[0].object.name.localeCompare('painting1');
            let rFI = intersects[0].object.name.localeCompare('painting7');
            let rS = intersects[0].object.name.localeCompare('painting10');
            let rSE = intersects[0].object.name.localeCompare('painting4');
            let rE = intersects[0].object.name.localeCompare('painting6');
            let rN = intersects[0].object.name.localeCompare('painting2');
            let rTE = intersects[0].object.name.localeCompare('painting8');
            
            var aabb= new THREE.Box3().setFromObject(intersects[0].object);
            var center = aabb.getCenter(new THREE.Vector3());
            var size = aabb.getSize(new THREE.Vector3());
            var geo= new THREE.BoxGeometry(0.5,0.5,0.5);
            var mat= new THREE.MeshBasicMaterial({color:0xffffff});
            var cube= new THREE.Mesh(geo,mat);
            cube.scale.set(0.1,0.1,0.1)
            // scene.add(cube);
            var dist=2
            var cwd= new THREE.Vector3();
            console.log(intersects[0].object.name);
            camera.getWorldDirection(cwd);
            cwd.multiplyScalar(dist);
            cwd.add(camera.position);
            cube.position.set(cwd.x,cwd.y,cwd.z);
            if(rO==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x+2,
                y: center.y,
                z: center.z,
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x+0.1,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rT==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x+2,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x+0.1,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rTH==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x+0.5,
                y: center.y,
                z: center.z-2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x,
                y: center.y,
                z: center.z-0.2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rF==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x,
                y: center.y,
                z: center.z-2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x,
                y: center.y,
                z: center.z-0.2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rFI==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x+2,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x+1,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rS==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x-2,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x-0.1,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rSE==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x-2,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x-0.1,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rE==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x-0.5,
                y: center.y,
                z: center.z+2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x,
                y: center.y,
                z: center.z+0.2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rN==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x,
                y: center.y,
                z: center.z+2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x,
                y: center.y,
                z: center.z+0.2
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            if(rTE==0){
                var tween = new TWEEN.Tween(camera.position)
            .to({
                x: center.x-2,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                camera.lookAt(cube.position);
                updateCameraOrbit();
            })
            .onComplete(()=>{
                camera.lookAt(center);
            }).start();
            var tween= new TWEEN.Tween(cube.position)
            .to({
                x: center.x-1,
                y: center.y,
                z: center.z
            })
            .easing(TWEEN.Easing.Cubic.InOut).onUpdate(()=>{
                // cube.lookAt(center)
            })
            .onComplete(()=>{
                camera.lookAt(center)
            }).start();
            }
            
    }
}
}
window.addEventListener('click', click);
animate();
