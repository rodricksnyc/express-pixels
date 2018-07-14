document.addEventListener("DOMContentLoaded", function() {
  console.log('document ready!');
//set the canvas context so that you can draw on it. same as cxt on other things.
context = document.querySelector('#drawingCanvas').getContext("2d");

//define the canvas
let canvas = document.querySelector('#drawingCanvas');

//global mousdown variable for when the mouse is pressed
let mouseDown = false;

canvas.addEventListener('mousedown', function(event) {
  mouseDown = true;
  console.log(mouseDown);
})
canvas.addEventListener('mouseup', function(event) {
  mouseDown = false;
  console.log(mouseDown);
})
//mouse move function that draws a square.d

  canvas.addEventListener('mousemove', function(event){
     //get the position of the canvas
      function getPosition(element) {
        let xPos = element.offsetLeft;
        let yPos = element.offsetTop;
        return { xPos, yPos }
        console.log( xPos, yPos )
      }
   
    getPosition(canvas);
    //draw only if the mouse is down
    if (mouseDown === true) {
      //get the mouse position
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      //show mouse position
      //console.log(mouseX, mouseY);
      context.fillStyle = color;
      context.fillRect((mouseX - (brushSize/2)), (mouseY - (brushSize/2)), brushSize, brushSize);
    }
   

  });

//global color variable
let color = document.querySelector("input[name='color']").value;

//colorPicker to set the value of fillstyle.
let colorPicker = document.querySelector("form[name='colorPicker']");
  colorPicker.addEventListener('change', function(event){
  event.preventDefault();
  let colorField = document.querySelector("input[name='color']")
  //console.log(color.value);
  color = colorField.value;
})

//global variable for the brush size
let brushSize = 5;
//smallBrushButton
let smallBrushElement  = document.querySelector('#smallBrush');
smallBrushElement.addEventListener('click', function(event) {
  event.preventDefault();
  brushSize = 5;
  console.log(brushSize);
})
//medium Brush button
let mediumBrushElement  = document.querySelector('#mediumBrush');
mediumBrushElement.addEventListener('click', function(event) {
  event.preventDefault();
  brushSize = 10;
  console.log(brushSize);
})
//large brush button
let largeBrushElement  = document.querySelector('#largeBrush');
largeBrushElement.addEventListener('click', function(event) {
  event.preventDefault();
  brushSize = 25;
  console.log(brushSize);
})



});