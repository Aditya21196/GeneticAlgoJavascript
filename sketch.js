let bot0
let bot1
let t1=0
let t2=0
let whiteBlob=[]
let dotsA=[]
let dotsB=[]
let pi=Math.PI
let p01
let p10
let r=40
let limX=750
let limY=500
var bot0text
var bot1text
var t=0
var inp
var inpcreated=false



var leftBuffer;
var rightBuffer;

function setup() {
    // 800 x 400 (double width to make room for each "sub-canvas")

    canvas=createCanvas(750, 700);
    canvas.position((windowWidth-750)/2,135)
    background(255)
    rectMode(CORNER)
    fill(80)
    rect(0,0,width,height-200)



    if(!inpcreated){

      rotateRedClock=createButton("Click to rotate red bot clockwise")
      rotateBlueClock=createButton("Click to rotate blue bot clockwise")
      rotateRedAntiClock=createButton("Click to rotate red bot anti-clockwise")
      rotateBlueAntiClock=createButton("Click to rotate blue bot anti-clockwise")

      rotateRedClock.position(70,260)
      rotateRedAntiClock.position(70,290)
      rotateBlueClock.position(70,340)
      rotateBlueAntiClock.position(70,370)

      rotateRedClock.mousePressed(rotateRC)
      rotateBlueClock.mousePressed(rotateBC)

      rotateRedAntiClock.mousePressed(rotateRAC)
      rotateBlueAntiClock.mousePressed(rotateBAC)

      button = createButton('click to reload state of game')
      button.position(70,200)
      button.mousePressed(setup);

      inp = createInput('40');
      inp.input(myInputEvent);

      rtext=createP("Enter radius:")
      rtext.position(30,150)
      inp.position(120,165)
      inpcreated=true
    }


    //left buffer
    // fill(0, 100, 120)
    // rectMode(CORNER)
    // noStroke()
    // rect(10,10,limX,limY)

    //right buffer
    // fill(120, 100, 0)
    // rect(770,10,limX,limY)
    // Create both of your off-screen graphics buffers
		bot0=new Bot(random(r,350-r),random(r,500-r),random((-1*pi),pi))
		bot1=new Bot(random(360,750-r),random(r,500-r),random((-1*pi),pi))
		p01=bot0.sense(bot1)
    p10=bot1.sense(bot0)
    if(p01.length==0){
      p01=bot0.senseEdges()
      bot0text="The distance of red bot from nearest edge is "+str(dist(p01[0],p01[1],bot0.x,bot0.y)+" (no enemy was detected)")
    }else{
      bot0text="The distance of red bot from enemy (C2C) is "+str(dist(p01[0],p01[1],bot0.x,bot0.y))
    }
    if(p10.length==0){
      p10=bot1.senseEdges()
      bot1text="The distance of blue bot from nearest edge is "+str(dist(p10[0],p10[1],bot1.x,bot1.y)+" (no enemy was detected)")
    }else{
      bot1text="The distance of blue bot from enemy (C2C) is "+str(dist(p10[0],p10[1],bot1.x,bot1.y))
    }
		bot0.createLine(p01)
		bot1.createLine(p10)
    // bot0.createLine([])
    // bot1.createLine([])
    bot0.show(255,0,0)
    bot1.show(0,0,255)

    p0=createP(bot0text)
    p1=createP(bot1text)

    p0.position((windowWidth-750)/2+30,630)
    p1.position((windowWidth-750)/2+30,650)



    console.log(bot0)
    console.log(bot1)

}

// function draw() {
//     // Draw on your buffers however you like
//     drawLeftBuffer();
//     drawRightBuffer();
// 		t1++
// 		t2++
//     // Paint the off-screen buffers onto the main canvas
//     image(leftBuffer, 10, 0);
//     image(rightBuffer, 770, 0);
// }

