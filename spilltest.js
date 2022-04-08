// lager variabel for canvas/banen og score. Sier også at canvas skal være 2d.
let score2 = document.querySelector('#score2')
let canvas = document.getElementById("canvas");
let cvs = canvas.getContext('2d');
// lager vairabel for canvas bakgrunnsfarge.
let bFarge;

//høyde og bredde til canvas eller områden.
canvas.width = 1445
canvas.height = 576
// lager variabel, når spillet er over og
// sier at verdien skal være falsk
let taptSpill = false;


// lager variabel for bakgrunnsmusikk, skyte lyd både for alien
// og spilleren. Deretter legger jeg til musikkene.
let musikk = new Audio('Sounds/musikk.mp3');
let skytelyd = new Audio("Sounds/Jetflys.mp3");
let skytelyd2 = new Audio("Sounds/skytelyd.mp3")
let eksplosjonslyd = new Audio("Sounds/eksplosjon.mp3");
let GameOver = new Audio("Sounds/Game-Over.mp3")
// hvis spillet er tapt, eller er over. Da stopp musikk,
// hvis ikke fortsett musikken.
function musikkSpiller() {
  if (taptSpill == true) {
    musikk.pause();
    skytelyd.pause();
    skytelyd2.pause();
  } else {
    musikk.play();
  }
}

//lager klasse for spilleren.
class Player {
  constructor() {
    //lager funskjon for spillere til å bevege seg.
    this.velocity = {
      x: 0,
      y: 0
    }
    // synlighet til spilleren.
    this.opacity = 1

    //lager variabel for bildet.
    let image = new Image()
    //henter bildet eller spilleren.
    image.src = './Bilder/spaceship-2.png'

    //last inn bildet eller spillern.
    image.onload = () => {
      //lager funskjon for bilde (spiller).
      this.image = image
      //lager variabel for størrelse.
      let scale = 0.15
      //bestemmer høyde og bredde til spilleren eller bildet.
      this.width = image.width * scale
      this.height = image.height * scale
      // gir spilleren eller bildet posisjon basert på canvas bredde
      // og høyde. Samtidig spilleren høyde og bredde også.
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  //Gir farge, posion og høyde og bredde til spillern.
  draw() {
    //skjul spilleren basert på player opacity.
    cvs.globalAlpha = this.opacity


    //vis bildet som er valgt og gi den verdier
    //som posisjon, høyde og bredde til spillern.
    cvs.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    // hvis bildet er lastet inn, hvis den på vinduet.
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      // spiller bakgrunnsmusikk for spillet.
      musikkSpiller();
    }
  }
}

//lager funskjon for spillere kan skyte skudd og legger til klasse.
class Bullet {
  constructor({
    position,
    velocity
  }) {
    this.position = position
    this.velocity = velocity

    this.radius = 5
  }
  // lager skuddene, gir den farge, posisjon og hvis det på vinduet.
  draw() {
    //start.
    cvs.beginPath()
    //sirkel som er skuddene til spilleren.
    cvs.arc(this.position.x, this.position.y, this.radius, 0,
      Math.PI * 2)
    // farge for skuddene til spilleren.
    cvs.fillStyle = 'red'
    cvs.fill()
    //slutt.
  }

  // lager bevegelse for skuddene og hvis det på vinduet.
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}


//lager klasse for Aliens.
class Alien {
  constructor({
    position
  }) {
    //lager funskjon for spillere til å bevege seg.
    this.velocity = {
      x: 0,
      y: 0
    }

    //lager variabel for bildet.
    let image = new Image()
    //henter bildet eller spilleren.
    image.src = './Bilder/alien.png'
    //last inn bildet eller spillern.
    image.onload = () => {
      //lager funskjon for bilde (spiller).
      this.image = image
      //lager variabel for størrelse på bildet.
      let scale = 0.10


      //bestemmer høyde og bredde til spilleren eller bildet.
      this.width = image.width * scale
      this.height = image.height * scale
      // gir spilleren eller bildet posisjon basert på canvas bredde
      // og høyde. Samtidig spilleren høyde og bredde også.
      this.position = {
        x: position.x,
        y: position.y
      }
    }
  }

