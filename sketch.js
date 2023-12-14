let video;
let isVideoPlaying = false;
let main;
let vhs;
let noiseGraphics;
let glslCanvas;
let scrollPos = 0;
let spaceMono;
let caslonRounded;
let hasClicked = false;
let timeSinceClicked;
let gradient;
let story;
let paragraphs = [];
let charWidth;
let windowImage;
let drawImage = false;
let popup;
let popupVideo;
let popupAudio;
let spotlightPos;
let smallBounds = new Array(4);
let largeBounds = new Array(4);
let pause, play;

const TEXT_SIZE = 34;

function preload() {
  caslonRounded = loadFont("assets/fonts/caslon-rounded-regular.otf");
  spaceMono = loadFont("assets/fonts/space-mono-regular.ttf");
  vhs = loadShader("assets/shaders/vhs.vert", "assets/shaders/vhs.frag");
  gradient = loadImage("assets/images/gradient.png");
  windowImage = loadImage("assets/images/window.png");
  pause = loadImage("assets/images/pause.png");
  play = loadImage("assets/images/play.png");
}

function onLoadStrings(data) {
  story = data;
  story.forEach(function (paragraph) {
    if (paragraph == "") {
      return;
    }
    paragraphs.push(new Paragraph(paragraph, width / 2, charWidth));
  })
}

function onClickLink(code) {
  popup = new Popup(code, windowImage);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(TEXT_SIZE);
  textFont(spaceMono);
  textAlign(LEFT);
  charWidth = textWidth("0");
  loadStrings('content.txt', onLoadStrings);
  video = createVideo("assets/videos/bear.mp4");
  video.volume(0.2);
  video.hide();
  noiseGraphics = createGraphics(windowWidth, windowHeight);
  main = createGraphics(windowWidth, windowHeight);
  glslCanvas = createGraphics(windowWidth, windowHeight, WEBGL);
  pixelDensity(0.5);
  spotlightPos = createVector(width / 2, height / 2);
}

function draw() {
  //main canvas
  main.background(255);

  main.imageMode(CENTER);

  let unit = width / 12;
  let vidWidth = 12 * unit;
  let vidHeight = vidWidth * video.height / video.width;



  main.fill(255);
  main.textAlign(CENTER);
  main.textFont(caslonRounded);

  if (hasClicked) {

    if (scrollPos > -vidHeight) {
      largeBounds[0] = 0;
      largeBounds[1] = 0;
      largeBounds[2] = vidWidth;
      largeBounds[3] = vidHeight + scrollPos;
      
      main.image(video, width / 2, scrollPos + vidHeight / 2, vidWidth, vidHeight);

      if (isVideoPlaying) {
        main.image(pause, unit, height - unit/2 + scrollPos, unit, unit / 2);
      }
      else {
        main.image(play, unit, height - unit/2 + scrollPos, unit, unit / 2);
      }
    }
    else {
      let newVidWidth = unit * 3;
      let newVidHeight = newVidWidth * video.height / video.width;
      main.imageMode(CORNER);
      smallBounds[0] = width - unit / 4 - newVidWidth;
      smallBounds[1] = height - newVidHeight - unit / 4;
      smallBounds[2] = smallBounds[0] + newVidWidth;
      smallBounds[3] = smallBounds[1] + newVidHeight;
      main.image(video, smallBounds[0], smallBounds[1], newVidWidth, newVidHeight);
      main.imageMode(CENTER);
      if (isVideoPlaying) {
        main.image(pause, smallBounds[2] - unit * 3/4, smallBounds[3] - unit / 2, unit, unit / 2);
      }
      else {
        main.image(play, smallBounds[2] - unit * 3/4, smallBounds[3] - unit / 2, unit, unit / 2);
      }
    }

    main.fill("blue");
    let moveTime = 0.05 * (millis() - timeSinceClicked);
    main.rect(0 - moveTime * moveTime + scrollPos, 0, vidWidth / 2, vidHeight);
    main.rect(width / 2 + moveTime * moveTime - scrollPos, 0, vidWidth / 2, vidHeight);

    main.fill(255);
    main.imageMode(CENTER);
    main.textSize(128);
    main.text("Building character", vidWidth / 2, vidHeight / 2 + scrollPos);
    main.textSize(40);
    main.textFont(spaceMono);
    main.text("In conversation with Michael Sadecky", vidWidth / 2, vidHeight / 2 + scrollPos + unit / 2);



  }
  else {

    if (scrollPos > 0) {
      main.background("blue");
    }
    main.fill("blue");
    main.rect(scrollPos, 0, vidWidth / 2, vidHeight);
    main.rect(width / 2 - scrollPos, 0, vidWidth / 2, vidHeight);

    if (scrollPos > -vidHeight) {
      drawSpotlight();

    }
    main.fill(0);
    main.textSize(70);
    main.text("Click anywhere to play video", width / 2, height / 2 + scrollPos);

  }

  main.textSize(TEXT_SIZE);
  main.textFont(spaceMono);
  main.text("Scroll down to read story", width / 2, height + scrollPos - unit / 4);
  let offset = vidHeight + unit / 2;
  paragraphs.forEach(function (paragraph) {
    paragraph.draw(main, unit * 3, scrollPos + offset);
    offset += paragraph.height;
  })
  if (popup) {
    popup.draw(main);
  }
  // post processing
  noiseGraphics.noStroke();
  let n = 240;
  let noiseHeight = windowHeight / n;
  for (let i = 0; i < n; i++) {

    noiseGraphics.fill(random(60));
    noiseGraphics.rect(0, i * noiseHeight, windowWidth, noiseHeight);
  }
  glslCanvas.background(255);
  vhs.setUniform('canvas', main);
  vhs.setUniform("noiseCanvas", noiseGraphics);
  vhs.setUniform("uResolution", [windowWidth, windowHeight]);
  vhs.setUniform("uMouse", [mouseX, mouseY]);
  vhs.setUniform("uTime", millis() / 1000);
  glslCanvas.shader(vhs);
  glslCanvas.rect(0, 0, width, height);
  scale(1, -1);
  // image(main, 0,0);
  image(glslCanvas, 0, -height, windowWidth, windowHeight);
}

