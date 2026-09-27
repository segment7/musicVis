//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
/* Start of my own code */
//microphone input
var mic = null;
//prepared audio tracks in the assets folder
var audioTracks = ['1.mp3','2.mp3','Earth Tides.mp3','MXD19th.mp3'];

function preload(){
	//load the default track
	sound = loadSound('assets/' + audioTracks[0],sq,error);
}
/* End of my own code */

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);

	//instantiate the fft object
	fourier = new p5.FFT();
	//set the input to the default audio track
	fourier.setInput(sound);

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	/* Start of my own code */
	vis.add(new Noise());

	vis.selectVisual("noise");

	controls = new ControlsAndInput();
	/* End of my own code */
}

/* Start of my own code */
//handle switching between different audio sources
function handleAudioSourceChange(source, playbackButton){
	if (sound){
		//stop any currently playing sound
		sound.stop();
	}

	if (source === 'Microphone'){
		//switch to microphone input
		mic = new p5.AudioIn();
		mic.start();
		fourier.setInput(mic);
		playbackButton.setMicMode(true);
	}
	else{
		//switch to a sound file track
		if (mic){
			//if leaving microphone mode, turn off mic
			mic.stop();
			playbackButton.setMicMode(false);
		}
		//load the selected track
		sound = loadSound('assets/' + source, function(){
			fourier.setInput(sound);
		});
	}
}

function error(err){
	alert("error: "+err);
}
/* End of my own code */

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

/* Start of my own code */
function mousePressed() {
    controls.playbackButton.hitCheck();
}
function keyPressed() {
	if(controls.playbackButton.isMicMode){
		return false;
	}
	else if (keyCode === 32) {
		if (sound.isPlaying()) {
			sound.pause();
		} else {
			sound.loop();
		}
		controls.playbackButton.playing = !controls.playbackButton.playing;
		
		return false;
	}
}
/* End of my own code */

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
