// Neural network glowing connections canvas animation
const canvas = document.createElement("canvas");
canvas.id = "neuralCanvas";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let width, height;
let nodes = [];
const NODE_COUNT = 40;
const MAX_DISTANCE = 150;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resize);
resize();

class Node {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = 3;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius*4);
    gradient.addColorStop(0, "rgba(0, 255, 247, 0.8)");
    gradient.addColorStop(1, "rgba(0, 255, 247, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

for(let i=0; i<NODE_COUNT; i++) {
  nodes.push(new Node());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw connections
  for(let i=0; i < NODE_COUNT; i++) {
    let nodeA = nodes[i];
    for(let j = i + 1; j < NODE_COUNT; j++) {
      let nodeB = nodes[j];
      let dx = nodeA.x - nodeB.x;
      let dy = nodeA.y - nodeB.y;
      let dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < MAX_DISTANCE) {
        const alpha = 1 - dist / MAX_DISTANCE;
        ctx.strokeStyle = `rgba(0, 255, 247, ${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      }
    }
  }

  // Move & draw nodes
  nodes.forEach(node => {
    node.move();
    node.draw();
  });

  requestAnimationFrame(animate);
}
animate();

new TypeIt("#typed-text", {
  strings: ["Machine Learning Engineer", "AI/ML Developer", "Data Scientist"],
  speed: 75,
  breakLines: false,
  loop: true
}).go();

const projects = document.querySelectorAll(".project-card");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");

projects.forEach((project, i) => {
  project.addEventListener("click", () => {
    const titles = [
      "Crop Disease Classifier",
      "Song Genre Classifier",
      "Skincare Chatbot"
    ];
    const descriptions = [
      "Built with ResNet & Xception, detects plant diseases from leaf images.",
      "Predicts music genre from audio features using ML models.",
      "Chatbot for skincare advice powered by GPT-3.5 API and Streamlit."
    ];
    const links = [
      "https://github.com/yourname/crop-disease-classifier",
      "https://github.com/yourname/song-genre-classifier",
      "https://github.com/yourname/skincare-chatbot"
    ];
    document.getElementById("modal-title").textContent = titles[i];
    document.getElementById("modal-description").textContent = descriptions[i];
    document.getElementById("modal-link").href = links[i];
    modal.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});








