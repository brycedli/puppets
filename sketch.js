let video;
let main;
let vhs;
let noiseGraphics;
let glslCanvas;
let scrollPos = 0;
let spaceMono;
let caslonRounded;
let hasClicked = false;
let gradient;
let story;
let paragraphs = [];
let charWidth;
const TEXT_SIZE = 38;
function preload() {
  caslonRounded = loadFont("assets/fonts/caslon-rounded-regular.otf");
  spaceMono = loadFont("assets/fonts/space-mono-regular.ttf");
  vhs = loadShader("assets/shaders/vhs.vert", "assets/shaders/vhs.frag");
  gradient = loadImage("assets/images/gradient.png");

}

function onLoadStrings(data) {
  story = data;
  story.forEach(function (paragraph) {
    if (paragraph == "") {
      return;
    }
    paragraphs.push(new Paragraph(paragraph, width * 2/3, charWidth));
  })
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(TEXT_SIZE);
  textFont(spaceMono);
  textAlign(LEFT);
  charWidth = textWidth("0");
  loadStrings('content.txt', onLoadStrings);
  video = createVideo("assets/videos/bear.mp4");
  video.hide();
  noiseGraphics = createGraphics(windowWidth, windowHeight);
  main = createGraphics(windowWidth, windowHeight);
  glslCanvas = createGraphics(windowWidth, windowHeight, WEBGL);

}

function draw() {
  //main canvas
  main.background(255);

  main.imageMode(CENTER);

  let unit = width / 12;


  main.fill(255);
  main.textAlign(CENTER);
  main.textFont(caslonRounded);
  let vidWidth = 12 * unit;
  let vidHeight = vidWidth * video.height / video.width;
  if (hasClicked) {

    main.image(video, width / 2, scrollPos + vidHeight / 2, vidWidth, vidHeight);
    main.textSize(128);
    main.text("Building character", width / 2, height / 2 + scrollPos);
    main.textSize(40);
    main.textFont(spaceMono);
    main.text("In conversation with Michael Sadecky", width / 2, height / 2 + scrollPos + unit / 2);
  }
  else {
    main.fill(0);
    main.textSize(70);
    main.text("Click anywhere to play video", width / 2, height / 2 + scrollPos);
  }
  let offset = vidHeight + unit;
  paragraphs.forEach(function (paragraph) {
    paragraph.draw(main, unit * 2, scrollPos + offset);
    offset += paragraph.height;
  })


  // post processing
  noiseGraphics.noStroke();
  let n = 240;
  let noiseHeight = windowHeight / n;
  for (let i = 0; i < n; i++) {

    noiseGraphics.fill(random(60));
    noiseGraphics.rect(0, i * noiseHeight, windowWidth, noiseHeight);
  }

  vhs.setUniform('canvas', main);
  vhs.setUniform("noiseCanvas", noiseGraphics);
  vhs.setUniform("uResolution", [windowWidth, windowHeight]);
  vhs.setUniform("uMouse", [mouseX, mouseY]);
  vhs.setUniform("uTime", millis() / 1000);
  glslCanvas.shader(vhs);
  glslCanvas.rect(0, 0, width, height);
  scale(1, -1);
  image(glslCanvas, 0, -height);
}

function mousePressed() {
  video.loop();
  hasClicked = true;
}

function mouseWheel() {
  if (scrollPos == 0) {
    scrollPos -= event.delta;
  }
  if (scrollPos < 0) {
    scrollPos -= event.delta;
  }
  else {
    scrollPos = lerp(scrollPos, 0, 1);
  }
  return false;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


