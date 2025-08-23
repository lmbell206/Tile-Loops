// <!-- Tile Loops - A tile-based sequencer and synthesizer platform
// Copyright (C) 2020  Landon Micah Bell
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>. -->


// Global Audio Context and Nodes - Defined outside tileSequencer for guaranteed availability

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create a compressor node
var compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.value = -30;
compressor.knee.value = 30;
compressor.ratio.value = 4;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.50;

var masterFilter = audioCtx.createBiquadFilter();
masterFilter.frequency.value = 2000;
masterFilter.type = 'lowpass';
masterFilter.gain.value = masterFilter.frequency.value / 5000; // Use .value for gain
masterFilter.connect(compressor);

// Create a global StereoPannerNode
var pannerNode = audioCtx.createStereoPanner();
compressor.connect(pannerNode); // Connect compressor to panner
pannerNode.connect(audioCtx.destination);

// Global volume variable
var volume = 2.5; // Initial volume - MOVED TO GLOBAL SCOPE


// Define global oscillators, gain nodes, and filters for the patches
// These are reused by the playSoundLibrary functions
var oscillator1 = audioCtx.createOscillator();
var gainNode1 = audioCtx.createGain();
var biquadFilter1 = audioCtx.createBiquadFilter();
oscillator1.connect(biquadFilter1);
oscillator1.start(0); // Start immediately, gain will control sound
biquadFilter1.connect(gainNode1);
gainNode1.connect(masterFilter);
gainNode1.gain.value = 0; // Initially silent

var oscillator2 = audioCtx.createOscillator();
var gainNode2 = audioCtx.createGain();
var biquadFilter2 = audioCtx.createBiquadFilter();
oscillator2.connect(biquadFilter2);
oscillator2.start(0);
biquadFilter2.connect(gainNode2);
gainNode2.connect(masterFilter);
gainNode2.gain.value = 0;

var oscillator3 = audioCtx.createOscillator();
// var oscillator3b = audioCtx.createOscillator(); // Second oscillator for patch 3
var gainNode3 = audioCtx.createGain();
// var gainNode3b = audioCtx.createGain(); // Second gain node for patch 3
var biquadFilter3 = audioCtx.createBiquadFilter();
// var biquadFilter3b = audioCtx.createBiquadFilter(); // Second filter for patch 3
oscillator3.connect(biquadFilter3);
// oscillator3b.connect(biquadFilter3b);
oscillator3.start(0);
// oscillator3b.start(0);
biquadFilter3.connect(gainNode3);
// biquadFilter3.connect(gainNode3b); // Patch 3 connects one filter to two gain nodes
// biquadFilter3b.connect(gainNode3b); // Patch 3 also connects second filter to second gain node
gainNode3.connect(masterFilter);
// gainNode3b.connect(masterFilter);
gainNode3.gain.value = 0;
// gainNode3b.gain.value = 0;

var oscillator4 = audioCtx.createOscillator();
var gainNode4 = audioCtx.createGain();
var biquadFilter4 = audioCtx.createBiquadFilter();
oscillator4.connect(biquadFilter4);
oscillator4.start(0);
biquadFilter4.connect(gainNode4);
gainNode4.connect(masterFilter);
gainNode4.gain.value = 0;

var oscillator5 = audioCtx.createOscillator();
var gainNode5 = audioCtx.createGain();
var biquadFilter5 = audioCtx.createBiquadFilter();
oscillator5.connect(biquadFilter5);
oscillator5.start(0);
biquadFilter5.connect(gainNode5);
gainNode5.connect(masterFilter);
gainNode5.gain.value = 0;

var oscillator6 = audioCtx.createOscillator();
var gainNode6 = audioCtx.createGain();
var biquadFilter6 = audioCtx.createBiquadFilter();
oscillator6.connect(biquadFilter6);
oscillator6.start(0);
biquadFilter6.connect(gainNode6);
gainNode6.connect(masterFilter);
gainNode6.gain.value = 0;

var oscillator7 = audioCtx.createOscillator();
var gainNode7 = audioCtx.createGain();
var biquadFilter7 = audioCtx.createBiquadFilter();
oscillator7.connect(biquadFilter7);
oscillator7.start(0);
biquadFilter7.connect(gainNode7);
gainNode7.connect(masterFilter);
gainNode7.gain.value = 0;