// function drawLeftBuffer() {
//     leftBuffer.background(0, 100, 120);
//
//     bot0=new Bot(random(40,310)+10,random(40,460)+10,random((-1*pi),pi))
// 		bot1=new Bot(random(360,710)+10,random(40,460)+10,random((-1*pi),pi))
// 		p01=bot0.sense(bot1)
//     p10=bot1.sense(bot0)
//     if(p01.length==0){
//       p01=bot0.senseEdges()
//     }
//     if(p10.length==0){
//       p10=bot1.senseEdges()
//     }
// 		bot0.createLine(p01,leftBuffer)
// 		bot1.createLine(p10,leftBuffer)
//     bot0.show(255,0,0,leftBuffer)
//     bot1.show(0,0,255,leftBuffer)
//     // leftBuffer.textSize(12);
//     // leftBuffer.text("This is the left buffer!", 50, 50);
// }
//
// function drawRightBuffer() {
//     rightBuffer.background(120, 100, 0);
//     rightBuffer.fill(0, 0, 0);
//     rightBuffer.ellipse(100,100,30)
//     // rightBuffer.textSize(12);
//     // rightBuffer.text("This is the right buffer!", 50, 50);
// }

// function setup() {
// 	createCanvas(750, 500)
//
// 	// console.log(tan(3.14/4))
// 	// console.log((int(Math.tan(Math.PI))))
//
// }
//
// // function mousePressed(){
// // 	for(let i=arr.length-1;i>=0;i--){
// // 		if(arr[i].contains(mouseX,mouseY)){
// // 			arr.splice(i,1)
// // 		}
// // 	}
// // }
//
//
//
function draw() {
  // t+=1
  // if(t%20==0){
  //
  //
  //   bot0.rotateClock()
  //   bot1.rotateAntiClock()
  // }


}

class Bot{
	constructor(a,b,theta){
		this.x=a
		this.y=b
		this.theta=theta
	}
	move(){
		this.x=this.x+random(-5,5)
		this.y=this.y+random(-5,5)
	}
  rotateClock(){
    this.theta-=pi/18
    if(this.theta<(-1)*pi){
      this.theta=2*pi+this.theta
    }
  }
  rotateAntiClock(){
    this.theta+=pi/18
    if(this.theta>pi){
      this.theta=2*pi-this.theta
    }
  }
	sense(bot){

    // this.mcon=(-1.0)/ta(this.theta)
    // this.ccon=this.y+this.x/ta(this.theta)

    // makeLine(this.mcon,this.ccon)
    // console.log(this.x)
    this.d=lineDist(this,bot.x,bot.y)
    if(this.d<r){
      this.np = nearestPoint(this,bot.x,bot.y)
      if(this.theta*(this.np[1]-this.y)>0){
        return this.np
      }
    }

    // if((this.theta)*(bot.y-this.mcon*bot.x-this.ccon)<0){
    //
    // }
		// if(0<this.theta && this.theta<pi/2 && bot.x-40>this.x && bot.y-40>this.y){
		// 	//sense
		// 	d=lineDist(this,bot.x,bot.y)
		// 	if(d<r){
		// 		return nearestPoint(this,bot.x,bot.y)
		// 	}
		// }
		// if((-1*pi/2)<this.theta && this.theta<0 && bot.x-40>this.x && bot.y+40<this.y){
		// 	//sense
		// 	d=lineDist(this,bot.x,bot.y)
		// 	if(d<r){
		// 		return nearestPoint(this,bot.x,bot.y)
		// 	}
		// }
		// if((pi/2)<this.theta && this.theta<pi && bot.x+40<this.x && bot.y-40>this.y){
		// 	//sense
		// 	d=lineDist(this,bot.x,bot.y)
		// 	if(d<r){
		// 		return nearestPoint(this,bot.x,bot.y)
		// 	}
		// }
		// if((-1*pi)<this.theta && this.theta<(-1*pi/2) && bot.x+40<this.x && bot.y+40<this.y){
		// 	//sense
		// 	d=lineDist(this,bot.x,bot.y)
		// 	if(d<r){
		// 		return nearestPoint(this,bot.x,bot.y)
		// 	}
		// }
		return []
	}
  senseEdges(){
    this.m=ta(this.theta)
    this.c=this.y-(this.x)*ta(this.theta)
    this.sol=solveY(this.x,this.y,this.theta)
    if(this.sol.length==0){
      if(this.theta>0){
        // this.orientation='up'
        this.sol=solveXUP(this.m,this.c)
      }else{
        // this.orientation='down'
        this.sol=solveXDOWN(this.m,this.c)
      }
    }
    return this.sol
  }
	createLine(p){
		if(p.length==0){
			let points=parametric(this.x,this.y,this.theta,1000)
      console.log(points)
      strokeWeight(1)
      stroke(0,0,120)
      line(points[0],points[1],this.x,this.y)
		}else{
      strokeWeight(3)
      stroke(0,255,0)
      line(p[0],p[1],this.x,this.y)
    }
	}
	contains(px,py){
		let d=dist(px,py,this.x,this.y)
		// console.log(d)
		if(d<this.radius){
			return true
		}else{
			return false
		}
	}
	show(a,b,c,startPoints){
    noStroke()
    fill(a,b,c)
    ellipse(this.x,this.y,2*r,2*r)
	}
}
class Dot{
	constructor(x,y,theta){
		this.x=x
		this.y=y
		this.theta=theta
	}
  show(){
    stroke(255)
		strokeWeight(4)
		fill(200)
		ellipse(this.x,this.y,2*r,2*r)
  }
}

