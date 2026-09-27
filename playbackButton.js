//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;
	/* Start of my own code */
	//to distinguish from playback mode
	this.isMicMode = false;
	/* End of my own code */

	this.draw = function(){
		/* Start of my own code */
		//empty icon when using mic input
		if(this.isMicMode){
		}
		/* End of my own code */
		else if(this.playing){
			//pause icon
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		/* Start of my own code */
		//disable playback button when in mic mode
		if(this.isMicMode){
			return false;
		}
		/* End of my own code */
		else if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			return false;
	};

	/* Start of my own code */
	//to switch between playback mode and microphone mode
	this.setMicMode = function(isMicMode){
		this.isMicMode = isMicMode;
	};
	/* End of my own code */
}