// playSoundLibrary is also moved to global scope
var playSoundLibrary = {
	1:function(freq,duration){
		// set floor for frequency
		if (freq<190){freq=190}
		oscillator1.frequency.value = freq/5 + 100;
		biquadFilter1.frequency.value = freq/2;
		gainNode1.gain.setTargetAtTime(.05*volume, audioCtx.currentTime, .5);
		gainNode1.gain.setTargetAtTime(0, audioCtx.currentTime + 0.1, duration/22800);
		biquadFilter1.frequency.setTargetAtTime(0, audioCtx.currentTime, duration/100 + .2);
	},

	2:function(freq,duration){
		if (freq<56){freq=56}
		biquadFilter2.frequency.value = freq*1.5;
		oscillator2.frequency.value = freq;
		gainNode2.gain.setTargetAtTime(.5*volume, audioCtx.currentTime, .5);
		gainNode2.gain.setTargetAtTime(0, audioCtx.currentTime + 0.01, duration/7900);
		biquadFilter2.frequency.setTargetAtTime(freq, audioCtx.currentTime, duration/200);
	},

	// 3:function(freq,duration){
	// 	if (freq<56){freq=56}
	// 	biquadFilter3.frequency.value = freq/2;
	// 	oscillator3.frequency.value = freq;
	// 	gainNode3.gain.value = 0;
	// 	gainNode3.gain.setTargetAtTime(0.05*volume, audioCtx.currentTime,.5);
	// 	gainNode3.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, duration/10900);
	// 	biquadFilter3b.frequency.value = freq/4;
	// 	oscillator3b.frequency.value = freq/2.5;
	// 	gainNode3b.gain.value = 0;
	// 	gainNode3b.gain.setTargetAtTime(0.1*volume, audioCtx.currentTime,.1);
	// 	gainNode3b.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, duration/30900);
	// },
	3: function(freq, duration) {
	      const now = audioCtx.currentTime;
	      // Ensure minimum frequency
	      if (freq < 56) { freq = 56; } // A common floor, adjust as needed

	      // Oscillator settings
	      oscillator3.type = 'square';
	      oscillator3.frequency.value = freq * 0.700;
	      oscillator3.detune.value = -1.0; // Apply detune

	      // Filter settings
	      biquadFilter3.type = 'highpass';
	      biquadFilter3.frequency.value = freq * 0.200;
	      biquadFilter3.Q.value = 1.400;
	      biquadFilter3.gain.value = 0.0; // Apply filter gain

	      // Gain envelope (ADSR)
	      gainNode3.gain.cancelScheduledValues(now);
	      gainNode3.gain.setValueAtTime(0, now); // Start from 0
	      gainNode3.gain.linearRampToValueAtTime(0.020 * volume, now + 0.150);
	      gainNode3.gain.linearRampToValueAtTime(0.400 * volume, now + 0.150 + 0.100);
	      // Hold sustain for the duration of the note, then release
	      gainNode3.gain.exponentialRampToValueAtTime(0.0001, now + (duration / 1000) + 0.140);

	      // Stereo Pan
	      pannerNode.pan.value = 0.0;

	},

	4:function(freq,duration){
		if (freq<44){freq=44}
		gainNode4.gain.setTargetAtTime(.05*volume,audioCtx.currentTime,.05);
		oscillator4.frequency.value = freq/2;
		biquadFilter4.frequency.value = freq*2;
		oscillator4.frequency.setTargetAtTime(freq/2.5, audioCtx.currentTime, duration/20000);
		biquadFilter4.frequency.setTargetAtTime(freq,audioCtx.currentTime+.1, duration/30000);
		gainNode4.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, duration/30000);
	},
	5:function(freq,duration){
		if (freq<112){freq=112}
		var filtervalue = freq/2;

		oscillator5.type = 'square';
		oscillator5.frequency.value = freq/2;

		//set filter values
		biquadFilter5.type = "bandpass";
		biquadFilter5.frequency.value = filtervalue;
		gainNode5.gain.setTargetAtTime(.01 * 300 / filtervalue *volume, audioCtx.currentTime, .005);

		//set parameters for envelopes
		gainNode5.gain.setTargetAtTime(0, audioCtx.currentTime + 0.1, duration/22800);
		biquadFilter5.frequency.setTargetAtTime(freq, audioCtx.currentTime, duration/100 + .2);

	},
	6:function(freq,duration){
		if (freq<56){freq=56}
		oscillator6.type = 'triangle'; // Changed from sine in utility, keeping original here
		oscillator6.frequency.value = freq/2;
		gainNode6.gain.setTargetAtTime(.1*volume, audioCtx.currentTime, .1);
		gainNode6.gain.setTargetAtTime(0, audioCtx.currentTime + duration/4800, duration/14800);
	},
	7:function(freq,duration){
		if (freq<56){freq=56}
		oscillator7.frequency.setTargetAtTime(freq/2,audioCtx.currentTime, .1);
		gainNode7.gain.setTargetAtTime(.01*volume,audioCtx.currentTime, duration/15000);;
		gainNode7.gain.setTargetAtTime(0,audioCtx.currentTime+.5, duration/15000);
	},
  8:function(freq,duration){
    if (freq<56){freq=56}
    oscillator7.frequency.setTargetAtTime(freq/2,audioCtx.currentTime, .15);
    gainNode7.gain.setTargetAtTime(.01*volume,audioCtx.currentTime, duration/15000);;
    gainNode7.gain.setTargetAtTime(0,audioCtx.currentTime+.5, duration/18000);
    biquadFilter2.frequency.value = freq*1.5;
		oscillator2.frequency.value = freq;
		gainNode2.gain.setTargetAtTime(.5*volume, audioCtx.currentTime, .5);
		gainNode2.gain.setTargetAtTime(0, audioCtx.currentTime + 0.01, duration/1700);
		biquadFilter2.frequency.setTargetAtTime(freq, audioCtx.currentTime, duration/290);
  }
};


//this needs to be in the html file
//<div id = 'gamecontainer'></div>
// there also need the appropriate button ids for the event listeners
tileSequencer = function(){
//audio rendering is now global


//this should create the post function needed to update the loop library stored on the server
// window.post = function(url, data) {
//   return fetch(url, {method: "POST", body: JSON.stringify(data)});
// }

// Compressor and Master Filter are now global


//visual rendering
var screenwidth = screen.availWidth - 15;
var screenheight = screen.availHeight - 15;
var synthwindow = document.getElementById('gamecontainer');
synthwindow.innerHTML = '<canvas id="game_screen" width="' + screenwidth + '" height="' + screenheight + '" style="position:absolute; border:0px solid #000000; z-index:-1"></canvas>';
var c = document.getElementById("game_screen");
var ctx = c.getContext("2d");

var clickcount = 0; // This variable will no longer be used for drawing logic, but might be elsewhere.
                    // Keeping it for now, but its role in drawing is removed.

var rectangle = [];
// post('./data.json', rectangle);
var rectangleghost = [];
var building = false; // Flag for active drawing (ghost rectangle visible)
var rectanglehue = 0;
var pointa = {'x':0,'y':0}; // Start point of current drawing rectangle
var pointb = {'x':0,'y':0}; // End point of current drawing rectangle
var backgroundhue = 107;

var globalmodulation = 501;
var localmodulation = [];
var globalmodulationdirection = 'up';
var modulationrate = 12;
var modulationmax = 1660;
var modulationmin = 330;
var soundpatch = 1;
var soundpatchcount = 8;
var playstatus = 'paused';
var temporeference = 32;
let sequencelocation = 0;


var modulationInterval;
var sequenceInterval;
var buttonInterval;

// Global flags and variables for new mouse/touch drawing logic
var isDrawing = false; // True when a mouse button is down or touch is active for drawing
var initialInteractionX, initialInteractionY; // Stores the starting X, Y of the mouse/touch down

// Define a threshold for distinguishing a click/tap from a drag
const INTERACTION_THRESHOLD = 10; // Pixels


// Find the right method, call on correct element -- I used this code snippet to cover different browser's full screen modes
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

iosaudio = function(){
	var buffer = audioCtx.createBuffer(1, 1, 22050);
	var source = audioCtx.createBufferSource();
	source.buffer = buffer;
	source.connect(audioCtx.destination);
	source.start();
	source.stop();
}

// Cache DOM elements for performance
const infoElement = document.getElementById('info');
const filterUpButton = document.getElementById('filter_up_button');
const filterDownButton = document.getElementById('filter_down_button');
const volumeUpButton = document.getElementById('volume_up_button');
const volumeDownButton = document.getElementById('volume_down_button');
const soundToggleButton = document.getElementById('sound_toggle_button');
const sequenceSwipeButton = document.getElementById('sequence_swipe_button');
const tempoUpButton = document.getElementById('tempo_up_button');
const tempoDownButton = document.getElementById('tempo_down_button');
const generateButton = document.getElementById('generate_button');
const clearButton = document.getElementById('clear_button');
const midiButton = document.getElementById('midi_button');

// Helper function to add both touch and mouse listeners
function addTouchAndMouseListeners(element, touchstartFn, touchendFn, mousedownFn, mouseupFn) {
    if (element) {
        element.addEventListener('touchstart', touchstartFn);
        element.addEventListener('touchend', touchendFn);
        element.addEventListener('mousedown', mousedownFn);
        element.addEventListener('mouseup', mouseupFn);
    }
}

// Filter controls
addTouchAndMouseListeners(
    filterDownButton,
    function(e) {
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (masterFilter.frequency.value >= 24) {
                masterFilter.frequency.value = masterFilter.frequency.value - 30;
                masterFilter.gain.value = masterFilter.frequency.value / 5000; // Use .value for gain
                infoElement.innerHTML = "filter: " + masterFilter.frequency.value;
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); },
    function(e) { // mousedown
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (masterFilter.frequency.value >= 24) {
                masterFilter.frequency.value = masterFilter.frequency.value - 30;
                masterFilter.gain.value = masterFilter.frequency.value / 5000;
                infoElement.innerHTML = "filter: " + masterFilter.frequency.value;
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); }
);

addTouchAndMouseListeners(
    filterUpButton,
    function(e) {
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (masterFilter.frequency.value <= 12000) {
                masterFilter.frequency.value = masterFilter.frequency.value + 30;
                masterFilter.gain.value = masterFilter.frequency.value / 5000;
                infoElement.innerHTML = "filter: " + masterFilter.frequency.value;
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); },
    function(e) { // mousedown
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (masterFilter.frequency.value <= 12000) {
                masterFilter.frequency.value = masterFilter.frequency.value + 30;
                masterFilter.gain.value = masterFilter.frequency.value / 5000;
                infoElement.innerHTML = "filter: " + masterFilter.frequency.value;
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); }
);

// Volume controls
addTouchAndMouseListeners(
    volumeUpButton,
    function(e) {
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (volume <= 10) {
                volume = volume + .05;
                infoElement.innerHTML = "volume: " + volume.toFixed(2); // Format for display
            }
        }, 75);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); },
    function(e) { // mousedown
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (volume <= 10) {
                volume = volume + .05;
                infoElement.innerHTML = "volume: " + volume.toFixed(2);
            }
        }, 75);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); }
);

