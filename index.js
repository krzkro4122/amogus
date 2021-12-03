// --- IMPORTS --- //

import * as THREE from 'node_modules/three/build/three.module.js';

// --- MAIN INITIALIZATIONS --- //

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


// --- CONFIGURATION --- //

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );


// --- 3D ELEMENTS --- //

// Torus shape
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color:  0xBB0000 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

// Lighting
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// Controls
// const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Amogus
const amogusTexture = new THREE.TextureLoader().load('amogus.jpg');
const amogus = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( {
    map: amogusTexture,
  } )
);

scene.add(amogus);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalMapMoon = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalMapMoon,
  } )
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

amogus.position.z = -5;
amogus.position.x = 2;


// --- CAMERA MOVEMENT --- //

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  amogus.rotation.y += 0.03;
  amogus.rotation.z += 0.03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// --- INFINITE LOOP --- //

function animate() {
  // recursivness
  requestAnimationFrame( animate );

  // rotations
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // handle mouse
  // controls.update()

  // render the scene from a camera's perspective
  renderer.render( scene, camera );
}

animate();