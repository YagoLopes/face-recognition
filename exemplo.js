let x = 100;
let y = 100;

function setup() {
  createCanvas(700, 500);
  let div = createDiv("div");
  div.style("display", "none");
  div.show();
}

function draw() {
  // background(0); // mesma coisa que  #0000
  // ellipse(x, y, 80, 80); // (x, y, width, height)

  loadImage("very.png", (img) => {
    image(img, 50, 50);
  });
}