addTouchAndMouseListeners(
    volumeDownButton,
    function(e) {
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (volume >= 0) {
                volume = volume - .05;
                infoElement.innerHTML = "volume: " + volume.toFixed(2);
            }
        }, 75);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); },
    function(e) { // mousedown
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function() {
            if (volume >= 0) {
                volume = volume - .05;
                infoElement.innerHTML = "volume: " + volume.toFixed(2);
            }
        }, 75);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); }
);

// Sound patch selection
soundToggleButton.addEventListener('touchstart', function(e){
	e.preventDefault();
	if (soundpatch < soundpatchcount) {
		soundpatch = soundpatch + 1;
	} else if (soundpatch == soundpatchcount) {
		soundpatch = 1;
	}
	backgroundhue = (360/soundpatchcount) * soundpatch;
	rectanglehue = (360/soundpatchcount) * soundpatch;
	infoElement.innerHTML = 'sound patch: ' + soundpatch;
});
soundToggleButton.addEventListener('mousedown', function(e){
	e.preventDefault();
	if (soundpatch < soundpatchcount) {
		soundpatch = soundpatch + 1;
	} else if (soundpatch == soundpatchcount) {
		soundpatch = 1;
	}
	backgroundhue = (360/soundpatchcount) * soundpatch;
	rectanglehue = (360/soundpatchcount) * soundpatch;
	infoElement.innerHTML = 'sound patch: ' + soundpatch;
});


// Play button
sequenceSwipeButton.addEventListener('touchstart',function(e){
	e.preventDefault();
	if (playstatus == 'paused') {
		playstatus = 'playing';
		iosaudio();
		launchIntoFullscreen(document.documentElement);
		modulationinit();
		sequenceSwipe();
	} else {
		playstatus = 'paused';
		clearInterval(sequenceInterval);
		clearInterval(buttonInterval);
		clearInterval(modulationInterval);
	}
});
sequenceSwipeButton.addEventListener('mousedown',function(e){
	e.preventDefault();
	if (playstatus == 'paused') {
		playstatus = 'playing';
		iosaudio();
		launchIntoFullscreen(document.documentElement);
		modulationinit();
		sequenceSwipe();
	} else {
		playstatus = 'paused';
		clearInterval(sequenceInterval);
		clearInterval(buttonInterval);
		clearInterval(modulationInterval);
	}
});

