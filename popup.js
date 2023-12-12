class Popup {
    constructor (code) {

        if (code == "[Hannah]" || code == ["[Hannah_Lesser]"]){
          this.focusImage = loadImage("assets/images/lesser.jpeg");
        }
        else if (code == "[Sadecky’s_Puppets]"){
          this.focusImage = loadImage("assets/images/sadecky.jpg");
        }
        else if (code == "[Bryce_Li]") {
          this.focusImage = loadImage("assets/images/bryce.jpg");
        }
        else if (code == "[Elise_Chapman]"){
          this.focusImage = loadImage("assets/images/elise.jpg");
        }
        else if (code == "[Yoosung_Lee]") {
          this.focusImage = loadImage("assets/images/yoosung.jpg");
        }
        else if (code == "[birthdays]"){
            popupVideo = createVideo("assets/videos/birthday.mp4");
            popupVideo.hide();
            popupVideo.loop();
            video.pause();
        }
        else if (code == "[I'm_the_toast_of_Christmas_past]"){
            popupVideo = createVideo("assets/videos/toast.mov");
            popupVideo.hide();
            popupVideo.loop();
            video.pause();
        }  
        else {
            
        }
    }

    draw (canvas) {
        let msWidth = width/2;
        let msHeight = msWidth * windowImage.height / windowImage.width;
        canvas.image(windowImage, width / 2, height/2, msWidth, msHeight);
        if (this.focusImage) {
            canvas.image(this.focusImage, width / 2, height/2, msWidth*3/4, msHeight*3/4);
        }
        if (popupVideo) {
            canvas.image(popupVideo, width / 2, height/2, msWidth*3/4, msHeight*3/4);
        }
    }
}