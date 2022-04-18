 /**

* plugin for presenting svg images, using the snap.io plugin.
* written by Victoria J.H. Ritvo, 2019

 **/


jsPsych.plugins["snap-keyboard-response"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'snap-keyboard-response',
    description: 'Uses Snap.io to present images.',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },

    }
  }

  plugin.trial = function(display_element, trial) {

    var new_html = '<div id="jspsych-html-keyboard-response-stimulus">' + trial.stimulus + '</div>';

    // add prompt
    if (trial.prompt !== null) {
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;


    // get the current stimulus's file location
    var currStim = 'images/stim/' + trial.stimulus + '.svg';

    var nsample = 3；
    var svgWidth = 600;
    var svgHeight = 600;

    // // create the svg object
    display_element.innerHTML = "<svg id='svg', width = '" + svgWidth.toString() + "', height = '" + svgWidth.toString() + "'/svg>" +
      '<div id="jspsych-html-keyboard-response-stimulus"></div>';

    // set the center points (relative to the SVG)
    var centerXSVG = svgWidth / 2;
    var centerYSVG = svgHeight / 2;

    /*
    rgbCol = colors.colors[trial.colIndex];
    var currHexColor = Snap.rgb(rgbCol[0], rgbCol[1], rgbCol[2]);
    */
    colorList=[];
    for (sampleID=0, sampleID<nsample; sampleID++){
      rgbCol = colors.colors[trial.colIndex[sampleID]];
      colorList[sampleID] = Snap.rgb(rgbColLeft[0], rgbColLeft[1], rgbColLeft[2]);
    }
   /*rgbColLeft = colors.colors[trial.colIndex[0]];
   var currHexColorLeft = Snap.rgb(rgbColLeft[0], rgbColLeft[1], rgbColLeft[2]);

   rgbColRight = colors.colors[trial.colIndex[1]];
   var currHexColorRight = Snap.rgb(rgbColRight[0], rgbColRight[1], rgbColRight[2]);
*/
    // create the snap paper
    var paper = Snap("#svg");

    function getRndInteger(min, max) { // this function sets a random number between min and max, inclusive
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // // % set the image position based on svg paper dimensions.
    // this may have to be changed depending on the size of the image. The demo images are 100 x 100.

     //var imageY = centerYSVG - 100 / 2;

    // // % set the image position based on svg paper dimensions.
    // this may have to be changed depending on the size of the image. The demo images are 100 x 100.

     //var imageXLeft = centerXSVG - 100 / 2-100;
    radiusha=100;
     for (let i = 0; i < nsample; i++) {
       var sampleLocationAngle = getRndInteger(1, 359);
       sampleLocationY[i] = Math.sin(sampleLocationAngle*Math.PI/180)*radiusha;
       sampleLocationX[i] = Math.cos(sampleLocationAngle*Math.PI/180)*radiusha;
     }
     colorSquareAll = [];
     for (let i = 0; i < nsample; i++) {
       colorSquareAll[i] = paper.rect(centerXSVG + sampleLocationX[i], centerYSVG-sampleLocationY[i], 100, 100).attr({
         fill: colorList[i]
       })
     }
    /*// create the left rectangular
    var colorSquareLeft = paper.rect(centerXSVG-150, centerYSVG-50, 100, 100).attr({
      fill: currHexColorLeft
    })

    // create the right rectangular
    var colorSquareRight = paper.rect(centerXSVG+50, centerYSVG-50, 100, 100).attr({
      fill: currHexColorRight
    })
*/
    /* load in the images
    var g = paper.group();


    Snap.load(currStim, function(fragment) {
      var element = fragment.select('#Layer_1');
      g.add(element);
      element.attr({
        width: "100",
        height: "100",
        x: imageXLeft.toString(), //position of the image, as a string
        y: imageY.toString(), //position of the image, as a string
        //
      });

      // select the image itself within the svg
      var shape = element.select('path');
      shape.attr({
        "fill": currHexColorLeft
      });


    });
    */
    var presentation_start = new Date()



    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
