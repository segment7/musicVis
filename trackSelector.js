/* Start of my own code */
//dropdown selector to choose different audio sources
function TrackSelector(playbackButton){

	this.selector = createSelect();

	//position the selector next to the playback button
	this.selector.position(playbackButton.x + playbackButton.width + 10, playbackButton.y);
	this.selector.style('font-size', '16px');

	//add options for each available source
	for (var i = 0; i < audioTracks.length; i++){
		this.selector.option(audioTracks[i]);
	}

	//the last option is microphone source
	this.selector.option('Microphone');

	//update the audio input and playback button display onchange of selector
	this.selector.changed(() => {
		var selected = this.selector.value();
		handleAudioSourceChange(selected, playbackButton);
		playbackButton.playing = false;  //reset playback state
	});

	//default to the first track
	this.selector.selected(audioTracks[0]);
}
/* End of my own code */

