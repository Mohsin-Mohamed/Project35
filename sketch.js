//Create variables here
var dog, database
var foodS, foodStock

function preload()
{
  dogImg=loadImage("sprites/Dog.png")
  happyDogImg=loadImage("sprites/happydog.png")
}

function setup() {
  createCanvas(800, 400);
  database=firebase.database()
  dog=createSprite(400,200,10,10)
  dog.addImage(dogImg)
  dog.scale=0.2
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

}


function draw() {  
  background("#2E8A57")
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock)
    dog.addImage(happyDogImg)
  }
  textSize(20)
  fill("white")
  text("Note : Press Up to feed Doggo",270,100)
  text("Food Remaining : "+foodStock,330,80)
  drawSprites();
  //add styles here

}
function readStock(data){
  foodStock=data.val()
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  
  database.ref('/').update({
    Food:x
  })
}
