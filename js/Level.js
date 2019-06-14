export default class Level {
  constructor(level, animal) {
    // level must start at 0 and be incremented over time
    this.animalToFind = animal;
    this.baseBoxes = 4;
    this.baseToFind = 2;
    this.levelName = `Level-0${level + 1}`;
    this.boxCount = this.baseBoxes + level * 2;
    this.lives = level < 3 ? 3 : 5;
    this.toFind = this.baseToFind + level * 1;
    this.found = 0;
    this.errMsg = "err-msg";
    this.heartLife = "./../img/heart-life.png";
    this.boxClosed = "./../img/box-closed.png";
    this.boxEmpty = "./../img/box-open.png";
    this.boxCat = "./../img/box-cat.png";
    this.boxDog = "./../img/box-dog.png";
    this.boxLion = "./../img/box-lion.png";
    this.boxButterfly = "./../img/box-butterfly.png";
    this.petsTab = [
      this.boxCat,
      this.boxDog,
      this.boxLion,
      this.boxButterfly,
      this.boxEmpty
    ];
  }

  isFinished() {
    return this.found === this.toFind;
  }

  drawBoxes() {
    // console.log(this.animalToFind);
    let output = "";

    const animals = {
      cat: this.petsTab[0],
      dog: this.petsTab[1],
      lion: this.petsTab[2],
      butterfly: this.petsTab[3]
    };

    const levelImages = [];
    const levelAnimalImage = animals[this.animalToFind];
    const remainder = this.boxCount - this.toFind;
    var counter = 0;

    while (counter < this.toFind) {
      levelImages.push(levelAnimalImage);
      counter++;
    }

    // console.log("this.animalToFind", this.animalToFind);
    // console.log("levelAnimalImage", levelAnimalImage);
    // console.log("levelAnimalImage", levelAnimalImage);
    // console.log("levelImages", levelImages);

    counter = 0;

    while (counter < remainder) {
      const rand = Math.floor(Math.random() * this.petsTab.length);
      const img = this.petsTab[rand];
      if (img && img !== levelAnimalImage) {
        levelImages.push(img);
        counter++;
      }
    }

    const shuffle = _.shuffle(levelImages);

    function extractTarget(str) {
      const match = str.match(/-|\w+|.png/g);
      return match[match.length - 2];
    }

    // console.log("----------------------------");
    // console.log("levelImages", levelImages);
    // console.log("shuffeld", shuffle);

    for (let i = 0; i < shuffle.length; i++) {
      const attr = extractTarget(shuffle[i]);
      output += `<img id="box-${i +
        1}" class="box" data-box-content="${attr}" src="./../img/box-closed.png" />`;
    }
    return output;
  }

  loseLife() {
    this.lives--;
  }

  petsToFind(attr) {
    return `${this.levelName} you have <b>${this.toFind}</b> <b>${
      this.animalToFind
    }s</b> to find.`;
  }

  drawLives() {
    let output = "";
    for (var i = 0; i < this.lives; i++) {
      output += `
        <img src="${this.heartLife}" class="circle-life" />
      `;
    }
    return output;
  }
}
/*errMessage() {
    var blocMsg = document.getElementById(this.errMsg);
    var elem = document.getElementsByClassName("level");
    elem.onclick = function() {
      if (this.found == 0) {
        blocMsg.innerHTML = `You can't access to the ${elem.id}
        without finish the level-1`;
      } else {
        return console.log(`Welcome ${this.name}`);
      }
    };
  }

  nextLevel() {
    if (this.found !== this.toFind) {
      alert("you must to find the box card");
    } else {
      alert("You have x to find");
    }
  }
*/
