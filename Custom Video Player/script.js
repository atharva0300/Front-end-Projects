const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play and Pause Video
function toggleVideoStatus() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

// update the play and pause icon
function updatePlayIcon() {
	if (video.paused) {
		play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
	} else {
		play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
	}
}

// Update the progress and timestamp
function updateProgress() {
	progress.value = (video.currentTime / video.duration) * 100;
	console.log(video.currentTime);

	// Get minutes
	let mins = Math.floor(video.currentTime / 60);
	if (mins < 10) {
		mins = '0' + String(mins);
	}
	// Get seconds
	let seconds = Math.floor(video.currentTime % 60);
	if (seconds < 10) {
		seconds = '0' + String(seconds);
	}
	let result = mins + ':' + seconds;
	timestamp.innerHTML = result;
}

// set vidoe time to progress
function setVideoProgress() {
	console.log('Video curret time : ', video.currentTime);
	video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
	video.currentTime = 0;
	video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