// Tempo change
addTouchAndMouseListeners(
    tempoUpButton,
    function(e) {
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function(){
            if (temporeference > 15) {
                temporeference = temporeference - .2;
                infoElement.innerHTML = 'tempo:' + Math.floor(4000/temporeference);
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); },
    function(e) { // mousedown
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function(){
            if (temporeference > 15) {
                temporeference = temporeference - .2;
                infoElement.innerHTML = 'tempo:' + Math.floor(4000/temporeference);
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); }
);

addTouchAndMouseListeners(
    tempoDownButton,
    function(e) {
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function(){
            if (temporeference < 64) {
                temporeference = temporeference + .2;
                infoElement.innerHTML = 'tempo:' + Math.floor(4000/temporeference);
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); },
    function(e) { // mousedown
        e.preventDefault();
        clearInterval(buttonInterval);
        buttonInterval = setInterval(function(){
            if (temporeference < 64) {
                temporeference = temporeference + .2;
                infoElement.innerHTML = 'tempo:' + Math.floor(4000/temporeference);
            }
        }, 30);
    },
    function(e) { e.preventDefault(); clearInterval(buttonInterval); }
);


generate_button.addEventListener('touchstart', function(e){
	generate();
});

generate_button.addEventListener('mousedown', function(e){
	generate();
});

clear_button.addEventListener('touchstart', function(e){
	clear();
});
clear_button.addEventListener('mousedown', function(e){
	clear();
});
midi_button.addEventListener('mousedown', function(e){
	midiSync();
});
midi_button.addEventListener('touchstart', function(e){
	midiSync();
});

// --- NEW MOUSE AND TOUCH DRAWING/POPPING LOGIC ---

// Mouse Down (Start Drawing or Tap)
c.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isDrawing = true;
    initialInteractionX = e.clientX;
    initialInteractionY = e.clientY;

    pointa.x = e.clientX;
    pointa.y = e.clientY;
    pointb.x = e.clientX; // Initialize pointb to pointa for initial ghost drawing
    pointb.y = e.clientY;

    building = true; // Set building flag for drawit() to show ghost rectangle

    // Add mousemove listener to document for robust dragging
    document.addEventListener('mousemove', onMouseMove);
});

// Mouse Move (Update Drawing)
function onMouseMove(e) {
    if (!isDrawing) return; // Only update if drawing is active
    e.preventDefault();
    pointb.x = e.clientX;
    pointb.y = e.clientY;
    // drawit() is called in the main loop, so it will pick up these changes
}

// Mouse Up (End Drawing or Tap)
document.addEventListener('mouseup', function(e) {
    if (!isDrawing) return; // Only act if drawing was active
    e.preventDefault();
    isDrawing = false;

    // Remove mousemove listener
    document.removeEventListener('mousemove', onMouseMove);

    pointb.x = e.clientX;
    pointb.y = e.clientY;

    // Calculate distance to determine if it was a click or a drag
    const distance = Math.sqrt(
        Math.pow(pointb.x - initialInteractionX, 2) +
        Math.pow(pointb.y - initialInteractionY, 2)
    );

    if (distance < INTERACTION_THRESHOLD) {
        // It was a click/tap (small movement)
        handleTap(pointa.x, pointa.y); // Use pointa as the tap location
    } else {
        // It was a drag, build the rectangle
        buildit();
    }

    // Reset drawing points
    pointa.x = 0;
    pointa.y = 0;
    pointb.x = 0;
    pointb.y = 0;
    building = false; // Ensure building flag is reset
    initialInteractionX = undefined; // Reset initial interaction for next event
    initialInteractionY = undefined;
});


// Touch controls for drawing and popping
c.addEventListener('touchstart', function(e){
    e.preventDefault();
    infoElement.innerHTML = "";

    if (e.touches.length === 1) {
        // Single touch: potential tap for popping or single-finger drag for drawing
        initialInteractionX = e.touches[0].pageX;
        initialInteractionY = e.touches[0].pageY;
        pointa.x = e.touches[0].pageX;
        pointa.y = e.touches[0].pageY;
        pointb.x = e.touches[0].pageX;
        pointb.y = e.touches[0].pageY;
        isDrawing = true; // Set drawing flag
        building = true; // Set building flag for drawit() to show ghost rectangle
    } else if (e.touches.length >= 2) {
        // Two or more fingers: definitely drawing (multi-touch drag)
        building = true;
        pointa.x = e.touches[0].pageX;
        pointa.y = e.touches[0].pageY;
        pointb.x = e.touches[1].pageX;
        pointb.y = e.touches[1].pageY;
        isDrawing = true; // Set drawing flag
    }
    // Add touchmove listener to document for robust dragging
    document.addEventListener('touchmove', onTouchMove);
});

// Touch Move (Update Drawing)
function onTouchMove(e) {
    if (!isDrawing) return; // Only update if drawing is active
    e.preventDefault();
    if (e.touches.length === 1) {
        pointb.x = e.touches[0].pageX;
        pointb.y = e.touches[0].pageY;
    } else if (e.touches.length >= 2) {
        pointa.x = e.touches[0].pageX;
        pointa.y = e.touches[0].pageY;
        pointb.x = e.touches[1].pageX;
        pointb.y = e.touches[1].pageY;
    }
    // drawit() is called in the main loop, so it will pick up these changes
}

// Touch End (End Drawing or Tap)
document.addEventListener('touchend', function(e){
    if (!isDrawing) return; // Only act if drawing was active
    e.preventDefault();
    isDrawing = false; // Reset drawing flag

    // Remove touchmove listener
    document.removeEventListener('touchmove', onTouchMove);

    // Check if any touch points remain (e.touches.length)
    // If e.touches.length is 0, it means all fingers have lifted.
    // If e.touches.length > 0, it means some fingers lifted, but others remain.
    // We primarily care about the point that *just* lifted (from e.changedTouches).

    if (e.changedTouches.length > 0) {
        const lastTouchX = e.changedTouches[0].pageX;
        const lastTouchY = e.changedTouches[0].pageY;

        // If no touches remain after this touchend, it means the interaction is fully over.
        if (e.touches.length === 0) {
            const distance = Math.sqrt(
                Math.pow(lastTouchX - initialInteractionX, 2) +
                Math.pow(lastTouchY - initialInteractionY, 2)
            );

            if (distance < INTERACTION_THRESHOLD) {
                // It was a tap (small movement)
                handleTap(lastTouchX, lastTouchY);
            } else {
                // It was a drag (single or multi-touch), build the rectangle
                // For multi-touch, pointa and pointb would have been updated during touchmove
                // For single-touch drag, pointa is start, pointb is end.
                pointb.x = lastTouchX; // Ensure pointb is the final release point for single touch
                pointb.y = lastTouchY;
                buildit();
            }
        } else if (building) { // If multi-touch drawing was active and some fingers remain
            // Continue drawing with remaining touches if needed, or finalize.
            // For simplicity, if `building` was true, we assume it was a drawing action
            // that is now ending for the released finger(s).
            // The `buildit()` call here would finalize based on the last `pointa`/`pointb`
            // set by `onTouchMove` before this `touchend`.
            buildit(); // Finalize the rectangle
        }
    }

    // Reset drawing points and flags
    pointa.x = 0;
    pointa.y = 0;
    pointb.x = 0;
    pointb.y = 0;
    building = false; // Ensure building flag is reset
    initialInteractionX = undefined; // Reset initial interaction for next event
    initialInteractionY = undefined;
});


// --- END NEW MOUSE AND TOUCH DRAWING/POPPING LOGIC ---


// Create the tile
drawit = function() {
	ctx.fillStyle = 'hsl('+ backgroundhue + ', 100%, 50%)';
	ctx.fillRect(0,0,screenwidth,screenheight);
	ctx.beginPath();
	ctx.lineWidth = '10px';
	ctx.strokeStyle = 'black';
	for (var i = 0; i <= 4; i = i + 1) {
		ctx.moveTo(screenwidth/4 * i,0);
		ctx.lineTo(screenwidth/4*i,screenheight)
	}
	ctx.stroke();
	for (var i = 0; i < rectangle.length; i = i + 1){
		var rectangleid = i;
		ctx.fillStyle = 'hsl('+ rectangle[rectangleid].color + ', 50%, 50%)';
		ctx.fillRect(rectangle[rectangleid].x,rectangle[rectangleid].y,rectangle[rectangleid].l, rectangle[rectangleid].h);
	}
    // Only draw the ghost rectangle if building is true (i.e., mouse/touch is down and dragging)
    if (building) {
        ctx.fillStyle = 'hsla('+ rectanglehue + ', 50%, 50%, 0.6)'; // Semi-transparent for ghost
        // Ensure that pointa and pointb are ordered correctly for drawing fillRect
        const drawX = Math.min(pointa.x, pointb.x);
        const drawY = Math.min(pointa.y, pointb.y);
        const drawWidth = Math.abs(pointb.x - pointa.x);
        const drawHeight = Math.abs(pointb.y - pointa.y);

        ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
        ctx.strokeStyle ='black';
        ctx.strokeRect(drawX, drawY, drawWidth, drawHeight); // Draw stroke for visibility
    }
}
//this function iteratively changes the background hue and slowly shrinks tiles that have been popped.
//also checks for if a tile has fully disappeared and removes it from the rectangle list if so
animateit = function() {
	rectanglehue = rectanglehue + 3;
	backgroundhue = backgroundhue + rectangle.length*.1;
	if (backgroundhue>360){backgroundhue = 0;}
	for (var i = 0;i<rectangle.length;i++){
		if (rectangle[i].fading){
			rectangle[i].x = rectangle[i].x + 7;
			rectangle[i].y = rectangle[i].y + 7;
			rectangle[i].l = rectangle[i].l - 15;
			rectangle[i].h = rectangle[i].h - 15;
		}
		if (rectangle[i].l <= 0 && rectangle[i].h <= 0) {
			rectangle.splice(i,1);
		}
	}
}

//build the tile that has been drawn and store it in the rectangle array
buildit = function() {
    // Normalize points before building the rectangle
    const startX = Math.min(pointa.x, pointb.x);
    const startY = Math.min(pointa.y, pointb.y);
    const width = Math.abs(pointb.x - pointa.x);
    const height = Math.abs(pointb.y - pointa.y);

    // Only build if the rectangle has a significant size
    if (width < INTERACTION_THRESHOLD || height < INTERACTION_THRESHOLD) {
        // It was likely just a click or a very small drag, don't build a rectangle
        // This acts as a secondary filter for "clicks" that might have slipped past the initial threshold
        return;
    }

	var rectangleid = rectangle.length;

	rectangle[rectangleid] = {};
	rectangle[rectangleid].x = startX;
	rectangle[rectangleid].y = startY;
	rectangle[rectangleid].l = width;
	rectangle[rectangleid].h = height;
	rectangle[rectangleid].color = (360/soundpatchcount) * soundpatch; // Use soundpatch for color
	rectangle[rectangleid].fading = false;
	rectangle[rectangleid].played = false;
	rectangle[rectangleid].sound = soundpatch;

//this keeps information on rectangles that are fading, they get drawn each interval but do not generate sound.
    // When building a new rectangle, it should be added to rectangleghost as a fresh, non-fading tile.
    // The previous logic for rectangleghost was a bit ambiguous. Let's ensure it's a true copy.
	rectangleghost[rectangleid] = {};
	rectangleghost[rectangleid].x = startX;
	rectangleghost[rectangleid].y = startY;
	rectangleghost[rectangleid].l = width;
	rectangleghost[rectangleid].h = height;
	rectangleghost[rectangleid].color = (360/soundpatchcount) * soundpatch; // Use soundpatch for color
	rectangleghost[rectangleid].fading = false;
	rectangleghost[rectangleid].played = false;
	rectangleghost[rectangleid].sound = soundpatch;

	pointa.x = 0;
	pointa.y = 0;
	pointb.x = 0;
	pointb.y = 0;
	building = false;
}

//this checks to see if a tile has been activated by the current position of the play bar during the current interval
handleTap = function(x,y) {
	let hitstatus = false;

    // Iterate backward to safely remove elements and break on first hit
    for (let i = rectangle.length - 1; i >= 0; i--) {
        let rect = rectangle[i];

        // Skip if the rectangle is already fading
        if (rect.fading) {
            continue;
        }

        // Normalize rectangle coordinates to always have min/max
        const rectMinX = Math.min(rect.x, rect.x + rect.l);
        const rectMaxX = Math.max(rect.x, rect.x + rect.l);
        const rectMinY = Math.min(rect.y, rect.y + rect.h);
        const rectMaxY = Math.max(rect.y, rect.y + rect.h);

        // Check for collision using normalized coordinates
        if (x >= rectMinX && x <= rectMaxX && y >= rectMinY && y <= rectMaxY) {
            // Find the corresponding rectangle in rectangleghost by its properties, not just index
            // This is safer because rectangleghost might have been spliced differently
            const ghostIndex = rectangleghost.findIndex(ghostRect =>
                ghostRect.x === rect.x &&
                ghostRect.y === rect.y &&
                ghostRect.l === rect.l &&
                ghostRect.h === rect.h &&
                ghostRect.color === rect.color &&
                ghostRect.sound === rect.sound
            );

            if (ghostIndex !== -1) {
                rectangleghost.splice(ghostIndex, 1); // Remove from rectangleghost
            }
            rectangle[i].fading = true; // Mark the original rectangle as fading
            hitstatus = true; // Indicate a hit occurred
            break; // Stop after the first hit
        }
    }
	return hitstatus;
}

//this plays the appropriate sound
handleTapSequence = function(sequencelocation) {
	var x = sequencelocation;
	for (var i = 0;i<rectangle.length;i++){
		for (var j = 0; j < screenwidth/64; j = j+1){
			if (x + j > rectangle[i].x && rectangle[i].l >= 0 && rectangle[i].played == false && rectangle[i].fading == false) {
				var finalpitch = 4000 - Math.abs(rectangle[i].h * 10);
				playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10/(screenheight/768)), Math.abs(rectangle[i].l *10/(screenwidth/1366)));
				rectangle[i].played = true;
				ctx.fillStyle = 'pink';
				ctx.fillRect(sequencelocation,0,15,screenheight);
				break;
			}
			if (rectangle[i].x + rectangle[i].l <= x + j && rectangle[i].l <=0 && rectangle[i].played == false && rectangle[i].fading == false){
			var finalpitch = 4000 - Math.abs(rectangle[i].h * 10)
				playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10/(screenheight/768)), Math.abs(rectangle[i].l *10/(screenwidth/1366)));
				rectangle[i].played = true;
				ctx.fillStyle = 'pink';
				ctx.fillRect(sequencelocation,0,15,screenheight);
				break;
			}
		}
	}
}

