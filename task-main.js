var trialNumberPrac = 1;
var trialNumber = 2;


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

// practice part
// randomize color index pairs in practice trials
var colIndexPrac=[];
      for (m = 0; m<trialNumberPrac; m++){
      colIndexPrac[m]=[Math.floor(Math.random()*360), Math.floor(Math.random()*360)]
      };
// randomize probe locations
var probLocIndexPrac = [];
      for (n = 0; n<trialNumberPrac; n++){
        probLocIndexPrac[n] = Math.floor(Math.random()*2)
      };

var stimuliOrderPrac = {
        image:[1,2,3,4],
        colIndexPrac: colIndexPrac,
        probLocIndexPrac: probLocIndexPrac,
      }

var stimuliIndexPrac =[];
  for (w = 0; w < trialNumberPrac; w++) {
    stimuliIndexPrac[w] = {
      stimulus: stimuliOrderPrac.image[w],
      colIndex: stimuliOrderPrac.colIndexPrac[w],
      probLocIndex: stimuliOrderPrac.probLocIndexPrac[w],
    }
  }

  var timeline = [];

// Instructions for Practice part
/*var instructions_practice = {
	type : 'instructions',
	 pages: ['PRACTICE </br></br> Each image will appear one by one. Study the color of each image. You will be asked to recall the colors later.</br></br>' +
'Ready? </br></br>'],
  // pages:[`<p>Instruction</p><p>This task should take about 1 hour. First, you will see two color squares presented side by side, like this:</p><p align="center"><img src="studySample.png" width="400" border=1></p><p>Please remember their colors. These color squares will be shown briefly, and then disappear. Then you will be asked to report the color of one of them. In this example, the left square is probed. To do so, you will use your mouse to change the color of a circle (moving the mouse around the circle will change the color using a color wheel). In this case, you should report that the color of the probed square is like this: </p><p align="center"><img src="probeLeftSample.png" width="400" border=1></p><p>Once you have decided the color, you will click you mouse to lock your answer in. Then you will move to report the color of another square like this:</p><p align="center"><img src="probeRightSample.png" width="400" border=1></p><p>Now let’s practice a little bit.</p>`
  //pages:[`<p>Instruction</p><p>This task should take about 1 hour. First, you will see two color squares presented side by side, like this:</p><p>Please remember their colors. These color squares will be shown briefly, and then disappear. Then you will be asked to report the color of one of them. In this example, the left square is probed. To do so, you will use your mouse to change the color of a circle (moving the mouse around the circle will change the color using a color wheel). In this case, you should report that the color of the probed square is like this: </p><p>Once you have decided the color, you will click you mouse to lock your answer in and move to report the color of another square like this:</p><p>Now let’s practice a little bit.</p>`
//],
show_clickable_nav: true

};
*/

/*
var instructions_practice1 = {
  type:'instructions',
  pages: ['Welcome to the experiment. </br></br> This task should take about 1 hour. First, you will see two color squares presented side by side, like this: </br></br>'+
'<img src= "https://bobodeligong.github.io/DoubleRecall/images/stim/studySample.png"></img>'],
  show_clickable_nav: true
};
timeline.push(instructions_practice1);
*/

/*var instructions_practice = {
  type: 'instructions',
  pages: [
      'Welcome to the experiment. </br></br> This task should take about 1 hour.</br></br>Click next to show instruction.',
      'First, you will see two color squares presented side by side, like this: </br></br><img src= "https://bobodeligong.github.io/DoubleRecall/images/stim/studySample.png"></img></br><br>Please remember their colors. These color squares will be shown briefly, and then disappear.',
      'Then you will be asked to report the color of one of them.</br></br>In this example, the left square is probed.</br></br>To do so, you will move the mouse around the black circle to change the color of the probed square.</br></br>In this case, you should report that the color of the probed square is like this:</br></br><img src= "https://bobodeligong.github.io/DoubleRecall/images/stim/probeLeftSample.png"></img></br></br>Once you have decided the color, you will click the mouse to lock your answer in.',
      'Then you will move to report the color of another square like this:</br></br><img src= "https://bobodeligong.github.io/DoubleRecall/images/stim/probeRightSample.png"></img></br><br>Now let’s practice a little bit.'
    ],
  show_clickable_nav: true
};
timeline.push(instructions_practice);*/

var fixationWhitePrac = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {prac_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000

}

/*var studyBlockPrac = {
      type: 'snap-keyboard-response',
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      trial_duration: 1000,
      choices: jsPsych.NO_KEYS,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
      }
  };

  var delayPrac ={
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    data: {prac_part: 'delay'},
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
  }

  var testBlockPrac = {
      type: 'continuous_report',
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      probLocIndex: jsPsych.timelineVariable('probLocIndex'),
      stim_duration: -1,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
        probLocIndex: jsPsych.timelineVariable('probLocIndex'),
      }
  };

  var doubleTestBlockPrac = {
    type: 'continuous_report_double',
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    stim_duration: -1,
    data: {
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    }
  };

  var prac_procedure = {
    timeline: [fixationWhitePrac, studyBlockPrac, delayPrac, testBlockPrac, doubleTestBlockPrac],
    //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
    timeline_variables: stimuliIndexPrac,

}
timeline.push(prac_procedure);

var instructions_end = {
  type: 'instructions',
  pages: [
      'This is the end of the practice. Please click Next to move on to the main experiment.'
    ],
  show_clickable_nav: true
};
timeline.push(instructions_end);*/

// Main experiment part
      // randomize color index pairs
