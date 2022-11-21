var size = 50;
let visible_canvas = document.getElementById("cacanvas");
visible_canvas.width=600
visible_canvas.height=600
console.log(visible_canvas.width);
var caCanvas = new CACanvas(size);
var places
var population = []
visible_canvas.addEventListener("click", canvasClick);
// visible_canvas.addEventListener("click",function(e){
//             console.log(caCanvas.getCell(e.clientX,e.clientY,"cacanvas"));
//         })
       

class LandType extends Patch {
    constructor(color) {
        super();
        this.color = color;
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
    xy= caCanvas.getCell(event.clientX,event.clientY,"cacanvas");
    land = places.getPatch(xy[0],xy[1])
    land.color = "green"
    draw()
}

var setup = function () {

    places = new Patches(size);
    for(let x= 0 ; x<size; x++){
        for(let y = 0; y<size; y++){
            const land = new LandType()
            land.color= rndGray()
            places.addPatch(land)
            if(rndInt(100)<50){
                agent = new Person(0, "red");
                population.push(agent)
                land.addAgent(agent)
            }
        }
    }
    
}

var draw = function () {
    places.list.forEach(function (land, index) {
        caCanvas.draw(land.xPos, land.yPos, land.color);
    });
    for (let i = 0; i < population.length; i++) {
        const person = population[i];
        caCanvas.drawCircle(person.xPos(), person.yPos(), person.color, "black", 4, 1);
    }
    caCanvas.update("cacanvas");
}


setup()
draw()