let video;
let main;
let vhs;
let noiseGraphics;
function preload() {
  vhs = loadShader("assets/shaders/vhs.vert", "assets/shaders/vhs.frag");
}

function setup() {
  video = createVideo("assets/videos/bear.mp4");
  video.hide();
  noiseGraphics = createGraphics(windowWidth, windowHeight);
	main = createGraphics(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight, WEBGL);
	
}

function draw() {
  main.image(video, 0, 0, width, height);
  noiseGraphics.background(0);
  noiseGraphics.noStroke();
  let n = 240;
  let noiseHeight = windowHeight/n;
  for (let i = 0; i < n; i++) {
    
    noiseGraphics.fill(random(80));
    noiseGraphics.rect(0, i*noiseHeight, windowWidth, noiseHeight);
  }
  vhs.setUniform('canvas', main);
  vhs.setUniform("noiseCanvas", noiseGraphics);
  vhs.setUniform("uResolution", [windowWidth, windowHeight]);
  vhs.setUniform("uMouse", [mouseX,mouseY]);
  vhs.setUniform("uTime", millis()/1000);
  shader(vhs);
  rotateY(PI/2);
  rect(0, 0, width, height);
	// image(main, 0, 0, width, height);
}

function mousePressed(){
  video.loop();
}