// Masked Recall task
// For the categorical WM project
// Edited by Tianye Ma, CONPAM lab, UCR

// Prologue
var trialNumberInst = 2; // number of trials for instruction
var trialNumberPrac = 10; // number of trials for practice
var trialNumber = 50; // number of trials for each experiment block
var nsample = 3; // number of color squares. DONT CHANGE THIS

// define the site that hosts stimuli images
var repo_site = "https://bobodeligong.github.io/DoubleRecall/";

// location of the images.
var all_images = [repo_site + 'images/stim/1.svg',
];

      // Define function: Get the smallest circular angle distance between two angles in a vector
      // haha: vector, maxN: Number of units in the circular space
      function getMinAngleDist(haha, maxN) {
        let minDist=180;
        let rawDist
        for (let i=0; i<haha.length; i++) {
          for (let j=i+1; j<haha.length+1; j++) {
            rawDist=(haha[i]-haha[j])*360/maxN;
            if (rawDist >= 180) {
              rawDist=rawDist-360;
            }
            if (rawDist < -180){
              rawDist=rawDist+360;
            }
            if (Math.abs(rawDist)<minDist) {
                minDist=Math.abs(rawDist);
            }
          }
        }
        return minDist
      }
      // Define function: Get a random integer between min & max
      function getRndInteger(min, max) { // this function sets a random number between min and max, inclusive
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Set up stimuli parameters
      var minColDist=30;
      var radiusha=200;
      var edgeSqaure=100;
      var minAngleDist=45;

      ////////////////////////////////////////////////////////
      //////                 HAHAHAHA                   //////
      ////////////////////////////////////////////////////////

      // Now we're talkin about PRACTICE? (-_-)

      // Randomize the to-be-memorized colors
      var currColDistPrac=0;
      var colIndexPrac=[];
            for (let j = 0; j<trialNumberPrac; j++){
              var colIDPrac=[];
              currColDistPrac=0;
              while (currColDistPrac < minColDist) {
                for (let nS = 0; nS<nsample; nS++){
                  colIDPrac[nS]=Math.floor(Math.random()*179);
                }
                currColDistPrac=getMinAngleDist(colIDPrac, 180)
              }
              colIndexPrac[j]=colIDPrac;
            };

            // For instruction trials
            var currColDistInst=0;
            var colIndexInst=[];
                  for (let j = 0; j<trialNumberInst; j++){
                    var colIDInst=[];
                    currColDistInst=0;
                    while (currColDistInst < minColDist) {
                      for (let nS = 0; nS<nsample; nS++){
                        colIDInst[nS]=Math.floor(Math.random()*179);
                      }
                      currColDistInst=getMinAngleDist(colIDInst, 180)
                    }
                    colIndexInst[j]=colIDInst;
                  };

// randomize probe locations
var probLocIndexPrac = [];
      for (let k = 0; k<trialNumberPrac; k++){
        probLocIndexPrac[k] = Math.floor(Math.random()*nsample)
      };

      // For instruction trialResponse
      var probLocIndexInst = [];
            for (let k = 0; k<trialNumberInst; k++){
              probLocIndexInst[k] = Math.floor(Math.random()*nsample)
            };

  // Get locations of the color squares for each trial
  var allLocYPrac=[];
  var allLocXPrac=[];
  var currMinDistPrac = 0;
  for (let t=0; t<trialNumberPrac; t++) {
    currMinDistPrac=0;
    while (currMinDistPrac < minAngleDist) {
      var sampleLocationYPrac=[];
      var sampleLocationXPrac=[];
      var sampleLocationAnglePrac=[];
       for (let i = 0; i < nsample; i++) {
         sampleLocationAnglePrac[i] = getRndInteger(1, 359);
         sampleLocationYPrac[i] = Math.sin(sampleLocationAnglePrac[i]*Math.PI/180)*radiusha;
         sampleLocationXPrac[i] = Math.cos(sampleLocationAnglePrac[i]*Math.PI/180)*radiusha;
       }
       currMinDistPrac = getMinAngleDist(sampleLocationAnglePrac, 360);
     }
     allLocXPrac[t]=sampleLocationXPrac;
     allLocYPrac[t]=sampleLocationYPrac;
   }

   // For instruction trials
   var allLocYInst=[];
   var allLocXInst=[];
   var currMinDistInst = 0;
   for (let t=0; t<trialNumberInst; t++) {
     currMinDistInst=0;
     while (currMinDistInst < minAngleDist) {
       var sampleLocationYInst=[];
       var sampleLocationXInst=[];
       var sampleLocationAngleInst=[];
        for (let i = 0; i < nsample; i++) {
          sampleLocationAngleInst[i] = getRndInteger(1, 359);
          sampleLocationYInst[i] = Math.sin(sampleLocationAngleInst[i]*Math.PI/180)*radiusha;
          sampleLocationXInst[i] = Math.cos(sampleLocationAngleInst[i]*Math.PI/180)*radiusha;
        }
        currMinDistInst = getMinAngleDist(sampleLocationAngleInst, 360);
      }
    allLocXInst[t]=sampleLocationXInst;
    allLocYInst[t]=sampleLocationYInst;
 }

  var stimuliOrderPrac = {
    image:[1,2,3,4],
    allLocX: allLocXPrac,
    allLocY: allLocYPrac,
    colIndex: colIndexPrac,
    probLocIndex: probLocIndexPrac,
  }
  var stimuliOrderInst = {
    image:[1,2,3,4],
    allLocX: allLocXInst,
    allLocY: allLocYInst,
    colIndex: colIndexInst,
    probLocIndex: probLocIndexInst,
  }

var stimuliIndexPrac =[];
  for (let i = 0; i < trialNumberPrac; i++) {
    stimuliIndexPrac[i] = {
      stimulus: stimuliOrderPrac.image[i],
      colIndex: stimuliOrderPrac.colIndex[i],
      allLocX: stimuliOrderPrac.allLocX[i],
      allLocY: stimuliOrderPrac.allLocY[i],
      probLocIndex: stimuliOrderPrac.probLocIndex[i],
    }
  }
  var stimuliIndexInst =[];
    for (let i = 0; i < trialNumberInst; i++) {
      stimuliIndexInst[i] = {
        stimulus: stimuliOrderInst.image[i],
        colIndex: stimuliOrderInst.colIndex[i],
        allLocX: stimuliOrderInst.allLocX[i],
        allLocY: stimuliOrderInst.allLocY[i],
        probLocIndex: stimuliOrderInst.probLocIndex[i],
      }
    }

      var timeline = [];

      var instructions_practice_encode = {
        type:'instructions',
        pages: ['Welcome to the experiment. </br></br> In each trial, you will first view and try to memorize three color squares presented at random locations. </br></br>'+
      '<img src= "RecallTask_Flow.png"></img>'],
        show_clickable_nav: true
      };

      timeline.push(instructions_practice_encode);

      var instructions_practice_recall= {
        type:'instructions',
        pages: ['Then after a short delay, one of the previously remembered color squares will be substituted by a new square. </br></br>'+
        'You can change the color of the new square by adjusting the location of the black dot on the black wheel. </br></br>' +
        'Please try to adjust the color of the new square to the previously memorized color. </br></br>' +
        '<img src= "RecallTask_Flow.png"></img>'],
        show_clickable_nav: true
      };
      timeline.push(instructions_practice_recall);

      var fixationWhiteInst = {
        type: 'html-keyboard-response',
        stimulus: '<div style="font-size:60px;">+</div>',
        data: {prac_part: 'fixation'},
        choices: jsPsych.NO_KEYS,
        trial_duration: 1000
      }

      var studyBlockInst = {
            type: 'snap-keyboard-response',
            stimulus: jsPsych.timelineVariable('stimulus'),
            colIndex: jsPsych.timelineVariable('colIndex'),
            allLocX: jsPsych.timelineVariable('allLocX'),
            allLocY: jsPsych.timelineVariable('allLocY'),
            trial_duration: 2000, // much longer encoding phase for instruction trials
            choices: jsPsych.NO_KEYS,
            data: {
              stimulus: jsPsych.timelineVariable('stimulus'),
              colIndex: jsPsych.timelineVariable('colIndex'),
              allLocX: jsPsych.timelineVariable('allLocX'),
              allLocY: jsPsych.timelineVariable('allLocY'),
              test_part: 'encoding',
            }
        };

      var delay1Inst ={
        type: 'html-keyboard-response',
        stimulus: '<div style="font-size:60px;">+</div>',
        data: {mainExp_part: 'delay'},
        choices: jsPsych.NO_KEYS,
        trial_duration: 100,
        test_part: 'delay',
      }

      var maskInst = {
            type: 'mask-keyboard-response',
            stimulus: jsPsych.timelineVariable('stimulus'),
            colIndex: jsPsych.timelineVariable('colIndex'),
            allLocX: jsPsych.timelineVariable('allLocX'),
            allLocY: jsPsych.timelineVariable('allLocY'),
            trial_duration: 0,
            choices: jsPsych.NO_KEYS,
            data: {
              stimulus: jsPsych.timelineVariable('stimulus'),
              colIndex: jsPsych.timelineVariable('colIndex'),
              allLocX: jsPsych.timelineVariable('allLocX'),
              allLocY: jsPsych.timelineVariable('allLocY'),
              test_part: 'backward_mask',
            }
        };

      var delay2Inst ={
        type: 'html-keyboard-response',
        stimulus: '<div style="font-size:60px;">+</div>',
        data: {mainExp_part: 'delay'},
        choices: jsPsych.NO_KEYS,
        trial_duration: 9700,
        test_part: 'delay',
      }

      var testBlockInst = {
          type: 'continuous_report',
          stimulus: jsPsych.timelineVariable('stimulus'),
          colIndex: jsPsych.timelineVariable('colIndex'),
          probLocIndex: jsPsych.timelineVariable('probLocIndex'),
          allLocX: jsPsych.timelineVariable('allLocX'),
          allLocY: jsPsych.timelineVariable('allLocY'),
          stim_duration: -1,
          data: {
            stimulus: jsPsych.timelineVariable('stimulus'),
            colIndex: jsPsych.timelineVariable('colIndex'),
            probLocIndex: jsPsych.timelineVariable('probLocIndex'),
            allLocX: jsPsych.timelineVariable('allLocX'),
            allLocY: jsPsych.timelineVariable('allLocY'),
            test_part: 'Probe',
          }
      };

      var inst_procedure = {
            timeline: [fixationWhiteInst, studyBlockInst, delay1Inst, maskInst, delay2Inst, testBlockInst],
            //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
            timeline_variables: stimuliIndexInst,

      }
      timeline.push(inst_procedure);

      var instructions_practice_start = {
        type:'instructions',
        pages: ['Click to start practice. </br></br>'],
        show_clickable_nav: true
      };
      timeline.push(instructions_practice_start);

      var fixationWhitePrac = {
      	type: 'html-keyboard-response',
      	stimulus: '<div style="font-size:60px;">+</div>',
      	data: {prac_part: 'fixation'},
      	choices: jsPsych.NO_KEYS,
      	trial_duration: 1000
      }

      var studyBlockPrac = {
            type: 'snap-keyboard-response',
            stimulus: jsPsych.timelineVariable('stimulus'),
            colIndex: jsPsych.timelineVariable('colIndex'),
            allLocX: jsPsych.timelineVariable('allLocX'),
            allLocY: jsPsych.timelineVariable('allLocY'),
            trial_duration: 100,
            choices: jsPsych.NO_KEYS,
            data: {
              stimulus: jsPsych.timelineVariable('stimulus'),
              colIndex: jsPsych.timelineVariable('colIndex'),
              allLocX: jsPsych.timelineVariable('allLocX'),
              allLocY: jsPsych.timelineVariable('allLocY'),
              test_part: 'encoding',
            }
        };

      var delay1Prac ={
        type: 'html-keyboard-response',
      	stimulus: '<div style="font-size:60px;">+</div>',
      	data: {mainExp_part: 'delay'},
      	choices: jsPsych.NO_KEYS,
      	trial_duration: 100,
        test_part: 'delay',
      }

      var maskPrac = {
            type: 'mask-keyboard-response',
            stimulus: jsPsych.timelineVariable('stimulus'),
            colIndex: jsPsych.timelineVariable('colIndex'),
            allLocX: jsPsych.timelineVariable('allLocX'),
            allLocY: jsPsych.timelineVariable('allLocY'),
            trial_duration: 200,
            choices: jsPsych.NO_KEYS,
            data: {
              stimulus: jsPsych.timelineVariable('stimulus'),
              colIndex: jsPsych.timelineVariable('colIndex'),
              allLocX: jsPsych.timelineVariable('allLocX'),
              allLocY: jsPsych.timelineVariable('allLocY'),
              test_part: 'backward_mask',
            }
        };

      var delay2Prac ={
        type: 'html-keyboard-response',
      	stimulus: '<div style="font-size:60px;">+</div>',
      	data: {mainExp_part: 'delay'},
      	choices: jsPsych.NO_KEYS,
      	trial_duration: 1200,
        test_part: 'delay',
      }

      var testBlockPrac = {
          type: 'continuous_report',
          stimulus: jsPsych.timelineVariable('stimulus'),
          colIndex: jsPsych.timelineVariable('colIndex'),
          probLocIndex: jsPsych.timelineVariable('probLocIndex'),
          allLocX: jsPsych.timelineVariable('allLocX'),
          allLocY: jsPsych.timelineVariable('allLocY'),
          stim_duration: -1,
          data: {
            stimulus: jsPsych.timelineVariable('stimulus'),
            colIndex: jsPsych.timelineVariable('colIndex'),
            probLocIndex: jsPsych.timelineVariable('probLocIndex'),
            allLocX: jsPsych.timelineVariable('allLocX'),
            allLocY: jsPsych.timelineVariable('allLocY'),
            test_part: 'Probe',
          }
      };

      var prac_procedure = {
            timeline: [fixationWhitePrac, studyBlockPrac, delay1Prac, maskPrac, delay2Prac, testBlockPrac],
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
      timeline.push(instructions_end);

      ////////////////////////////////////////////////////////
      //////                 HAHAHAHA                   //////
      ////////////////////////////////////////////////////////

      // Now we start the main experiment hahahahaha

      // Randomize the to-be-memorized colors
      var currColDist=0;
      var colIndex=[];
            for (let j = 0; j<trialNumber; j++){
              var colID=[];
              currColDist=0;
              while (currColDist < minColDist) {
                for (let nS = 0; nS<nsample; nS++){
                  colID[nS]=Math.floor(Math.random()*179);
                }
                currColDist=getMinAngleDist(colID, 180)
              }
              colIndex[j]=colID;
            };

// randomize probe locations
var probLocIndex = [];
      for (let k = 0; k<trialNumber; k++){
        probLocIndex[k] = Math.floor(Math.random()*nsample)
      };

  // Get locations of the color squares for each trial
  var allLocY=[];
  var allLocX=[];
  var currMinDist = 0;
  for (let t=0; t<trialNumber; t++) {
    currMinDist=0;
    while (currMinDist < minAngleDist) {
      var sampleLocationY=[];
      var sampleLocationX=[];
      var sampleLocationAngle=[];
       for (let i = 0; i < nsample; i++) {
         sampleLocationAngle[i] = getRndInteger(1, 359);
         sampleLocationY[i] = Math.sin(sampleLocationAngle[i]*Math.PI/180)*radiusha;
         sampleLocationX[i] = Math.cos(sampleLocationAngle[i]*Math.PI/180)*radiusha;
       }
       currMinDist = getMinAngleDist(sampleLocationAngle, 360);
     }
   allLocX[t]=sampleLocationX;
   allLocY[t]=sampleLocationY;
}

  var stimuliOrder = {
    image:[1,2,3,4],
    allLocX: allLocX,
    allLocY: allLocY,
    colIndex: colIndex,
    probLocIndex: probLocIndex,
  }

var stimuliIndex =[];
  for (let i = 0; i < trialNumber; i++) {
    stimuliIndex[i] = {
      stimulus: stimuliOrder.image[i],
      colIndex: stimuliOrder.colIndex[i],
      allLocX: stimuliOrder.allLocX[i],
      allLocY: stimuliOrder.allLocY[i],
      probLocIndex: stimuliOrder.probLocIndex[i],
    }
  }

/* create timeline */
//var timeline = [];

// Instructions for Study Task
var instructions_study = {
	type : 'instructions',
	pages: ['Main Experiment </br></br> Study the color of each square. You will be asked to recall the colors later.</br></br>' +
'Ready? </br></br>'],
show_clickable_nav: true

};
timeline.push(instructions_study);

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
      allLocX: jsPsych.timelineVariable('allLocX'),
      allLocY: jsPsych.timelineVariable('allLocY'),
      trial_duration: 100,
      choices: jsPsych.NO_KEYS,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
        allLocX: jsPsych.timelineVariable('allLocX'),
        allLocY: jsPsych.timelineVariable('allLocY'),
        test_part: 'encoding',
      }
  };

