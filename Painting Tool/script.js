/* Using lines instead of ellipses to draw, so the resulting drawing doesn't 
break when the mouse moves too fast for the processor to catch up with. 
Also printing out the H, S, and B values whenever the user chooses a new color. */

let i, //ranges from 0 to 360, adjusts hue during palette creation
  j, //ranges from 0 to 100, adjusts brightness (dark colors) and then saturation (lighter colors) during palette creation
  brushColor,
  mostRecentBrushColor,
  globalSaturation,
  globalBrightness,
  paintbrush,
  slider,
  radius,
  checkbox,
  h,
  s,
  b,
  hr,
  sr,
  br,
  colorprint;

function setup() {
  // Canvas & color settings
  createCanvas(1000, 600);
  //background(94);
  colorMode(HSB, 360, 100, 100);
  textAlign(RIGHT);

  //slider adjusts brush thickness
  slider = createSlider(5, 50, 15);
  slider.position((width * 7) / 8 + 20, 45);
  slider.style("width", "100px");

  //checkbox
  checkbox = createCheckbox();
  checkbox.changed(changeToWhite);
  checkbox.position((width * 7) / 8 + 20, 75);

  //initializing h, s b. hr, sr, br = rounded h, s, b values to print to screen
  brushColor = color(0, 0, 0);
  h, s, (b = 0);
  hr, sr, (br = 0);
  
  noStroke();
  /* PALETTE CREATION */
  //right side of the palette: pastel colors
  for (i = 0; i < 360; i++) {
    for (j = 100; j > 0; j -= 4) {
      fill(i, j, 100);
      rect(200 - j, (i * height) / 360, 4, height / 360);
    }
  }

  //left side of the palette: darker colors
  for (i = 0; i < 360; i++) {
    for (j = 0; j < 100; j += 4) {
      fill(i, 100, j);
      rect(j, (i * height) / 360, 4, height / 360);
    }
  }
}

function draw() {
  //background(94);

  /* TEXT ON THE RIGHT SIDE OF CANVAS */
  noStroke();
  fill("black");
  textSize(16);
  text("Selected color:", (7 * width) / 8, 15);
  text("Thickness:", (7 * width) / 8, 50);
  text("Eraser:", (7 * width) / 8, 80);

  /* PALETTE CREATION */
  //right side of the palette: pastel colors
  /*
  for (i = 0; i < 360; i++) {
    for (j = 100; j > 0; j -= 4) {
      fill(i, j, 100);
      rect(200 - j, (i * height) / 360, 4, height / 360);
    }
  }

  //left side of the palette: darker colors
  for (i = 0; i < 360; i++) {
    for (j = 0; j < 100; j += 4) {
      fill(i, 100, j);
      rect(j, (i * height) / 360, 4, height / 360);
    }
  }*/

  /* INTERACTIVITY */
  if (mouseIsPressed) {
    if (mouseIsPressed && mouseX < 200) {
      noStroke();
      noFill();
      changeColor();

      //clears previous HSB values printed to canvas
      clearColor();

      //gets new HSB values printed to canvas
      printColor();
    }

    //fill(brushColor);
    stroke(brushColor);
    strokeWeight(slider.value());
    line(pmouseX, pmouseY, mouseX, mouseY);

    //ensures that you don't paint over the thickness slider or eraser checkbox
    if (
      mouseX > (width * 7) / 8 &&
      mouseY < 95 /*|| (pmouseX > (width * 7) / 8 && pmouseY < 80)*/
    ) {
      stroke(0, 0, 100);
      strokeWeight(slider.value());
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }

  //updates color of ellipse that shows selected color
  noStroke();
  fill(brushColor);
  ellipse((width * 7) / 8 + 20, 10, 20);
}

function changeColor() {
  //reassigning h, s, b
  h = (mouseY / height) * 360;
  if (mouseX < 100) {
    (s = 100), (b = mouseX);
  } else {
    (s = 200 - mouseX), (b = 100);
  }

  /*reassigning brushColor, hr, sr, br
  hr, sr, and br = h, s, b rounded to the nearest whole number, respectively */
  brushColor = color(h, s, b);
  hr = round(h);
  sr = round(s);
  br = round(b);

  //if mouse goes off canvas, make sure hr values don't change
  if (hr < 0) {
    hr = 0;
  }
  if (hr > 360) {
    hr = 360;
  }

  //updates string of text to be printed to the canvas
  colorprint = "HSB: " + hr + ", " + sr + ", " + br;

  //saves most recent brush color for after eraser checkbox is unchecked
  mostRecentBrushColor = brushColor;
}

//executed when eraser checkbox is checked
function changeToWhite() {
  if (this.checked()) {
    brushColor = color(0, 0, 100);
  } else {
    brushColor = mostRecentBrushColor;
  }
}

//prints HSB values to the canvas
function printColor() {
  fill("black");
  textSize(10);
  text(colorprint, (7 * width) / 8 + 120, 15);
}

/* Because the background only runs once, the old HSB values don't disappear 
when the new HSB values are printed out (after the user selects a new color). 
As a result of all the HSB values overlapping, the user eventually sees one gigantic blob of black. 
I work around this by drawing a white rectangle to "cover up" the old HSB values each time, 
but I'm wondering if there is a better solution. */
function clearColor() {
  fill("white");
  rect((7 * width) / 8 + 32, 0, 100, 20);
}

/* global createCanvas, background, colorMode, HSB, noStroke, backgroundColor, 
color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, rect, 
mouseIsPressed, image, loadImage, noFill, textSize, textAlign, CENTER, createSlider, 
RIGHT, createCheckbox, round, strokeWeight, pmouseX, pmouseY */

