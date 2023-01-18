// Color labeling task
// For the categorical WM project
// Edited by Tianye Ma, CONPAM lab, UCR

var trialNumberInst = 2;
var trialNumber = 180;

// define the site that hosts stimuli images
var repo_site = "https://bobodeligong.github.io/DoubleRecall/";

// location of the images.
var all_images = [repo_site + 'images/stim/1.svg',
//repo_site + 'images/stim/2.svg',
//repo_site + 'images/stim/3.svg',
//repo_site + 'images/stim/4.svg',
//repo_site + 'images/stim/emotion1.png',
repo_site + 'images/stim/studySample.png',
repo_site + 'images/stim/probeLeftSample.png',
repo_site + 'images/stim/probeRightSample.png'
];

  var radiusha=200;
  var edgeSqaure=100;

  function getRndInteger(min, max) { // this function sets a random number between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

var rawNameID = Array(180).fill(1).map((v,k)=>k+1); // Array contains all colors 1-180

////////////////////////////////////////////////////////
//////                 HAHAHAHA                   //////
////////////////////////////////////////////////////////

// Instruction part

var timeline = [];

var instructions_start = {
  type: 'instructions',
  pages: [
      'Welcome to the experiment. </br></br>'+
      'This is the first part of the experiment. </br></br>'+
      'In each trial, please try to label the color square by choosing one of the labels that fits the best. </br></br>' +
      'Click Next for practice. </br></br>' +
      '<img src= "ColorNaming_Flow.png"></img>'
    ],
  show_clickable_nav: true
};
timeline.push(instructions_start);

var nameIDallInst = getRandomSubarray(rawNameID, 180); //shuffle
var nameIDInst=[];
for (let t=0; t < trialNumberInst; t++){
  nameIDInst[t]=nameIDallInst[t]-1;
}

  var stimuliOrderInst = {
    image:[1,2,3,4],
    nameID: nameIDInst
  }

var stimuliIndexInst =[];
  for (let i = 0; i < trialNumberInst; i++) {
    stimuliIndexInst[i] = {
      stimulus: stimuliOrderInst.image[i],
      nameID: stimuliOrderInst.nameID[i],
    }
  }

/* study trials */
var fixationWhiteInst = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000
}

  var testBlockInst = {
      type: 'name-keyboard-response',
      nameID: jsPsych.timelineVariable('nameID'),
      stimulus: jsPsych.timelineVariable('stimulus'),
      stim_duration: -1,
      data: {
        nameID: jsPsych.timelineVariable('nameID'),
        stimulus: jsPsych.timelineVariable('stimulus'),
        test_part: 'Probe',
      }
  };

var inst_procedure = {
      timeline: [fixationWhiteInst, testBlockInst],
      //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
	    timeline_variables: stimuliIndexInst,

}
timeline.push(inst_procedure);

var instructions_end = {
  type: 'instructions',
  pages: [
      'Please click Next to move on to the main experiment if you are ready. </br></br>'
    ],
  show_clickable_nav: true
};
timeline.push(instructions_end);

////////////////////////////////////////////////////////
//////                 HAHAHAHA                   //////
////////////////////////////////////////////////////////

var nameIDall = getRandomSubarray(rawNameID, 180); //shuffle
var nameID=[];
for (let t=0; t < trialNumber; t++){
  nameID[t]=nameIDall[t]-1;
}

  var stimuliOrder = {
    image:[1,2,3,4],
    nameID: nameID
  }

var stimuliIndex =[];
  for (let i = 0; i < trialNumber; i++) {
    stimuliIndex[i] = {
      stimulus: stimuliOrder.image[i],
      nameID: stimuliOrder.nameID[i],
    }
  }

/* study trials */
var fixationWhite = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000
}

  var testBlock = {
      type: 'name-keyboard-response',
      nameID: jsPsych.timelineVariable('nameID'),
      stimulus: jsPsych.timelineVariable('stimulus'),
      stim_duration: -1,
      data: {
        nameID: jsPsych.timelineVariable('nameID'),
        stimulus: jsPsych.timelineVariable('stimulus'),
        test_part: 'Probe',
      }
  };

var test_procedure = {
      timeline: [fixationWhite, testBlock],
      //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
	    timeline_variables: stimuliIndex,

}
timeline.push(test_procedure);
  /* var timeline = [instructions_study, study_procedure, instructions_test, test_procedure]; */

  var exp_end = {
    type: 'instructions',
    pages: [
        'Hahahahaha Done!'
      ],
    show_clickable_nav: true
  };
  timeline.push(exp_end);
