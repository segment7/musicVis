//Use class to handle the onscreen menu and mouse
//controls
class ControlsAndInput {
	constructor() {
		this.menuDisplayed = false;
		
		//playback button displayed in the top left of the screen
		this.playbackButton = new PlaybackButton();
		
		/* Start of my own code */
		//dropdown selector to choose different audio sources
		this.trackSelector = new TrackSelector(this.playbackButton);

		//visualisation selector
		this.visRadio = createRadio();
		this.visRadio.position(this.playbackButton.x+255, this.playbackButton.y);
		
		for(let i = 0; i < vis.visuals.length; i++){
			this.visRadio.option(vis.visuals[i].name);
		}

		this.visRadio.style('color', 'white');
		this.visRadio.style('font-size', '18px');
		this.visRadio.style('font-family', 'Arial');
		this.visRadio.selected(vis.selectedVisual.name);

		this.visRadio.changed(() => {
			vis.selectVisual(this.visRadio.value());
		});

		this.visRadio.hide();

		//menu display control
		this.menuButton = createButton("MENU");
		this.menuButton.style('font-weight', 'Bold');
		this.menuButton.position(this.playbackButton.x+200, this.playbackButton.y);

		this.menuButton.mousePressed(() => {
			this.menuDisplayed = !this.menuDisplayed;
	  
			if (this.menuDisplayed) {
			  this.visRadio.show();
			} else {
			  this.visRadio.hide();
			}
		});
	}
	/* End of my own code */

	//draws the playback button (radio draws itself)
	draw (){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(18);
		this.playbackButton.draw();
		pop();
	}
}