  draw() {
    //vis bildet som er valgt og gi den verdier
    //som posisjon, høyde og bredde til spillern.
    cvs.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  // hvis bildet er lastet inn, hvis den på vinduet og oppdater bevegelse.
  update({
    velocity
  }) {
    if (this.image) {
      this.draw()
      // x posisjonen og y posisjon for aliens.
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }
  //lager funksjon for at alien kan shyte skudd basert posisjon x og y.
  // Og sier at bredde skal bli delt 2, sånn at skuddene kommer i sentrum.
  // gjør det samme med høyde, men trenger ikke dele på 2.
  shoot(alienBullets) {
    // spill skytelyd når alien skyter.
    skytelyd2.play();
    alienBullets.push(new AlienBullet({
      position: {
        x: this.position.x + this.width,
        y: this.position.y + this.height
      },
      // hastighet til skuddene.
      velocity: {
        x: 0,
        y: 3
      }
    }))
  }
}


//lager klasse for AlienBullet.
class AlienBullet {
  constructor({
    position,
    velocity
  }) {
    this.position = position
    this.velocity = velocity

    this.width = 5
    this.height = 6
  }
  // lager skuddene til aliens, gir den farge, posisjon og hvis det på vinduet.
  draw() {
    cvs.fillStyle = 'blue'
    cvs.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  // lager bevegelse for skuddene og hvis det på vinduet.
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

//lager funskjon for eksplosjon, når alien blir truffet av skuddene til
//spilleren og legger til klasse. Setter inn verdiene.
class Eksplosjon {
  constructor({
    position,
    velocity,
    radius,
    color
  }) {
    this.position = position
    this.velocity = velocity

    // radiusen til eksplosjon og fargen.
    this.radius = radius
    this.color = color
    // synlig kode.
    this.opacity = 1
  }
  draw() {
    //lagre canvas.
    cvs.save()
    // fjerner synlighet basert på koden under.
    cvs.globalAlpha = this.opacity
    // start.
    cvs.beginPath()
    // lager skuddene, gir den farge, posisjon og hvis det på vinduet.
    cvs.arc(this.position.x, this.position.y, this.radius, 0,
      Math.PI * 2)
    cvs.fillStyle = this.color
    // setter inn farge av eksplosjon.
    cvs.fill()
    //rette opp canvas.
    cvs.restore()
  }

  // lager bevegelse for skuddene og hvis det på vinduet.
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    // hvor mye synlig skal det være.
    this.opacity -= 0.01
  }
}


// lager klasse for rutenett, gir posisjon til den.
// Deretter sier at alien skal bli bevege seg
// med hastighet på 5.
class AlienGrid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: 5,
      y: 0
    }
    this.aliens = []
    // last inn aliens basert tilfeldig posisjon mellon 0 og 10. Dertter pluss med 5.
    //  Det vil være tilpasset med kolonne.
    let columns = Math.floor(Math.random() * 2 + 5)
    // last inn aliens basert tilfeldig posisjon mellon 0 og 5. Dertter pluss med 2.
    // Det vil være tilpasset med rad.
    let rows = Math.floor(Math.random() * 5 + 2)
    // når aliens kommer til slutt punktet, gå motsatt retning retning.
    this.width = columns * 30
    // Gir alien også en x posisjon som vil være basert på x verdien.
    for (let x = 0; x < columns; x++) {
      // Gir alien også en y posisjon som vil være basert på y verdien.
      for (let y = 0; y < rows; y++) {

        // sett inn aliens og utvid x veriden med 100.
        // Det samme gjelder y verdien også utvid den med 100.
        this.aliens.push(
          new Alien({
            position: {
              x: x * 30,
              y: y * 30
            }
          }))
      }
    }
  }
  
  update() {
    // Sier at aliens skal bevege sidelengs og nedover.
    // og gir y posisjon av hastighet verdi for 0 (standard).
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.velocity.y = 0

    // hvis posisjon x og bredde er større eller lik canvas/banen.
    // Eller posisjon x er mindre eller lik 0. Hvis all dette her stemmer
    // kjør koden.
    if (this.position.x + this.width >= canvas.width ||
      this.position.x <= 0) {

      //Da bevege aliens -x posisjoen (venstre side).
      this.velocity.x = -this.velocity.x

      // tar alines nedover, dersom de treffer
      // en av sidene (høyre eller venstre).
      this.velocity.y = 20
    }
  }
}


// lager variabler for spilleren og skuddene til spilleren, rutenett
// og knappene som blir brukt.
// deretter gir dem verdi og oppretter spiller.
let player = new Player()
let bullets = []
let grids = []
let alienBullets = []
let eksplosjon = []
let keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}


// lager variabel for frame med verdien 0.
let frames = 0

// lager variabel for tilfeldig intervall og gir den verdi
// som er basert på tilfeldig frames. sier også at
// det skal ta utgangspunktet i heltall
let randomInterval = Math.floor(Math.random() * 500 + 500)

// lager variabel for game  med over verdien falsk og active verdi sant.
let game = {
  over: false,
  active: true
}
//lager variabel for score og sier at standard verdi er 0.
let score = 0;

