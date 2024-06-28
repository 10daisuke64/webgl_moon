import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var manager;
var loader;
var scene;
var camera;
var renderer;
const width = 640;
const height = 640;
var controls;
var moon;
var sprite;

/* ---------------------------
  loading manager
----------------------------- */
manager = new THREE.LoadingManager();



/* ---------------------------
  general
----------------------------- */
scene = new THREE.Scene();
loader = new THREE.TextureLoader();

/* ---------------------------
  moon
----------------------------- */
loader.load('./img/moon/color.png', function (texture) {
  createMoon(texture);
  render();
});
function createMoon(texture) {
  moon = new THREE.Mesh(
    new THREE.SphereGeometry(100, 64, 32),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughnessMap: loader.load('./img/moon/roughness.png'),
      normalMap: loader.load('./img/moon/normal.png'),
    })
  );
  moon.position.set(0, 0, 0);
  scene.add(moon);
};

/* ---------------------------
  sprite
----------------------------- */
loader.load('./img/moon/sprite.png', function (texture) {
  createSprite(texture);
  render();
});
function createSprite(texture) {
  sprite = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
  });
  sprite = new THREE.Sprite(sprite);
  sprite.scale.set(232, 232, 1);
  scene.add(sprite);
};

/* ---------------------------
  light
----------------------------- */
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(100, 200, 80);
scene.add(directionalLight);

const ambientLigh = new THREE.AmbientLight(0xffffff, 1.8);
scene.add(ambientLigh);

/* ---------------------------
  renderer
----------------------------- */
renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('js-stage').appendChild(renderer.domElement);
camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
camera.position.set(300, 0, 0);
camera.lookAt(scene.position);
controls.update();

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}
