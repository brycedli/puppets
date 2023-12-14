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
            isVideoPlaying = false;
            video.pause();
        }
        else if (code == "[I'm_the_toast_of_Christmas_past]"){
            popupVideo = createVideo("assets/videos/toast.mov");
            popupVideo.hide();
            popupVideo.loop();
            isVideoPlaying = false;
            video.pause();
        }  
        else if (code =="[for_sale]"){
            //open a link
            this.focusImage = loadImage("assets/images/sale.jpg")
            window.open("http://www.livepuppets.com/Sale.html");
        }
        else if (code == "[Stuck_inside_a_whale!]"){
            this.focusImage = loadImage("assets/images/audio.png");
            popupAudio = loadSound("assets/audio/whale.m4a", () => {popupAudio.loop()});
            isVideoPlaying = false;
            video.pause();
        }
        else if (code == "[$15]") {
            this.focusImage = loadImage("assets/images/money.jpg");
        }
        else if (code == "[Robert]"){
            this.focusImage = loadImage("assets/images/rob.jpg");
        }
        else if (code == "[storybook classic]"){
            popupVideo = createVideo("assets/videos/fables.mp4");
            popupVideo.hide();
            popupVideo.loop();
            isVideoPlaying = false;
            video.pause();
        }
        else if (code == "[lungs_puppet]"){
            this.focusImage = loadImage("assets/images/lungs.jpg");
        }
        else if (code == "[“Breathless”]"){
            popupVideo = createVideo("assets/videos/breathless.mp4");
            popupVideo.hide();
            popupVideo.loop();
            isVideoPlaying = false;
            video.pause();
        }
        else if (code == "[Funko_Pops]"){
            this.focusImage = loadImage("assets/images/funko.jpg");
        }
        else if (code == "[Florida]"){
            this.focusImage = loadImage("assets/images/florida.jpg");
        }
        else if (code == "[vintage_toys?]"){
            this.focusImage = loadImage("assets/images/fart.jpg");
        }
        else if (code == "[ribbon_badge]"){
            this.focusImage = loadImage("assets/images/ribbon.jpg");
        }
        else if (code == "[this_picture_here]"){
            this.focusImage = loadImage("assets/images/henson.jpg");
        }
        else if (code == "[Guy_Smiley]"){
            this.focusImage = loadImage("assets/images/guy.jpg");
        }
        else if (code == "[Prairie_Dawn]"){
            this.focusImage = loadImage("assets/images/prairie.jpg");
        }
        else if (code == "[Yeah.]"){ //mr mean dude
            this.focusImage = loadImage("assets/images/mean.jpg");
        }
        else if (code == "[Michael_Sadecky]"){
            this.focusImage = loadImage("assets/images/michael.jpg");
        }
        else if (code == "[sculpted_foam]"){
            this.focusImage = loadImage("assets/images/wip.jpg");
        }
        else if (code == "[the_fingers]"){
            this.focusImage = loadImage("assets/images/arm.jpg");
        }
        else if (code == "[grocer's_voice]"){
            this.focusImage = loadImage("assets/images/grocer.jpg");
        }
        else if (code == "[Singing]"){
            this.focusImage = loadImage("assets/images/audio.png");
            popupAudio = loadSound("assets/audio/tired.m4a", () => {popupAudio.loop()});
            isVideoPlaying = false;
            video.pause();
        }
        else if (code == "[Mean_Dude_voice]"){
            this.focusImage = loadImage("assets/images/audio.png");
            popupAudio = loadSound("assets/audio/meandude.m4a", () => {popupAudio.loop()});
            isVideoPlaying = false;
            video.pause();
        }
        else if (code == "[YouTube]"){
            window.open("https://www.youtube.com/@MichaelSadecky/featured");
            this.focusImage = loadImage("assets/images/livepuppets.jpg");
        }
        else if (code == "[cassette_tapes]"){
            this.focusImage = loadImage("assets/images/cassette.jpg");
        }
        else if (code == "[rainforest]"){
            this.focusImage = loadImage("assets/images/rainforest.jpg");
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