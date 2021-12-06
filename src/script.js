import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'//GUI를 통해 직관적으로 변경하여 기능을 테스트해 볼 수 있는 javascript 기반의 매우 직관적인 라이브러리

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')
// import textureImg from "/textures/NormalMap.png";
// const normalTexture = textureLoader.load(textureImg);

// Debug
const gui = new dat.GUI()

// Canvas //자바스크립트로 canvas 엘리먼트 가져오기
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects //기하학적인 요소.'몸체'
const geometry = new THREE.SphereBufferGeometry(.5, 20, 20)//괄호안에는 세그먼트 수(숫자 클수록 더 구 같음)

// Materials //Objects를 꾸미는 요소

const material = new THREE.MeshStandardMaterial()//three.js에서 dat.GUI를 잘 활용하면 아주 좋다
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
//three.js에는 다양한 텍스쳐 로더가 있다. 텍스쳐 입히려면 로더 불러와야함. 최상단 Loader 참고

material.color = new THREE.Color(0xfffff)

// Mesh //objects와 material을 묶음
const sphere = new THREE.Mesh(geometry,material)

scene.add(sphere) //마지막 결합

// Light 1

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4 //pointLight 뿐 아니라 다른 많은 light 종류가 있다
scene.add(pointLight)

// Light2

const pointLight2 = new THREE.PointLight(0xeeeeee, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4 
pointLight2.position.set(-1.73,1.6,-1.84) //x,y,z 한 번에 쓸 수 있음
pointLight2.intensity = 6

scene.add(pointLight2)

// const light1 = gui.addFolder('Light 1') //.addFolder() 메소드로 폴더를 만들수도있다.

// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// //y 포지션만 컨트롤 하고싶다, 근데 최소 3 최대 3값으로, 0.01씩 움직이는거 보여줘
// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
//dat.gui 사용하는 법

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)
//라이트 헬퍼 사용하는 법
// 첫번 째 파라미터는 지목이고 두번 째는 scale


// Light 3

const pointLight3 = new THREE.PointLight(0xaa14f0, 0.1)

pointLight3.position.set(2.17,-1.76,-1.97) 
pointLight3.intensity = 6

scene.add(pointLight3)

// const light2 = gui.addFolder('Light 2') //.addFolder() 메소드로 폴더를 만들수도있다.

// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000
}

// light2.addColor(light2Color, 'color').onChange(()=>{
//     pointLight3.color.set(light2Color.color)
// }) // dat.gui로 컬러 바꾸는 방법

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}) //boilerplate : 재사용가능 코드, 상용구

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true //아무것도 없는 공간을 투명하게//You can leave the clear color at the default value.
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

//마우스 중심값 가져오기
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll',updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    // 구가 계속 Y 축 중심으로 회전

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()