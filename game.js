let x=50;
let y=300;
let game=false
let bx=0
let by=0
let ax=true
let highscore=0
let nextBars=0
let createdBars=3
let isplayed=false

let bars=[
    {xstart:300,xend:380,ytop:250,ybottom:450},
    {xstart:680,xend:760,ytop:100,ybottom:300},
    {xstart:1060,xend:1140,ytop:200,ybottom:400}
]


let q;

function loadScore(){
    let highscore = parseInt(localStorage.getItem("highscore")) || 0;
    document.getElementById('high').innerText=highscore
}

function startGame(){
    document.getElementById('scr').innerText=0

    game=true
    isplayed=true
    document.getElementById('startmodal').style.visibility='hidden'
    q= setInterval(function(){
        x+=1
        y+=2
        document.getElementById('gamebody').scrollTo(x+30,0)
        document.getElementById('bb').style.top=y+"px" 
        
        if(y<=0||y>=615){
            gameOver()
         clearInterval(q)
        }
        
        by=y+80 
        bx=x+120
        if(ax){
            if((bx>bars[nextBars].xstart&&bx<bars[nextBars].xend)&&(by>bars[nextBars].ybottom || y<bars[nextBars].ytop)){
                gameOver()
                clearInterval(q)
            }
        }
       
        if(x>bars[nextBars].xend){
            nextBars++
            document.getElementById('scr').innerText=nextBars
            createNextBars()
        }
    },10)
}

function createNextBars(){

    let r=parseInt(Math.random()*300)
    console.log(r)
    let game=document.getElementById('game')
  
    let bbdy=document.createElement('div')
    bbdy.classList.add('barbody')
    bbdy.id='b'+createdBars

    let bar1=document.createElement('div')
    let bar2=document.createElement('div')

    bar1.classList.add('t1')
    bar2.classList.add('t2')

    b1h=r+100
    bar1.style.height=b1h+"px"

    b2h=100+(300-r)
    bar2.style.height=b2h+"px"
  

    bbdy.appendChild(bar1)
    bbdy.appendChild(bar2)
    game.appendChild(bbdy)
    

    let lastBar=createdBars-1
    let xstart=bars[lastBar].xend+300
    let xend=xstart+80
    let ytop=b1h
    let ybottom=b1h+200

    bars.push({xstart:xstart,xend:xend,ytop:ytop,ybottom:ybottom})
    createdBars++
    
}

document.getElementById('body').addEventListener('keydown',function(i){
    if(i.keyCode==49){
        ax=!ax
    }
    console.log('hi')
    if(i.keyCode==38&&game==true){
        y-=50
        document.getElementById('bb').style.top=y+"px" 
    }else if(i.keyCode==13&&game==false){
        isplayed?restartGame1():startGame()
    } 
    
})

document.getElementById('body').addEventListener('click',function(i){
    if(game==true){
        y-=50
        document.getElementById('bb').style.top=y+"px" 
    }
})

function restartGame(){
    x=20
    y=300
    nextBars=0
    document.getElementById('overmodal').style.visibility='hidden'

    startGame()
}

function restartGame1(){
    clearInterval(q)

    x=20
    y=300
    nextBars=0
    document.getElementById('overmodal').style.visibility='hidden'

    startGame()
}
 
function gameOver(){
    if(nextBars>highscore){
        highscore=nextBars
        localStorage.setItem("highscore", highscore);
        document.getElementById('high').innerText=highscore
    }
    game=false
    document.getElementById('overmodal').style.visibility='visible'
    
}