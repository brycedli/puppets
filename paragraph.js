class Paragraph {
    constructor(text, totalWidth, charWidth) {
        if (text.charAt(0) == ">") {
            this.color = color(0, 0, 255);
        }
        else{
            this.color = color(0, 0, 0);
        }
        this.charWidth = charWidth;
        this.text = wordWrapToStringList(text, parseInt(totalWidth/charWidth));
        this.lineHeight = TEXT_SIZE * 1.3;
        this.height = this.lineHeight * this.text.length + this.lineHeight;
        this.links = [];
        let openingBracket;
        for (let i = 0; i < this.text.length; i++) {
            openingBracket = this.text[i].search(/[\[\(]/);
            let closingBracket = this.text[i].search(/[\]\)]/);
            if (openingBracket != -1 && closingBracket != -1) {
                this.links.push(new Link(openingBracket, i-1, closingBracket - openingBracket + 1));
            }
        }
    }

    draw (canvas, x, y){
        // let textWidth = canvas.textWidth("y");
        // print(textWidth);
        let corner = this.charWidth;
        canvas.rectMode(CORNER);
        this.links.forEach(link => {
            canvas.noFill();
            canvas.stroke(0);
            canvas.strokeWeight(2);
            let rX = x + link.x * this.charWidth - 8;
            let rY = y + link.y * this.lineHeight + this.lineHeight * 0.2 - 2;
            let rW = link.length * this.charWidth  + 16;
            let rH = this.lineHeight + 4;
            canvas.rect(rX, rY, rW, rH, corner, corner, corner, corner);
        })
        canvas.noStroke();
        canvas.fill(this.color);
        if (y > canvas.height || y < 0-this.height) {
            return;
        }
        canvas.textSize (TEXT_SIZE);
        canvas.textFont(spaceMono);
        canvas.textAlign(LEFT);
        for (let i = 0; i < this.text.length; i++) {
            canvas.text(this.text[i], x, y + this.lineHeight * i);
        }
    }
}

class Link {
    constructor(x,y, length){
        this.x = x;
        this.y = y;
        this.length = length;
    }

    
}
function wordWrapToStringList(text, maxLength) {
    var result = [], line = [];
    var length = 0;
    text.split(" ").forEach(function (word) {
        if ((length + word.length) >= maxLength) {
            result.push(line.join(" "));
            line = []; length = 0;
        }
        length += word.length + 1;
        line.push(word);
    });
    if (line.length > 0) {
        result.push(line.join(" "));
    }
    return result;
};