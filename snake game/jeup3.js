
     var canvas;
	 var canvasWidth=900;
	 var canvasHeight=600;

	 var blockSize=30;
     var ctx;
     var delay=100;
	 var snakee;
	 var applee;

function jouer(){

 canvas= document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
		snakee=new Snake([[6,4],[5,4],[4,4]],"right");
		applee = new Apple([10,10]);
		refreshcanevas()
}
function refreshcanevas(){
ctx.clearRect(0,0,canvasWidth,canvasHeight);

snakee.draw();


if (snakee.isEatingApple(applee)){
                
                snakee.ateApple = true;
                do {
                    applee.setNewPosition(); 
                } while(applee.isOnSnake(snakee));
            }
			applee.draw();
			snakee.advance();

setTimeout(refreshcanevas,delay);


}

 function drawBlock(ctx, position){
        var x = position[0]*blockSize;
        var y = position[1]*blockSize;
        ctx.fillRect(x,y,blockSize,blockSize);
    }
    

    function Snake(body,direction){
        this.body = body;
        this.direction=direction;
        this.ateApple = false;
        this.draw = function(){
         
            ctx.fillStyle="#ff0000";
            for (var i=0 ; i < this.body.length ; i++){
                drawBlock(ctx,this.body[i]);
            }
           
        }; 
		 this.advance = function(){
           var nvx;
           var nvy;

            switch(this.direction){

                   case "right":{
                   nvx=this.body[0][0]+1;
		           nvy=this.body[0][1];

                   break;
				   }
                   case "left":{
                   nvx= this.body[0][0]-1;
		           nvy=this.body[0][1];
                   break;
				   }
				   case "up":{
                   nvx= this.body[0][0];
		           nvy=this.body[0][1]-1;
                   break;
				   }
				   case "down":{
                   nvx= this.body[0][0];
		           nvy=this.body[0][1]+1;
                   break;
				   }


			}


       this.body.unshift([nvx,nvy]);
           if (this.ateApple==false)
                this.body.pop();
            else
                this.ateApple = false;

        };
		


 this.setDirection = function(newDirection){
            var allowedDirections;
            switch(this.direction){
                case "left":
                case "right":{
                    allowedDirections=["up","down"];
                    break;
				}
                case "down":
                case "up":{
                    allowedDirections=["left","right"];
                    break;  
				}
            }
            if (allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };

this.isEatingApple = function(appleToEat){
            var head = this.body[0];
            if (head[0] == appleToEat.position[0] && head[1] == appleToEat.position[1])
                return true;
            else
                return false;
        };
        
    }

 function Apple(position){
        this.position = position;
        
        this.draw = function(){
         
          ctx.fillStyle = "#33cc33";
          ctx.beginPath();
          var radius = blockSize/2;
          var x = this.position[0]*blockSize + radius;
          var y = this.position[1]*blockSize + radius;
          ctx.arc(x, y, radius, 0, Math.PI*2, true);
          ctx.fill();
        
        };
        
       this.setNewPosition = function(){
            var newX = Math.ceil(Math.random()*(29));
            var newY = Math.ceil(Math.random()*(19));
            this.position = [newX,newY];
        }; 
        
        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;
            for (var i=0 ; i < snakeToCheck.body.length ; i++){
                if(this.position[0] == snakeToCheck.body[i][0] && this.position[1] == snakeToCheck.body[i][1]){
                    isOnSnake = true;     
                }
            }
            return isOnSnake;
        };  

    }











	// fleches :

	document.onkeydown=function(e){
    var key = e.keyCode;
        var newDirection;
        switch(key){
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            
        }
        snakee.setDirection(newDirection);




	}