function changeBackgroundColor() {
  let n = Math.floor(Math.random() * 9) + 1;

  switch (n) {
    case 1:
      bFarge = "#420a08";
      break;
    case 2:
      bFarge = "#001457";
      break;
    case 3:
      bFarge = "#08112e";
      break;
    case 4:
      bFarge = "#111930";
      break;
    case 5:
      bFarge = "#171d2e";
      break;
    case 6:
      bFarge = "#1d212b";
      break;
    case 7:
      bFarge = "#25282e";
      break;
    case 8:
      bFarge = "#28292b";
      break;
    case 9:
      bFarge = "#002673";
      break;
  }
}
// hvert 0,5 sekund byttes bakgrunnsfarge.
setInterval(changeBackgroundColor, 500);

//lager funksjon for eksplosjon og legger til verdi objekt og farge.
function createEksplosjon({
  object,
  color
}) {

  // legg til 15 eksplosjon/sirkelene per
  // truffet av skuddene til spilleren.
  for (let i = 0; i < 15; i++) {

    //legger til eksplosjon basert på x, y posisjon og bredden delt med 2
    // for at det skal være i sentrum. Samme med høyde.
    eksplosjon.push(new Eksplosjon({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },
      //hastighet til eksplosjon som er tilfeldig.
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      // formen til eksplosjoen som er tilfeldig og gir fargen lys grå.
      radius: Math.random() * 3,
      color: color || 'lightgrey'
    }))
  }
}


// lager funksjon for å starte spillet,
// dertter sier hvilken ting som skal være synlig
//  og usynlig. Når spillet er startet .
function startGame() {
  let startSpill = document.getElementById("start")
  let gameCanvas = document.getElementById("canvas")
  let gameOver = document.getElementById("game-over")
  let showScore = document.getElementById("score")
  let showScore2 = document.getElementById("score2")
  let bgn = document.getElementById("bgn")
  let video = document.getElementById("myVideo")
  startSpill.style.display = "none";
  gameCanvas.style.display = "block";
  video.style.display = "none";
  gameOver.style.display = "none";
  bgn.style.display = "block";
  showScore.style.display = "block";
  showScore2.style.display = "block";
  // stopp video, når spillet er startet.
  video.pause();
  // start spillet, dersom knappen ble trykket.
  start();
}

// lager funksjon for å stoppe spillet eller over,
// dertter sier hvilken ting som skal være synlig
// og usynlig. Når spillet er stoppet eller over.
function gameOver() {
  let startSpill = document.getElementById("start")
  let gameCanvas = document.getElementById("canvas")
  let gameOver = document.getElementById("game-over")
  let showScore = document.getElementById("score")
  let showScore2 = document.getElementById("score2")
  startSpill.style.display = "none";
  gameCanvas.style.display = "block";
  gameOver.style.display = "block";
  showScore.style.display = "block";
  showScore2.style.display = "block";
}


