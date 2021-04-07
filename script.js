const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

// sets canvas to be full browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// contains all particle objects, all information about particles (size, color, coordinates),
// pull information from this array to draw particles on canvas 
let particleArray = [];

// handles mouse interactions
let mouse = {
    x: null,     // current position of mouse on x-axis
    y: null,     // current position of mouse on y-axis
    radius: 150, // radius of circle around mouse in which particles react to mouse
}

// event listener takes attributes: 
// 1. type of event to listen for,
// 2. callback function to run every time that event occurs
//      Here we listen to the mousemove event then assign x and y coordinates
//      dynamically every time the mouse moves in mouse object
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x, mouse.y);  //just to prove mouse location is being tracked
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('T', 0, 30);

const data = ctx.getImageData(0,0, 100, 100);

class Particle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 1;  // size of the particle 'dots'
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;  // each particle will move at slightly different speeds
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
            this.size = 20;
        } else {
            this.size = 1;
        }
    }
}

function init() {
    particleArray = [];

    for (let i=0; i < 550; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
    // particleArray.push(new Particle(50, 50));
    // particleArray.push(new Particle(80, 50));

}

init();
console.log(particleArray);

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);  // recursive, animate loops 
}

animate();