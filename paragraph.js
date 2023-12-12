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
            let openingBrackets = [];
            for (let j = 0; j < this.text[i].length; j++) {
                let char = this.text[i][j];
                
                if (char === "[") {
                    openingBrackets.push({ char, position: j });
                } else if (char === "]" ) {
                    if (openingBrackets.length > 0) {
                        let openingBracket = openingBrackets.pop();
                        let content = this.text[i].substring(openingBracket.position, j + 1);
                        this.links.push(new Link(openingBracket.position, i-1, j - openingBracket.position + 1, content));
                    }
                }
            }
        }
        this.pressedLastframe = false;
    }

    draw (canvas, x, y){
        if (y > canvas.height + 100 || y < 0-this.height) {
            return;
        }
        // let textWidth = canvas.textWidth("y");
        // print(textWidth);
        let corner = this.charWidth;
        canvas.rectMode(CORNER);
        this.links.forEach(link => {
            canvas.noFill();
            canvas.stroke(0);
            canvas.strokeWeight(4);
            let rX = x + link.x * this.charWidth - 8;
            let rY = y + link.y * this.lineHeight + this.lineHeight * 0.2;
            let rW = link.length * this.charWidth  + 16;
            let rH = this.lineHeight;
            canvas.stroke(0, 0, 255);
            if (mouseX > rX && mouseX < rX + rW && mouseY > rY && mouseY < rY + rH) {
                
                canvas.strokeWeight(8);
                if (mouseIsPressed) {canvas.fill(0, 0, 255);}
                if (mouseIsPressed && this.pressedLastframe == false) {
                    onClickLink(link.text);
                    this.pressedLastframe = true;
                    
                }
                
                
            }
            canvas.rect(rX, rY, rW, rH, corner, corner, corner, corner);
        })
        canvas.noStroke();
        canvas.fill(this.color);
        
        canvas.textSize (TEXT_SIZE);
        canvas.textFont(spaceMono);
        canvas.textAlign(LEFT);
        for (let i = 0; i < this.text.length; i++) {
            canvas.text(this.text[i], x, y + this.lineHeight * i);
        }
        this.pressedLastframe = mouseIsPressed;
    }
}

class Link {
    constructor(x,y, length, text){
        this.x = x;
        this.y = y;
        this.length = length;
        this.text = text;
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