//this moves the current location on the sequence
sequenceSwipe = function() {
	clearInterval(sequenceInterval);
    // When starting a new sequence, 'rectangle' should be populated from 'rectangleghost'
    // which holds the active, non-fading tiles.
    // Clear 'rectangle' and deep copy from 'rectangleghost'.
    rectangle = [];
    for (let i = 0; i < rectangleghost.length; i++) {
        // Deep copy the object to ensure independence
        rectangle.push(JSON.parse(JSON.stringify(rectangleghost[i])));
        rectangle[i].played = false; // Reset played status for new sequence
    }


	sequencelocation = 0;
	globalmodulation = 0;
	sequenceInterval = setInterval(function(){
		ctx.fillStyle = 'grey';
		ctx.fillRect(sequencelocation,0,15,screenheight);
		if (sequencelocation > screenwidth){
			sequenceSwipe();
			sequencelocation = 0;
		}
		handleTapSequence(sequencelocation);
		sequencelocation = sequencelocation + screenwidth/96;
	}, temporeference);
}

midiSwipe = function() {
	ctx.fillStyle = 'grey';
	ctx.fillRect(sequencelocation,0,15,screenheight);
	//wondering if i should use >= instead,  may need to adjust if drift occurs
	if (sequencelocation >= screenwidth){
	//	sequenceSwipe();
		sequencelocation = 0;
		rectangle = [];
		for (let i = 0; i < rectangleghost.length; i++) {
				// Deep copy the object to ensure independence
				rectangle.push(JSON.parse(JSON.stringify(rectangleghost[i])));
				rectangle[i].played = false; // Reset played status for new sequence
		}
	}
	handleTapSequence(sequencelocation);
	sequencelocation = sequencelocation + screenwidth/96;
}

function randomNumber(min_range, max_range) {
	return Math.floor((Math.random() * max_range) + min_range);
}

//this starts midi clock midiSync
midiSync = function() {
	audioCtx.resume();
	navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
	function onMIDISuccess(midiAccess) {
		for (var input of midiAccess.inputs.values()) {
			input.onmidimessage = onMIDIMessage;
		}
	}

	function onMIDIFailure() {
		console.log('could not access midi device')
	}

	function onMIDIMessage(event) {
		const [command, note, velocity] = event.data;
		const receivedTime = event.receivedTime;

//midi clock
		if (command === 0xF8) {
			midiSwipe();
		}

		// MIDI Start message
	  if (command === 0xFA) {
			sequencelocation = 0;

	    // Reset sequencer and start playing
	    // startSequencer();
	  }
	  // MIDI Stop message
	  if (command === 0xFC) {
			sequencelocation = 0;
	    // Stop the sequencer
	    // stopSequencer();
	  }
	}
};

