gsap.registerPlugin(ScrollTrigger);

// Setup Three.js Scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

let renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  alpha: true
});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Rocket placeholder (a cone)
let rocket = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 2, 32),
  new THREE.MeshStandardMaterial({color: 0xff0000})
);
scene.add(rocket);

// Moon
let moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({color: 0xaaaaaa})
);
moon.position.set(5, 0, -10);
scene.add(moon);

// Mars
let mars = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({color: 0xff4500})
);
mars.position.set(-6, 2, -20);
scene.add(mars);

// Stars
let stars = new THREE.Points(
  new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      Array.from({length: 3000}, () => (Math.random() - 0.5) * 100),
      3
    )
  ),
  new THREE.PointsMaterial({color: 0xffffff, size: 0.2})
);
scene.add(stars);

// Scroll Animations
gsap.to(rocket.position, {
  y: 15, z: -30,
  scrollTrigger: {
    trigger: ".info",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(moon.position, {
  z: -2,
  scrollTrigger: {
    trigger: ".info:nth-of-type(2)",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});

gsap.to(mars.position, {
  z: -5,
  scrollTrigger: {
    trigger: ".info:nth-of-type(3)",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});

// Hide loading screen
gsap.to(".loading", {autoAlpha: 0, delay: 1});

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  rocket.rotation.y += 0.02;
  moon.rotation.y += 0.005;
  mars.rotation.y += 0.01;
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