function mousePressed() {
  let inSmall = (mouseX > smallBounds[0] && mouseX < smallBounds[2] && mouseY > smallBounds[1] && mouseY < smallBounds[3]);
  let inLarge = (mouseX > largeBounds[0] && mouseX < largeBounds[2] && mouseY > largeBounds[1] && mouseY < largeBounds[3]);
  if (inSmall || inLarge) {
    if (isVideoPlaying) {
      video.pause();
      isVideoPlaying = false;
    }
    else {
      video.loop();
      isVideoPlaying = true;
    }
  }



  if (!hasClicked) {
    timeSinceClicked = millis();
    isVideoPlaying = true;
    video.loop();

  }


  hasClicked = true;

  popup = null;
  if (popupVideo) {
    popupVideo.stop();
    popupVideo = null;
  }
  if (popupAudio) {
    popupAudio.stop();
    popupAudio = null;
  }

}

function mouseWheel() {
  if (scrollPos == 0) {
    scrollPos -= event.delta;
  }
  if (scrollPos < 0) {
    scrollPos -= event.delta;
  }
  else {
    scrollPos = 0;
  }
  return false;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // noiseGraphics.remove();
  main.remove();
  // glslCanvas.remove();
  // noiseGraphics = createGraphics(windowWidth, windowHeight);
  main = createGraphics(windowWidth, windowHeight);
  paragraphs = [];
  loadStrings('content.txt', onLoadStrings);
  // glslCanvas = createGraphics(windowWidth, windowHeight, WEBGL);
}


function drawSpotlight() {
  let mouseDir = createVector(mouseX, mouseY).sub(spotlightPos);
  let d = mouseDir.mag();

  mouseDir.setMag(d / 10);
  let source = createVector(width * 0.75, height * -0.5);
  let dist = p5.Vector.sub(source, spotlightPos).mag();


  spotlightPos = p5.Vector.add(spotlightPos, mouseDir);
  let spotlightWidth = 100 + 300 * noise(spotlightPos.x / width * 2, spotlightPos.y / width * 2);
  const [A, B] = intersectTwoCircles(spotlightPos.x, spotlightPos.y, spotlightWidth, source.x, source.y, dist);
  main.noStroke();
  if (A || B) {
    main.fill(255, 128);
    main.triangle(source.x, source.y, A.x, A.y, B.x, B.y);
  }
  // spotlightPos = lerp(spotlightPos, mouse, millis());
  main.fill(255);

  main.circle(spotlightPos.x, spotlightPos.y, spotlightWidth * 2);
}

function intersectTwoCircles(x1, y1, r1, x2, y2, r2) {
  var centerdx = x1 - x2;
  var centerdy = y1 - y2;
  var R = Math.sqrt(centerdx * centerdx + centerdy * centerdy);
  if (!(Math.abs(r1 - r2) <= R && R <= r1 + r2)) { // no intersection
    return []; // empty list of results
  }
  // intersection(s) should exist

  var R2 = R * R;
  var R4 = R2 * R2;
  var a = (r1 * r1 - r2 * r2) / (2 * R2);
  var r2r2 = (r1 * r1 - r2 * r2);
  var c = Math.sqrt(2 * (r1 * r1 + r2 * r2) / R2 - (r2r2 * r2r2) / R4 - 1);

  var fx = (x1 + x2) / 2 + a * (x2 - x1);
  var gx = c * (y2 - y1) / 2;
  var ix1 = fx + gx;
  var ix2 = fx - gx;

  var fy = (y1 + y2) / 2 + a * (y2 - y1);
  var gy = c * (x1 - x2) / 2;
  var iy1 = fy + gy;
  var iy2 = fy - gy;

  return [createVector(ix1, iy1), createVector(ix2, iy2)];
}