var colIndex=[];
      for (j = 0; j<trialNumber; j++){
      colIndex[j]=[Math.floor(Math.random()*360), Math.floor(Math.random()*360)]
      };

// randomize probe locations
var probLocIndex = [];
      for (k = 0; k<trialNumber; k++){
        probLocIndex[k] = Math.floor(Math.random()*2)
      };

// Probably would want to randomize the stimuli, but for the demo, setting the stimulus order and the "correct" colors:
/*var color_study_order = {

    image: [1,2,3,4], // i.e. images/stim/1.svg, iamges/stim/2.svg, etc.
    //colIndex: [87,171,327,291],
    // colIndex: [[87,97], [171,181], [327,337], [291,301]], // these refer to the index of the "correct" color within colors.js, the first index means the left one, the second index means the right one
    colIndex: colIndex,
  };

  // Probably would want to randomize the stimuli, but for the demo, setting the stimulus order and the "correct" colors:
  var color_test_order = {

    image: [1,2,3,4], // i.e. images/stim/1.svg, iamges/stim/2.svg, etc.
    //colIndex: [87,171,327,291], // these refer to the index of the "correct" color within colors.js
    //colIndex: [[87,97], [171,181], [327,337], [291,301]],
    colIndex: color_study_order.colIndex,
    probLocIndex: [0,1,0,1],
  };
  */

  var stimuliOrder = {
    image:[1,2,3,4],
    colIndex: colIndex,
    probLocIndex: probLocIndex,
  }

// study block stimuli
/*var studyStim = [];
	for (i = 0; i < color_study_order.image.length; i++) { //for each trial

		studyStim[i] = {
      stimulus: color_study_order.image[i],
      colIndex: color_study_order.colIndex[i],
    };
	};

// recall block stimuli
var testStim = [];
	for (i = 0; i < color_test_order.image.length; i++) { //for each trial within a block

		testStim[i] = {
      stimulus: color_test_order.image[i],
      colIndex: color_test_order.colIndex[i],
      probLocIndex: color_test_order.probLocIndex[i],
    };
  };
*/

var stimuliIndex =[];
  for (i = 0; i < trialNumber; i++) {
    stimuliIndex[i] = {
      stimulus: stimuliOrder.image[i],
      colIndex: stimuliOrder.colIndex[i],
      probLocIndex: stimuliOrder.probLocIndex[i],
    }
  }

/* create timeline */
// var timeline = [];

/* Instructions for Study Task
var instructions_study = {
	type : 'instructions',
	pages: ['DEMO STUDY TASK </br></br> Each image will appear one by one. Study the color of each image. You will be asked to recall the colors later.</br></br>' +
'Ready? </br></br>'],
show_clickable_nav: true

};
timeline.push(instructions_study);
*/

/* var emotion_induction ={
  type: 'image-keyboard-response',
  // stimulus: jsPsych.timelineVariable('emotion_stimulus'),
  stimulus: repo_site +'images/stim/emotion1.png',
  choices: ['1','2','3','4'],
  prompt: "<p>Emotion rating from 1 to 4</p>",
  //trial_duration: 4000,
  //data: {
    //emotionIndex: jsPsych.timelineVariable('emotionIndex'),
    //mainExp_part:'emotionInduction'
  //}
};
timeline.push(emotion_induction);
*/

/* study trials */
var fixationWhite = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000

}



var studyBlock = {
      type: 'snap-keyboard-response',
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      trial_duration: 1000,
      choices: jsPsych.NO_KEYS,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
        test_part: 'encoding',
      }
  };

/*var study_procedure = {
    timeline: [fixationWhite, studyBlock],
    timeline_variables: studyStim

}
timeline.push(study_procedure);
*/

// Instructions for Recall Task

/*var instructions_test = {
	type : 'instructions',
	pages: ['DEMO RECALL TASK </br></br>Each image will appear one by one, in white. It will be surrounded by a black circle. ' +
  'The circle acts like a color wheel--move your cursor, and the central image will change color. When the color matches your memory, ' +
  'click the mouse to record your guess. Try to be as accurate as possible. </br></br>' +
'Ready? </br></br>'],
show_clickable_nav: true

}
timeline.push(instructions_test);
*/

/* test trials
var fixationWhite = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {test_part: 'fixation'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000

}
*/

var delay ={
  type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {mainExp_part: 'delay'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000,
  test_part: 'delay',
}

var testBlock = {
    type: 'continuous_report',
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    stim_duration: -1,
    data: {
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      probLocIndex: jsPsych.timelineVariable('probLocIndex'),
      test_part: 'firstProbe',
    }
};

var doubleTestBlock = {
  type: 'continuous_report_double',
  stimulus: jsPsych.timelineVariable('stimulus'),
  colIndex: jsPsych.timelineVariable('colIndex'),
  probLocIndex: jsPsych.timelineVariable('probLocIndex'),
  stim_duration: -1,
  data: {
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    test_part: 'secondProbe',
  }
};

var test_procedure = {
      timeline: [fixationWhite, studyBlock, delay, testBlock, doubleTestBlock],
      //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
	    timeline_variables: stimuliIndex,

}
timeline.push(test_procedure);
  /* var timeline = [instructions_study, study_procedure, instructions_test, test_procedure]; */

  var exp_end = {
    type: 'instructions',
    pages: [
        'Thank you for your participation!</br></br>If you have any questions, please contact mack.ma@email.ucr.edu.'
      ],
    show_clickable_nav: true
  };
  timeline.push(exp_end);
