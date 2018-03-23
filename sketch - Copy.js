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
let d
let limX=750
let limY=500



var leftBuffer;
var rightBuffer;

function setup() {
    // 800 x 400 (double width to make room for each "sub-canvas")
    createCanvas(1530, 520);
    background(80)
    // Create both of your off-screen graphics buffers
		// bot0=new Bot(random(40,310),random(40,460),random((-1*pi),pi))
		// bot1=new Bot(random(360,710),random(40,460),random((-1*pi),pi))
		// p01=bot0.sense(bot1)
    // p10=bot1.sense(bot0)
    // if(p01.length==0){
    //   p01=bot0.senseEdges()
    // }
    // if(p10.length==0){
    //   p10=bot1.senseEdges()
    // }
		// bot0.createLine(p01)
		// bot1.createLine(p10)
    // bot0.show(255,0,0)
    // bot1.show(0,0,255)
    leftBuffer = createGraphics(750, 500);
    rightBuffer = createGraphics(750, 500);

    drawLeftBuffer()
    drawRightBuffer()

    image(leftBuffer, 10, 10);
    image(rightBuffer, 770, 10);

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

function drawLeftBuffer() {
    leftBuffer.background(0, 100, 120);

    bot0=new Bot(random(40,310),random(40,460),random((-1*pi),pi))
		bot1=new Bot(random(360,710),random(40,460),random((-1*pi),pi))
		p01=bot0.sense(bot1)
    p10=bot1.sense(bot0)
    if(p01.length==0){
      p01=bot0.senseEdges()
    }
    if(p10.length==0){
      p10=bot1.senseEdges()
    }
		bot0.createLine(p01,leftBuffer)
		bot1.createLine(p10,leftBuffer)
    bot0.show(255,0,0,leftBuffer)
    bot1.show(0,0,255,leftBuffer)
    // leftBuffer.textSize(12);
    // leftBuffer.text("This is the left buffer!", 50, 50);
}

function drawRightBuffer() {
    rightBuffer.background(120, 100, 0);
    rightBuffer.fill(0, 0, 0);
    // rightBuffer.textSize(12);
    // rightBuffer.text("This is the right buffer!", 50, 50);
}

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
// function draw() {
//
// 	// console.log(Math.pow(t,0.5))
//
//
// }

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
	sense(bot){

    this.mcon=(-1)/ta(this.theta)
    this.ccon=this.y+this.x/ta(this.theta)

    if((this.theta)*(bot.y-this.mcon*bot.x-this.ccon)>0){
      console.log("we are in")
      console.log(bot.x)
      d=lineDist(this,bot.x,bot.y)//
			if(d<r){
				return nearestPoint(this,bot.x,bot.y)
			}
    }
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
    this.sol=solveY(this.m,this.c)
    if(this.sol.length==0){
      if(this.theta>0){
        this.sol=solveXUP(this.m,this.c)
      }else{
        this.sol=solveXDOWN(this.m,this.c)
      }
    }
    return this.sol
  }
	createLine(p,buffer){
    console.log(buffer)
		if(p.length==0){
			let points=parametric(this.x,this.y,this.theta,1000)
      console.log(points)
      buffer.strokeWeight(3)
      buffer.stroke(0,255,0)
      buffer.line(points[0],points[1],this.x,this.y)
		}else{
      buffer.strokeWeight(3)
      buffer.stroke(0,255,0)
      buffer.line(p[0],p[1],this.x,this.y)
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
	show(a,b,c,buffer){
    buffer.noStroke()
    buffer.fill(a,b,c)
    buffer.ellipse(this.x,this.y,2*r,2*r)
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

function solveY(m,c){
  if(c>=0 && c<=limY){
    return [0,c]
  }
  if(m*limX+c>=0 && m*limX+c<=limY){
    return [limX,m*limX+c]
  }
  return []
}

function solveXDOWN(m,c){
  if(((limY-c)/m)>=0){
    return[(limY-c)/m,0]
  }
  return []
}

function solveXUP(m,c){
  if(((-1)*m/c)<=limX){
    return [(-1)*m/c,limX]
  }
  return []
}