//this makes a random sequence
generate = function(){
	var axtemp = new Number(0);
	var aytemp = new Number(0);
	var bxtemp = new Number(0);
	var bytemp = new Number(0);
	building = true;
	axtemp = randomNumber(1,10);
	aytemp = randomNumber(5,screenheight);
	bxtemp = randomNumber(screenwidth/8,664);
	bytemp = randomNumber(15,screenheight);
	pointa.x = axtemp;
	pointa.y = aytemp;
	pointb.x = bxtemp;
	pointb.y = bytemp;
	rectanglehue = randomNumber(0,360);
	soundpatch = randomNumber(1,7);
	buildit();
	for (i = 0 ; i<4;i =i+1) {
		building = true;
		axtemp = randomNumber(i*screenwidth/4,i*64+300);
		aytemp = randomNumber(5,screenheight);
		bxtemp = randomNumber(i * screenwidth/4,i*64+300);
		bytemp = randomNumber(15,screenheight);
		pointa.x = axtemp;
		pointa.y = aytemp;
		pointb.x = bxtemp;
		pointb.y = bytemp;
		rectanglehue = randomNumber(0,360);
		soundpatch = randomNumber(1,7);
		buildit();
	}
}

//this clears the sequencer
clear = function(){
	rectangle = [];
	rectangleghost = [];
}

modulationinit = function() {
	clearInterval(modulationInterval);
	modulationInterval = setInterval(function(){
		if (globalmodulation < modulationmax && globalmodulationdirection == 'up'){
			globalmodulation = globalmodulation + modulationrate;
		}
		if (globalmodulation > modulationmin && globalmodulationdirection == 'down'){
			globalmodulation = globalmodulation - modulationrate;
		}
		if (globalmodulation >= modulationmax && globalmodulationdirection == 'up'){
			globalmodulationdirection = 'down'
		}
		if (globalmodulation <= modulationmin && globalmodulationdirection == 'down'){
			globalmodulationdirection = 'up'
		}
		//drawit();
		//animateit();
	},60);
}
modulationinit();

// tile pad sequencer v 16 key controls
// (These are duplicates of touch listeners, consolidated above)
// document.getElementById('filter_down_button').addEventListener('mousedown', function(e){...});
// ... (and so on for other buttons)


// this is the main loop that draws the current state of the sequencer
// it also runs the necessary checks to see if a tile has been hit and if so, plays the appropriate sound.
var drawInterval
drawLoop = function(){
	clearInterval(drawInterval);
	drawInterval = setInterval(function(){
		drawit();
		animateit();
	},30);
}
drawLoop();

// --- Sound Utility Logic ---
const masterFilterFreqInput = document.getElementById('masterFilterFreq');
const compressorThresholdInput = document.getElementById('compressorThreshold');
const globalVolumeInput = document.getElementById('globalVolume');
// const patchSelect = document.getElementById('patchSelect');
const testPitchInput = document.getElementById('testPitch');
const testDurationInput = document.getElementById('testDuration');
const playTestSoundButton = document.getElementById('playTestSound');

// New elements for patch specific settings
const oscillatorTypeSelect = document.getElementById('oscillatorType');
const oscillatorDetuneInput = document.getElementById('oscillatorDetune');
const filterTypeSelect = document.getElementById('filterType');
const filterQInput = document.getElementById('filterQ');
const filterGainInput = document.getElementById('filterGain');
const baseFreqMultiplierInput = document.getElementById('baseFreqMultiplier');
const filterFreqMultiplierInput = document.getElementById('filterFreqMultiplier');
const initialGainInput = document.getElementById('initialGain');
const attackTimeInput = document.getElementById('attackTime');
const decayTimeInput = document.getElementById('decayTime');
const sustainLevelInput = document.getElementById('sustainLevel');
const releaseTimeInput = document.getElementById('releaseTime');
const panInput = document.getElementById('pan');
const lfoTypeSelect = document.getElementById('lfoType');
const lfoFrequencyInput = document.getElementById('lfoFrequency');
const lfoAmountInput = document.getElementById('lfoAmount');
const lfoTargetSelect = document.getElementById('lfoTarget');
const generatePatchCodeButton = document.getElementById('generatePatchCode');
const generatedCodeTextarea = document.getElementById('generatedCode');
const copyCodeButton = document.getElementById('copyCodeButton');

