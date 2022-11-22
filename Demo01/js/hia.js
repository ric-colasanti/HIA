var size = 50;
var households = 40
var maxDistance = Math.sqrt(size*size+size*size)
let visible_canvas = document.getElementById("cacanvas");
visible_canvas.width=600
visible_canvas.height=600
console.log(visible_canvas.width);
var caCanvas = new CACanvas(size);
var places
var population = []
visible_canvas.addEventListener("click", canvasClick);

       
var setVals = function () {
    console.log("here");
    households = Number(document.getElementById("numberOfHomes").value);
    document.getElementById("numberOfHomes").innerHTML = households
}   

class LandType extends Patch {
    constructor(id) {
        super();
        this.id = id
        this.type = "land"
    }
}

class Person extends Agent {
    constructor(health, color) {
        super();
        this.color = color;
        this.health = health
        this.id="person"
    }
}
class Shop extends Agent {
    constructor(sClass, price, id) {
        super();
        this.customers = 0
        this.sClass = sClass;
        this.price = price;
        this.id = "shop"
        this.color = "blue"
    }

}
 

function canvasClick(event){
    [x,y]= caCanvas.getCell(event.clientX,event.clientY,"cacanvas");
    land = places.getPatch(x,y)
    if(land.type == "green"){
        land.type="land"
        land.color=rndGray()
    }else{
        land.type="green"
        land.color="green"
    
        for(let i=0; i<population.length;i++){
            person = population[i]
            let d =1-(land.getDistance(person.home)/maxDistance)
            if(d>person.health){
                person.health = d
                let col = "rgb(50,"+Math.floor(255*d)+",50)"
                person.color = col
            }
        }
    }
    
    draw()
}

var setup = function () {
    places
    population = []
    places = new Patches(size);
    let id = 0
    for(let x= 0 ; x<size; x++){
        for(let y = 0; y<size; y++){
            const land = new LandType(id)
            land.color= rndGray()
            id+=1
            places.addPatch(land)
            if(rndInt(100)<households){
                agent = new Person(0, "red");
                population.push(agent)
                land.addAgent(agent)
            }
        }
    }
    places.setNeighbors()
    draw()
    
}



var draw = function () {
    places.list.forEach(function (land, index) {
        caCanvas.draw(land.xPos, land.yPos, land.color);
    });
    for (let i = 0; i < population.length; i++) {
        const person = population[i];
        console.log(person.color);
        caCanvas.drawCircle(person.xPos(), person.yPos(), person.color, "black", 4, 1);
    }
    caCanvas.update("cacanvas");
}




