Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 1: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 2: Defining and load required resources */
    var task_github = "https://bobodeligong.github.io/DoubleRecall/"; // https://<your-github-username>.github.io/<your-experiment-name>

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        task_github + "libraries/jspsych.js",
        task_github + "libraries/jquery-min.js", // if not work, mouse cannot be tracked
        task_github + "libraries/Snap.svg-0.5.1/dist/snap.svg.js",
        task_github + "plugins/jspsych-continuous-report.js",
        task_github + "plugins/jspsych-continuous-report-double.js",
        task_github + "plugins/jspsych-snap-keyboard-response.js",
        task_github + "plugins/jspsych-html-keyboard-response.js",
        task_github + "plugins/jspsych-instructions.js",
        task_github + "colors.js",
        //task_github + "css/jspsych.css",
        //task_github + "css/custom.css",
        task_github + "task-main.js",
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    /* Change 3: Appending the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default; if not, the background cannot be changed
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    /* Change 4: Wrapping jsPsych.init() in a function */
    function initExp() {

        jsPsych.init({
            timeline: timeline,
            preload_images: all_images, // this speeds things up.
            show_preload_progress_bar: false, 
            display_element: 'display_stage',
            fullscreen: true,
            on_finish: function (data) {
                /* Change 5: Summarizing and save the results to Qualtrics */
                // summarize the results
                var colIndexDisplay =jsPsych.data.get().filter({
                    test_part: 'encoding',
                });
                var colIndexPresented = colIndexDisplay.select('colIndex');
 
                var delayDisplay = jsPsych.data.get().filter({
                    test_part: 'delay',
                });
                var categoryEncodingPeriod = delayDisplay.select('trial_duration');

                var firstProbeTrials = jsPsych.data.get().filter({
                    test_part: 'firstProbe',
                });
                var firstResponseRT = firstProbeTrials.select('rt');
                var firstResponseError = firstProbeTrials.select('responseError');
                var firstProbeLocation = firstProbeTrials.select('probLocIndex');
                
                var secondProbeTrials = jsPsych.data.get().filter({
                    test_part: 'secondProbe',
                });
                var secondResponseRT = secondProbeTrials.select('rt');
                var secondResponseError = secondProbeTrials.select('responseError');
                
                
                

                // save to qualtrics embedded data
                Qualtrics.SurveyEngine.setEmbeddedData("colIndexPresented", colIndexPresented);
                Qualtrics.SurveyEngine.setEmbeddedData("categoryEncodingPeriod", categoryEncodingPeriod);
                Qualtrics.SurveyEngine.setEmbeddedData("firstResponseRT", firstResponseRT);
                Qualtrics.SurveyEngine.setEmbeddedData("firstProbeLocation", firstProbeLocation);
                Qualtrics.SurveyEngine.setEmbeddedData("firstResponseError", firstResponseError);
                Qualtrics.SurveyEngine.setEmbeddedData("secondResponseRT", secondResponseRT);
                Qualtrics.SurveyEngine.setEmbeddedData("secondResponseError", secondResponseError);

                /* Change 6: Adding the clean up and continue functions.*/
                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});