// Data structure to hold default/current settings for each patch
const patchDefinitions = {
    1: {
        oscillatorType: 'square',
        oscillatorDetune: 0,
        filterType: 'bandpass',
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 0.2,
        filterFreqMultiplier: 0.5,
        initialGain: 0.05,
        attackTime: 0.01,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.5,
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    2: {
        oscillatorType: 'sawtooth',
        oscillatorDetune: 0,
        filterType: 'bandpass',
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 1,
        filterFreqMultiplier: 1.5,
        initialGain: 0.5,
        attackTime: 0.01,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.01,
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    3: { // Patch 3 is complex with two oscillators/filters, simplifying for utility
        oscillatorType: 'triangle', // for oscillator3
        oscillatorDetune: 0,
        filterType: 'bandpass', // for biquadFilter3
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 1, // for oscillator3
        filterFreqMultiplier: 0.5, // for biquadFilter3
        initialGain: 0.05, // for gainNode3
        attackTime: 0.01,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.05, // for gainNode3
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    4: {
        oscillatorType: 'square',
        oscillatorDetune: 0,
        filterType: 'lowshelf',
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 0.5, // freq/2
        filterFreqMultiplier: 2, // freq*2
        initialGain: 0.05,
        attackTime: 0.05,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.05,
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    5: {
        oscillatorType: 'square',
        oscillatorDetune: 0,
        filterType: 'bandpass',
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 0.5, // freq/2
        filterFreqMultiplier: 0.5, // freq/2
        initialGain: 0.01, // Adjusted based on original logic (300 / filtervalue)
        attackTime: 0.005,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.1,
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    6: {
        oscillatorType: 'sine', // Original was sine, changed to triangle for some reason. Reverting to sine.
        oscillatorDetune: 0,
        filterType: 'allpass', // Default, as no specific filter type was set
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 1, // globalmodulation/2 + freq
        filterFreqMultiplier: 1, // No specific filter freq modulation
        initialGain: 0.1,
        attackTime: 0.1,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.1, // duration/4800
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    7: {
        oscillatorType: 'triangle',
        oscillatorDetune: 0,
        filterType: 'allpass', // Default, as no specific filter type was set
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 0.5, // freq/2
        filterFreqMultiplier: 1, // No specific filter freq modulation
        initialGain: 0.01,
        attackTime: 0.1,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.5, // duration/15000
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    },
    8: { // Similar to 7 and 2, combining elements
        oscillatorType: 'triangle', // based on 7
        oscillatorDetune: 0,
        filterType: 'bandpass', // based on 2
        filterQ: 1,
        filterGain: 0,
        baseFreqMultiplier: 0.5, // freq/2
        filterFreqMultiplier: 1.5, // freq*1.5
        initialGain: 0.01,
        attackTime: 0.15,
        decayTime: 0.1,
        sustainLevel: 0.5,
        releaseTime: 0.5,
        pan: 0,
        lfoType: 'off',
        lfoFrequency: 0,
        lfoAmount: 0,
        lfoTarget: 'none'
    }
};

// Function to update patch-specific settings in the UI
function updatePatchSettingsUI(patchNum) {
    const settings = patchDefinitions[patchNum];
    if (settings) {
        oscillatorTypeSelect.value = settings.oscillatorType;
        oscillatorDetuneInput.value = settings.oscillatorDetune;
        filterTypeSelect.value = settings.filterType;
        filterQInput.value = settings.filterQ;
        filterGainInput.value = settings.filterGain;
        baseFreqMultiplierInput.value = settings.baseFreqMultiplier;
        filterFreqMultiplierInput.value = settings.filterFreqMultiplier;
        initialGainInput.value = settings.initialGain;
        attackTimeInput.value = settings.attackTime;
        decayTimeInput.value = settings.decayTime;
        sustainLevelInput.value = settings.sustainLevel;
        releaseTimeInput.value = settings.releaseTime;
        panInput.value = settings.pan;
        lfoTypeSelect.value = settings.lfoType;
        lfoFrequencyInput.value = settings.lfoFrequency;
        lfoAmountInput.value = settings.lfoAmount;
        lfoTargetSelect.value = settings.lfoTarget;
    }
}

// Event listener for patch selection dropdown
// patchSelect.addEventListener('change', function() {
//     updatePatchSettingsUI(parseInt(this.value));
// });

// Initialize utility inputs with current values
masterFilterFreqInput.value = masterFilter.frequency.value;
compressorThresholdInput.value = compressor.threshold.value;
globalVolumeInput.value = volume;
// patchSelect.value = soundpatch; // Set initial selected patch
// updatePatchSettingsUI(soundpatch); // Load initial patch settings

// Event listener for the Play Test Sound button
playTestSoundButton.addEventListener('click', function() {
    // Get values from inputs
    const newMasterFilterFreq = parseFloat(masterFilterFreqInput.value);
    const newCompressorThreshold = parseFloat(compressorThresholdInput.value);
    const newGlobalVolume = parseFloat(globalVolumeInput.value);
    // const selectedPatch = parseInt(patchSelect.value);
    const testPitch = parseFloat(testPitchInput.value);
    const testDuration = parseFloat(testDurationInput.value);

    // Apply global settings
    if (!isNaN(newMasterFilterFreq)) {
        masterFilter.frequency.value = newMasterFilterFreq;
        masterFilter.gain.value = newMasterFilterFreq / 5000; // Recalculate gain based on new frequency
    }
    if (!isNaN(newCompressorThreshold)) {
        compressor.threshold.value = newCompressorThreshold;
    }
    if (!isNaN(newGlobalVolume)) {
        volume = newGlobalVolume; // Update the global volume variable
    }

    // Temporarily apply patch-specific settings for testing
    const currentPatchSettings = {
        oscillatorType: oscillatorTypeSelect.value,
        oscillatorDetune: parseFloat(oscillatorDetuneInput.value),
        filterType: filterTypeSelect.value,
        filterQ: parseFloat(filterQInput.value),
        filterGain: parseFloat(filterGainInput.value),
        baseFreqMultiplier: parseFloat(baseFreqMultiplierInput.value),
        filterFreqMultiplier: parseFloat(filterFreqMultiplierInput.value),
        initialGain: parseFloat(initialGainInput.value),
        attackTime: parseFloat(attackTimeInput.value),
        decayTime: parseFloat(decayTimeInput.value),
        sustainLevel: parseFloat(sustainLevelInput.value),
        releaseTime: parseFloat(releaseTimeInput.value),
        pan: parseFloat(panInput.value),
        lfoType: lfoTypeSelect.value,
        lfoFrequency: parseFloat(lfoFrequencyInput.value),
        lfoAmount: parseFloat(lfoAmountInput.value),
        lfoTarget: lfoTargetSelect.value
    };

    // Play the selected sound patch with test pitch and duration
    if (playSoundLibrary[selectedPatch] && !isNaN(testPitch) && !isNaN(testDuration)) {
        // Ensure audio context is resumed for iOS/autoplay policies
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Temporarily reconfigure the global oscillators/filters based on utility settings
        let oscToUse, gainToUse, filterToUse;
        switch(selectedPatch) {
            case 1: oscToUse = oscillator1; gainToUse = gainNode1; filterToUse = biquadFilter1; break;
            case 2: oscToUse = oscillator2; gainToUse = gainNode2; filterToUse = biquadFilter2; break;
            case 3: oscToUse = oscillator3; gainToUse = gainNode3; filterToUse = biquadFilter3; break; // Simplified for patch 3
            case 4: oscToUse = oscillator4; gainToUse = gainNode4; filterToUse = biquadFilter4; break;
            case 5: oscToUse = oscillator5; gainToUse = gainNode5; filterToUse = biquadFilter5; break;
            case 6: oscToUse = oscillator6; gainToUse = gainNode6; filterToUse = biquadFilter6; break;
            case 7: oscToUse = oscillator7; gainToUse = gainNode7; filterToUse = biquadFilter7; break;
            case 8: oscToUse = oscillator7; gainToUse = gainNode7; filterToUse = biquadFilter2; break; // Reusing for patch 8
            default: return;
        }

        if (oscToUse) {
            oscToUse.type = currentPatchSettings.oscillatorType;
            oscToUse.detune.value = currentPatchSettings.oscillatorDetune; // Apply detune
            filterToUse.type = currentPatchSettings.filterType;
            filterToUse.Q.value = currentPatchSettings.filterQ; // Set Q value
            filterToUse.gain.value = currentPatchSettings.filterGain; // Set filter gain

            // Apply ADSR gain envelope
            const now = audioCtx.currentTime;
            gainToUse.gain.cancelScheduledValues(now);
            gainToUse.gain.setValueAtTime(0, now); // Start from 0
            gainToUse.gain.linearRampToValueAtTime(currentPatchSettings.initialGain * volume, now + currentPatchSettings.attackTime);
            gainToUse.gain.linearRampToValueAtTime(currentPatchSettings.sustainLevel * volume, now + currentPatchSettings.attackTime + currentPatchSettings.decayTime);
            // The sustain level is held for the duration of the note (testDuration)
            // Then release starts
            gainToUse.gain.exponentialRampToValueAtTime(0.0001, now + (testDuration / 1000) + currentPatchSettings.releaseTime); // Release to near zero

            // Apply pan
            pannerNode.pan.value = currentPatchSettings.pan;

            // LFO application for testing: This is a simplified representation.
            // For full LFO, you'd create an LFO oscillator and connect it to the target parameter.
            // This part primarily sets up for code generation, not complex real-time modulation.
            if (currentPatchSettings.lfoType !== 'off' && currentPatchSettings.lfoFrequency > 0 && currentPatchSettings.lfoAmount > 0 && currentPatchSettings.lfoTarget !== 'none') {
                infoElement.innerHTML = `Playing Patch ${selectedPatch} with custom settings. LFO will be in generated code.`;
            } else {
                infoElement.innerHTML = `Playing Patch ${selectedPatch} with custom settings.`;
            }
        }
    } else {
        infoElement.innerHTML = "Invalid patch, pitch, or duration for test sound.";
    }
});

// Event listener for Generate Patch Code button
generatePatchCodeButton.addEventListener('click', function() {
    // const selectedPatchNum = parseInt(patchSelect.value);
    const settings = {
        oscillatorType: oscillatorTypeSelect.value,
        oscillatorDetune: parseFloat(oscillatorDetuneInput.value),
        filterType: filterTypeSelect.value,
        filterQ: parseFloat(filterQInput.value),
        filterGain: parseFloat(filterGainInput.value),
        baseFreqMultiplier: parseFloat(baseFreqMultiplierInput.value),
        filterFreqMultiplier: parseFloat(filterFreqMultiplierInput.value),
        initialGain: parseFloat(initialGainInput.value),
        attackTime: parseFloat(attackTimeInput.value),
        decayTime: parseFloat(decayTimeInput.value),
        sustainLevel: parseFloat(sustainLevelInput.value),
        releaseTime: parseFloat(releaseTimeInput.value),
        pan: parseFloat(panInput.value),
        lfoType: lfoTypeSelect.value,
        lfoFrequency: parseFloat(lfoFrequencyInput.value),
        lfoAmount: parseFloat(lfoAmountInput.value),
        lfoTarget: lfoTargetSelect.value
    };

    // Determine which global nodes this patch uses
    let oscName, gainName, filterName;
    switch(selectedPatchNum) {
        case 1: oscName = 'oscillator1'; gainName = 'gainNode1'; filterName = 'biquadFilter1'; break;
        case 2: oscName = 'oscillator2'; gainName = 'gainNode2'; filterName = 'biquadFilter2'; break;
        case 3: oscName = 'oscillator3'; gainName = 'gainNode3'; filterName = 'biquadFilter3'; break; // Simplified for code generation
        case 4: oscName = 'oscillator4'; gainName = 'gainNode4'; filterName = 'biquadFilter4'; break;
        case 5: oscName = 'oscillator5'; gainName = 'gainNode5'; filterName = 'biquadFilter5'; break;
        case 6: oscName = 'oscillator6'; gainName = 'gainNode6'; filterName = 'biquadFilter6'; break;
        case 7: oscName = 'oscillator7'; gainName = 'gainNode7'; filterName = 'biquadFilter7'; break;
        case 8: oscName = 'oscillator7'; gainName = 'gainNode7'; filterName = 'biquadFilter2'; break; // Reusing for patch 8
        default:
            generatedCodeTextarea.value = "// Select a valid patch to generate code.";
            return;
    }

    const generatedCode = `
    ${selectedPatchNum}: function(freq, duration) {
        const now = audioCtx.currentTime;
        // Ensure minimum frequency
        if (freq < 56) { freq = 56; } // A common floor, adjust as needed

        // Oscillator settings
        ${oscName}.type = '${settings.oscillatorType}';
        ${oscName}.frequency.value = freq * ${settings.baseFreqMultiplier.toFixed(3)};
        ${oscName}.detune.value = ${settings.oscillatorDetune.toFixed(1)}; // Apply detune

        // Filter settings
        ${filterName}.type = '${settings.filterType}';
        ${filterName}.frequency.value = freq * ${settings.filterFreqMultiplier.toFixed(3)};
        ${filterName}.Q.value = ${settings.filterQ.toFixed(3)};
        ${filterName}.gain.value = ${settings.filterGain.toFixed(1)}; // Apply filter gain

        // Gain envelope (ADSR)
        ${gainName}.gain.cancelScheduledValues(now);
        ${gainName}.gain.setValueAtTime(0, now); // Start from 0
        ${gainName}.gain.linearRampToValueAtTime(${settings.initialGain.toFixed(3)} * volume, now + ${settings.attackTime.toFixed(3)});
        ${gainName}.gain.linearRampToValueAtTime(${settings.sustainLevel.toFixed(3)} * volume, now + ${settings.attackTime.toFixed(3)} + ${settings.decayTime.toFixed(3)});
        // Hold sustain for the duration of the note, then release
        ${gainName}.gain.exponentialRampToValueAtTime(0.0001, now + (duration / 1000) + ${settings.releaseTime.toFixed(3)});

        // Stereo Pan
        pannerNode.pan.value = ${settings.pan.toFixed(1)};

        // LFO (Low-Frequency Oscillator) - For full functionality, create and connect LFO nodes here.
        // Example for LFO modulating oscillator frequency:
        ${settings.lfoType !== 'off' && settings.lfoFrequency > 0 && settings.lfoAmount > 0 && settings.lfoTarget === 'frequency' ? `
        // const lfo = audioCtx.createOscillator();
        // lfo.type = '${settings.lfoType}';
        // lfo.frequency.value = ${settings.lfoFrequency.toFixed(3)};
        // const lfoGain = audioCtx.createGain();
        // lfoGain.gain.value = ${settings.lfoAmount.toFixed(3)}; // LFO depth
        // lfo.connect(lfoGain);
        // lfoGain.connect(${oscName}.frequency); // Connect LFO to oscillator frequency
        // lfo.start(now);
        // lfo.stop(now + (duration / 1000) + ${settings.releaseTime.toFixed(3)} + 0.1); // Stop LFO after sound ends
        ` : ''}
        ${settings.lfoType !== 'off' && settings.lfoFrequency > 0 && settings.lfoAmount > 0 && settings.lfoTarget === 'filterFrequency' ? `
        // const lfoFilter = audioCtx.createOscillator();
        // lfoFilter.type = '${settings.lfoType}';
        // lfoFilter.frequency.value = ${settings.lfoFrequency.toFixed(3)};
        // const lfoFilterGain = audioCtx.createGain();
        // lfoFilterGain.gain.value = ${settings.lfoAmount.toFixed(3)}; // LFO depth
        // lfoFilter.connect(lfoFilterGain);
        // lfoFilterGain.connect(${filterName}.frequency); // Connect LFO to filter frequency
        // lfoFilter.start(now);
        // lfoFilter.stop(now + (duration / 1000) + ${settings.releaseTime.toFixed(3)} + 0.1); // Stop LFO after sound ends
        ` : ''}
        ${settings.lfoType !== 'off' && settings.lfoFrequency > 0 && settings.lfoAmount > 0 && settings.lfoTarget === 'gain' ? `
        // const lfoGainMod = audioCtx.createOscillator();
        // lfoGainMod.type = '${settings.lfoType}';
        // lfoGainMod.frequency.value = ${settings.lfoFrequency.toFixed(3)};
        // const lfoGainModAmount = audioCtx.createGain();
        // lfoGainModAmount.gain.value = ${settings.lfoAmount.toFixed(3)}; // LFO depth
        // lfoGainMod.connect(lfoGainModAmount);
        // lfoGainModAmount.connect(${gainName}.gain); // Connect LFO to gain
        // lfoGainMod.start(now);
        // lfoGainMod.stop(now + (duration / 1000) + ${settings.releaseTime.toFixed(3)} + 0.1); // Stop LFO after sound ends
        ` : ''}
    },
    `;
    generatedCodeTextarea.value = generatedCode.trim();
});

// Event listener for Copy Code button
copyCodeButton.addEventListener('click', function() {
    generatedCodeTextarea.select();
    document.execCommand('copy'); // Deprecated but widely supported in iframes
    infoElement.innerHTML = "Patch code copied to clipboard!";
});

}
tileSequencer();