var delay1 ={
  type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {mainExp_part: 'delay'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 100,
  test_part: 'delay',
}

var mask = {
      type: 'mask-keyboard-response',
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      allLocX: jsPsych.timelineVariable('allLocX'),
      allLocY: jsPsych.timelineVariable('allLocY'),
      trial_duration: 200,
      choices: jsPsych.NO_KEYS,
      data: {
        stimulus: jsPsych.timelineVariable('stimulus'),
        colIndex: jsPsych.timelineVariable('colIndex'),
        allLocX: jsPsych.timelineVariable('allLocX'),
        allLocY: jsPsych.timelineVariable('allLocY'),
        test_part: 'backward_mask',
      }
  };

var delay2 ={
  type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	data: {mainExp_part: 'delay'},
	choices: jsPsych.NO_KEYS,
	trial_duration: 1200,
  test_part: 'delay',
}

var testBlock = {
    type: 'continuous_report',
    stimulus: jsPsych.timelineVariable('stimulus'),
    colIndex: jsPsych.timelineVariable('colIndex'),
    probLocIndex: jsPsych.timelineVariable('probLocIndex'),
    allLocX: jsPsych.timelineVariable('allLocX'),
    allLocY: jsPsych.timelineVariable('allLocY'),
    stim_duration: -1,
    data: {
      stimulus: jsPsych.timelineVariable('stimulus'),
      colIndex: jsPsych.timelineVariable('colIndex'),
      probLocIndex: jsPsych.timelineVariable('probLocIndex'),
      allLocX: jsPsych.timelineVariable('allLocX'),
      allLocY: jsPsych.timelineVariable('allLocY'),
      test_part: 'Probe',
    }
};

var test_procedure = {
      timeline: [fixationWhite, studyBlock, delay1, mask, delay2, testBlock],
      //timeline: [emotion_induction, fixationWhite, studyBlock, delay, testBlock],
	    timeline_variables: stimuliIndex,

}
timeline.push(test_procedure);
  /* var timeline = [instructions_study, study_procedure, instructions_test, test_procedure]; */

  var exp_end = {
    type: 'instructions',
    pages: [
        'Hahahahaha Done! Congrats! </br></br>'
      ],
    show_clickable_nav: true
  };
  timeline.push(exp_end);