function ta(rad){
	return Math.tan(rad)
}

function lineDist(bot,a2,b2){
	let c=bot.y-(bot.x)*(ta(bot.theta))
	let m=ta(bot.theta)
	let dis=Math.abs((b2-m*a2-c)/Math.pow(m*m+1,0.5))
	return dis
}

function parametric(x,y,theta,d){
	return [x+d*Math.cos(theta),y+d*Math.sin(theta)]
}

function nearestPoint(lineBot,a2,b2){
	let a1=lineBot.x
	let b1=lineBot.y
	let m1=ta(lineBot.theta)
	return [((b2-b1+a1*m1+a2/m1)/(m1+1/m1)),((b2*m1+b1/m1+a2-a1)/(m1+1/m1))]
}

function solveY(x,y,theta){
  var m=ta(theta)
  var c=y-x*m
  if(c>=0 && c<=limY){
    if(theta*(y-c)<0){
      return [0,c]
    }
  }
  if(m*limX+c>=0 && m*limX+c<=limY){
    if(theta*(y-(m*limX+c))<0){
      return [limX,m*limX+c]
    }
  }
  return []
}

function solveXDOWN(m,c){
  var xdown=(-1)*c/m
  if(xdown>=0 && xdown <= limX){
    return[xdown,0]
  }
  return []
}

function solveXUP(m,c){
  var xup=(limY-c)/m
  if(xup>=0 && xup<=limX){
    return[(limY-c)/m,limY]
  }
  return []
}

function makeLine(m,c){
  stroke(255,0,0)
  line(0,c,(-1)*c/m,0)
}

function myInputEvent() {
  if(isNumeric(this.value())){
    r=int(this.value())
    if(r<=40 || r>150){
      r=40
    }
    setup()
    return


  }
  r=40
  setup()

}

function isNumeric(num){
  return !isNaN(num)
}

function rotateRC(){
  bot0.rotateClock()
  reDraw()
}

function rotateBC(){
  bot1.rotateClock()
  reDraw()
}

function rotateRAC(){
  bot0.rotateAntiClock()
  reDraw()
}

function rotateBAC(){
  bot1.rotateAntiClock()
  reDraw()
}

function reDraw(){
  canvas=createCanvas(750, 700);
  canvas.position((windowWidth-750)/2,135)
  background(255)
  rectMode(CORNER)
  fill(80)
  rect(0,0,width,height-200)

  p01=bot0.sense(bot1)
  p10=bot1.sense(bot0)
  if(p01.length==0){
    p01=bot0.senseEdges()
    bot0text="The distance of red bot from nearest edge is "+str(dist(bot1.x,bot1.y,bot0.x,bot0.y))+" (no enemy was detected)"
  }else{
    bot0text="The distance of red bot from enemy (C2C) is "+str(dist(bot1.x,bot1.y,bot0.x,bot0.y))
  }
  if(p10.length==0){
    p10=bot1.senseEdges()
    bot1text="The distance of blue bot from nearest edge is "+str(dist(bot1.x,bot1.y,bot0.x,bot0.y))+" (no enemy was detected)"
  }else{
    bot1text="The distance of blue bot from enemy (C2C) is "+str(dist(bot1.x,bot1.y,bot0.x,bot0.y))
  }
  bot0.createLine(p01)
  bot1.createLine(p10)
  // bot0.createLine([])
  // bot1.createLine([])
  bot0.show(255,0,0)
  bot1.show(0,0,255)

  p0=createP(bot0text)
  p1=createP(bot1text)

  p0.position((windowWidth-750)/2+30,630)
  p1.position((windowWidth-750)/2+30,650)
}