//lager funksjon for draw til spillern
//og den vil gå i loop.
//Dertter lager firekant som vil dekke hele banen osv.
function start() {
  function draw() {
    // hvis spillet vårt er ikke aktivert, stopp alt.
    if (!game.active) return
    requestAnimationFrame(draw)
    // tilfeldig bakgrunn farge. Se funksjonen changeBackgroundColor()
    cvs.fillStyle = bFarge;
    cvs.fillRect(0, 0, canvas.width, canvas.height)
    player.update() 
    alienBullets.forEach((alienBullet, i) => {
      if (alienBullet.position.y + alienBullet.height >= canvas.height) {
        setTimeout(() => {
          alienBullets.splice(i, 1)
        }, 0)
      } else {
        alienBullet.update()
      }
    })

    // velg hver ensete eksplosjon og oppdater.
    eksplosjon.forEach((eksplosjon, i) => {
      eksplosjon.update()
    })

    // velg hver ensete bullet og oppdater.
    alienBullets.forEach((alienBullet, i) => {
      // spilleren dør, hvis skuddene til alien treffer spilleren.
      if (alienBullet.position.y + alienBullet.height >= player.position.y &&
        alienBullet.position.x + alienBullet.width >= player.position.x &&
        alienBullet.position.x <= player.position.x + player.width) {

        // musikk blir stoppet etter spilleren dør.
        taptSpill = true;
        // når spilleren dør, spill eksplosjonslyd.
        eksplosjonslyd.play();

        setTimeout(() => {
          alienBullets.splice(i, 1)
          //skjul spilleren.
          player.opacity = 0
        }, 0)
        // stopp spillet etter ett sekunder.
        setTimeout(() => {
          game.active = false
          skytelyd.pause();
        }, 1000)

        // vis game over screen etter halv sekund
        setTimeout(() => {
          // velger object som spilleren og når aliens skudd
          // treffer spilleren, skal det komme grå eksplosjon.
          gameOver()
          // spill lyden.
          GameOver.play();
        }, 500)

        createEksplosjon({
          object: player,
          color: 'grey'
        })
      }
      alienBullet.update()
    })

    // velg hver ensete bullet og oppdater.
    bullets.forEach((bullet) => {
      bullet.update()
    })

    //velg hver ensete rutenett og oppdater.
    //Deretter velg hver ensete alien og gir alien verdi for i.
    grids.forEach((grid) => {
      grid.update()
      // legg til bullets til aliens på tilfeldig posisjon.
      // Og hvor mange skudd per frames i sekunder.
      if (frames % 100 === 0 && grid.aliens.length > 0) {
        grid.aliens[Math.floor(Math.random() *
          grid.aliens.length)].shoot(alienBullets)
      }

      grid.aliens.forEach((alien, i) => {
        //Oppdater og sier at bevegelse til aliens
        //skal være basert på rutenett bevegelse.
        alien.update({
          velocity: grid.velocity
        })

        //velg hver ensete bullet og gir bullet verdi for j.
        bullets.forEach((bullet, j) => {

          // hvis bullet posisjon y minus bullet radius er mindre eller
          //lik enn alien posisjon y pluss alien høyde. Samtidig hvis bullet
          //posisjon x pluss bullet radius er større eller lik alien posisjon x
          //og omvendt sammen med alien bredde. Sier også at hvis
          //bullet posisjon pluss bullet radius er større
          //eller lik alien posisjon y, da ta ut alien når spilleren skyter.
          if (bullet.position.y - bullet.radius <=
            alien.position.y + alien.height &&
            bullet.position.x + bullet.radius >= alien.position.x &&
            bullet.position.x - bullet.radius <= alien.position.x + alien.width &&
            bullet.position.y + bullet.radius >= alien.position.y) {

            setTimeout(() => {
              // lager variabel for alien som er basert på gjenkjenne alien.
              let alienFound = grid.aliens.find(
                (alien2) => alien2 === alien
              )

              // lager variabel for skuddene som er basert på gjenkjenne skudd.
              let bulletFound = bullets.find(bullet2 => bullet2 === bullet)
              // hvis alien og bullet ble funnet.
              if (alienFound && bulletFound) {
                // gi spilleren poeng hver gang spilleren tar ut alien.
                score += 100
                // hvis det på viduet.
                score2.innerHTML = score

                // eksploder aliens.
                createEksplosjon({
                  object: alien,
                })

                // ta ut en alien, når spilleren skyter en skudd og
                // tar ut skuddene også.
                grid.aliens.splice(i, 1)
                bullets.splice(j, 1)

              }
            }, 0)
          }
        })
      })
    })

    //hvis knappen a er trykket på, da beveger spilleren til venstre.
    if (keys.a.pressed && player.position.x >= 0) {
      //hastighet til spillerens bevegelse.
      player.velocity.x = -10
      //når knappen d blir trykket, da beveg spilleren høyre og
      //ikke la spilleren gå ut av banen.
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
      //hastighet til spillerens bevegelse.
      player.velocity.x = 10
    }

    //men hvis knappen a ikke er trykket på, da skal spilleren være på
    //standard posisjon.
    else {
      player.velocity.x = 0
    }

    // hvis det stemmer, legg til ny rad med aliens.
    // I hver tilfeldig frames.
    if (frames % randomInterval === 0) {
      grids.push(new AlienGrid())
      randomInterval = Math.floor(Math.random() * 200 + 200)
      frames = 0
    }

    // øk frames
    frames++
  }
  //kjør funksjonen.
  draw();



  //lager funskjon for å spesifisere hvilken knapper skal bli trykket på,
  //for at spilleren skal bevege seg. Den med tom er space.
  addEventListener('keydown', ({
    key
  }) => {
    // kontrollen til spilleren
    switch (key) {
      case 'a':
        keys.a.pressed = true
        break
      case 'd':
        keys.d.pressed = true
        break

      case ' ':
        keys.space.pressed = true
        break
    }
  })

  addEventListener('keyup', ({
    key
  }) => {
    // kontrollen til spilleren
    switch (key) {
      case 'a':
        keys.a.pressed = false
        break
      case 'd':
        keys.d.pressed = false
        break
      case ' ':
        //gir skuddene posisjon som er basert på spilleren
        //og sier at skuddene skal gå oppover.
        bullets.push(
          new Bullet({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y
            },
            velocity: {
              x: 0,
              y: -20
            }
          }))
        // når spillet er tapt, ikke lag lyden
        if (taptSpill == false) {
          let skytelyd = new Audio("Sounds/Jetflys.mp3");
          skytelyd.play()
        }
        break
    }
  })
}
