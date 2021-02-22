var dog,sadDog,happyDog;
var foodObj;
var foodS, foodStock;
var feed, addFood;    

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  foodObj = new food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);

  foodObj.display();

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
 }

  function feedDog() {
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
    
    })
  }

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}