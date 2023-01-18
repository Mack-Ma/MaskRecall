/**

* plugin for presenting svg images, using the snap.io plugin.
* written by Victoria J.H. Ritvo, 2019

 **/


jsPsych.plugins["name-keyboard-response"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'name-keyboard-response',
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
    var response = {
      rt: null,
      mouseX: null,
      mouseY: null,
      col: null,
    };
    var new_html = '<div id="jspsych-html-keyboard-response-stimulus">' + trial.stimulus + '</div>';

    // add prompt
    if (trial.prompt !== null) {
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;

    function getRndInteger(min, max) { // this function sets a random number between min and max, inclusive
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // get the current stimulus's file location
    var currStim = 'images/stim/' + trial.stimulus + '.svg';
    var nsample = 3;
    var svgWidth = 800;
    var svgHeight = 800;
    var nameSet = ['Blue','Green','Pink','Purple','Orange','Yellow','Red','Brown'];

    // set the center points (relative to the SVG)
    var centerXSVG = svgWidth / 2;
    var centerYSVG = svgHeight / 2;

    // // create the svg object
    display_element.innerHTML = "<svg id='svg', width = '" + svgWidth.toString() + "', height = '" + svgWidth.toString() + "'/svg>" +
      '<div id="jspsych-html-keyboard-response-stimulus"></div>';

      var rgbID = trial.nameID;
      var curRGBname = colors.colors[rgbID];
      var colorName = Snap.rgb(curRGBname[0], curRGBname[1], curRGBname[2]);

      // create the snap paper
      var paper = Snap("#svg");

      // create the pointer. Here, it's set to appear at the top of the circle at the start of a trial.
      var colPointer = paper.circle(centerXSVG, centerYSVG, 15).attr({
        stroke: "black",
      });


      var calculateName = function(xPos, yPos) {

        var relX = xPos - centerXSVG;
        var relY = yPos - centerYSVG;
        var nameWhich = -1;
        if (relX > 200 && Math.abs(relY) < 400){
          nameWhich = Math.floor((relY+270)/80)-1;
        }
        return nameWhich;

      }

      var mouseX, mouseY;

      $(function() {
        $(document).bind('mousemove.overall', function(e) {

          // get coordinates of the SVG bounding box in Absolute terms (not svg coordinates)
          var svgObj = document.getElementById("svg");
          var rect = svgObj.getBoundingClientRect();

          // get the center coordinates in absolute terms (not svg coordinates)
          centerXDom = rect.x + centerXSVG;
          centerYDom = rect.y + centerYSVG;

          // calculate angle (done with absolute, DOM coordintes)
          var nameWhich = calculateName(e.pageX, e.pageY); //get imgCol
          var colorNameAll = [];
          var blankColor=Snap.rgb(255,255,255);
          for (let i = 0; i < 8; i++) {
            colorNameAll[i] = paper.text(centerXSVG+200,centerYSVG-240+80*i -20,nameSet[i]).attr({
              "fill":Snap.rgb(255,255,255),
              "font-size":50,
              "text-anchor": "start"
            })
          };
          if (nameWhich > -1) {
            colorNameAll[nameWhich] = paper.text(centerXSVG+200,centerYSVG-240+80*nameWhich -20,nameSet[nameWhich]).attr({
              "fill":colorName,
              "font-size":50,
              "text-anchor": "start"
            })

          colPointer.attr({
            cx: centerXSVG + 150,
            cy: centerYSVG - 280 + 80*nameWhich,
          });
        }
        });
      }); // end of mousetracking

    // set the center points (relative to the SVG)
    var centerXSVG = svgWidth / 2;
    var centerYSVG = svgHeight / 2;

    /*
    rgbCol = colors.colors[trial.colIndex];
    var currHexColor = Snap.rgb(rgbCol[0], rgbCol[1], rgbCol[2]);
    */


  /* rgbColLeft = colors.colors[trial.colIndex[0]];
   var currHexColorLeft = Snap.rgb(rgbColLeft[0], rgbColLeft[1], rgbColLeft[2]);

   rgbColRight = colors.colors[trial.colIndex[1]];
   var currHexColorRight = Snap.rgb(rgbColRight[0], rgbColRight[1], rgbColRight[2]);*/

    // create the snap paper
    var paper = Snap("#svg");

     var radiusha=200;
     var edgeSquare=100;

      var colorNameAll = [];
      var blankColor=Snap.rgb(255,255,255);
      for (let i = 0; i < 8; i++) {
        colorNameAll[i] = paper.text(centerXSVG+200,centerYSVG-240+80*i -20,nameSet[i]).attr({
          "fill":Snap.rgb(255,255,255),
          "font-size":50,
          "text-anchor": "start"
        })
      };

      var colorCur = paper.rect(centerXSVG - 200 - edgeSqaure/2, centerYSVG - edgeSquare/2, edgeSquare, edgeSquare).attr({
        fill:colorName
      });


    var presentation_start = new Date()


        var startTime = new Date();
        /* Always track the mouse */

        $(document).bind("click.trialResponse", function(e) {
          var rt = (new Date()) - startTime;
          var xClicked = e.pageX;
          var yClicked = e.pageY;

          var nameWhichClicked = calculateName(xClicked, yClicked);


          var trial_data = {
            "rt": rt,
            "stimulus": trial.stimulus,
            "xClicked": xClicked,
            "yClicked": yClicked,
            "responseInd":nameWhichClicked,
          };

          $(document).unbind("click.trialResponse")
          $(document).unbind("mousemove.overall")

          after_response(trial_data)

        });




        // function to handle responses by the subject
        function after_response(trial_data) {
          // only record first response

          delete startTime;

          if (trial.response_ends_trial) {
            end_trial(trial_data);
          }
        };


        // // function to end trial when it is time
        var end_trial = function(trial_data) {

          // kill any remaining setTimeout handlers
          jsPsych.pluginAPI.clearAllTimeouts();

          // kill keyboard listeners
          if (typeof keyboardListener !== 'undefined') {
            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
          }

          display_element.innerHTML = '';

          jsPsych.finishTrial(trial_data);
        };


      };

  //   // function to end trial when it is time
  //   var end_trial = function() {
  //
  //     // kill any remaining setTimeout handlers
  //     jsPsych.pluginAPI.clearAllTimeouts();
  //
  //     // kill keyboard listeners
  //     if (typeof keyboardListener !== 'undefined') {
  //       jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
  //     }
  //
  //     // gather the data to store for the trial
  //     var trial_data = {
  //       "rt": response.rt,
  //       "stimulus": trial.stimulus,
  //       "key_press": response.key
  //     };
  //
  //     // clear the display
  //     display_element.innerHTML = '';
  //
  //     // move on to the next trial
  //     jsPsych.finishTrial(trial_data);
  //   };
  //
  //   // function to handle responses by the subject
  //   var after_response = function(info) {
  //
  //     // after a valid response, the stimulus will have the CSS class 'responded'
  //     // which can be used to provide visual feedback that a response was recorded
  //     display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';
  //
  //     // only record the first response
  //     if (response.key == null) {
  //       response = info;
  //     }
  //
  //     if (trial.response_ends_trial) {
  //       end_trial();
  //     }
  //   };
  //
  //   // start the response listener
  //   if (trial.choices != jsPsych.NO_KEYS) {
  //     var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
  //       callback_function: after_response,
  //       valid_responses: trial.choices,
  //       rt_method: 'date',
  //       persist: false,
  //       allow_held_key: false
  //     });
  //   }
  //
  //   // hide stimulus if stimulus_duration is set
  //   if (trial.stimulus_duration !== null) {
  //     jsPsych.pluginAPI.setTimeout(function() {
  //       display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
  //     }, trial.stimulus_duration);
  //   }
  //
  //   // end trial if trial_duration is set
  //   if (trial.trial_duration !== null) {
  //     jsPsych.pluginAPI.setTimeout(function() {
  //       end_trial();
  //     }, trial.trial_duration);
  //   }
  //
  // };

  return plugin;
})();
