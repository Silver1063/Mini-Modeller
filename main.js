import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x333333);
document.body.appendChild(renderer.domElement);

const grid_geo = new THREE.PlaneGeometry(100, 100);
const grid_mat = new THREE.ShaderMaterial();
const grid_msh = new THREE.Mesh(grid_geo, grid_mat);
grid_msh.rotateX(-90 * (Math.PI / 180));


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 5);
controls.update();

const geometry = new THREE.TorusGeometry(1.0, 0.4, 12 * 2, 48, Math.PI * 2);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);

directionalLight.position.set(0, 1, 1);

scene.add(grid_msh);
scene.add(mesh);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};


