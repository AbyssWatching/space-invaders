const canvas = document.querySelector("canvas");

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const xcoord = canvas.width/2;
const ycoord = innerHeight - 30;

class Player{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        //tells context we about to DRAW
        ctx.beginPath();
        //to draw a circle
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        //to allow the color to show up
        ctx.fillStyle =this.color;
        //actually draws the thng
        ctx.fill();
    }
}

class Projectile {
    constructor(x,y,radius,color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
    }

    draw(){
        //tells context we about to DRAW
        ctx.beginPath();
        //to draw a circle
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2, false)
        //to allow the color to show up
        ctx.fillStyle =this.color;
        //actually draws the thng
        ctx.fill();
    }

    update(){
        //so I don't have to call draw everytime we update!!
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const player = new Player(xcoord,
    ycoord,
    30,
    "blue");

player.draw();




const projectile = new Projectile(
    xcoord,
    ycoord,
    5,
    "red",
    {x:-1,
    y:1}
)

const projectiles = [];

//some stolen code real quick
//ths functino basically keeps calling it's self fro mwhat I understand...
function animate(){
    requestAnimationFrame(animate);

    //clears canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    //You need to redraw the player every clear!!!!
    player.draw();
    projectiles.forEach((projectile) => {
        projectile.update();
    } )

}

window.addEventListener("click", (event) => {
    //testing if event listner works
    //console.log("go");

    //calculates the distance from the click to the pressed spot
    const angle = Math.atan2(
        event.clientY - ycoord, 
        event.clientX - xcoord)
    
    console.log(angle);

    const velocity = {
        x:Math.cos(angle) , 
        y:Math.sin(angle)
    }

    projectiles.push(new Projectile(
        xcoord,
        ycoord,
        5
        ,"red"
        ,velocity
    ))
})

animate();
