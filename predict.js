$(function () {

    var url = "PREDICTION_ENDPOINT";
    var predictionKey = "PREDICTION_KEY";
    
    var fs = require("fs");
    var _ = require('underscore');

    // Store the value of a selected image for display
    var imageBytes;

    // Handle clicks of the Browse (...) button
    $("#select_button").click(function () {

        $('#analysisResults').html('');
        $('#analyze_button').prop('disabled', true);

        const electron = require('electron');
        const dialog = require('electron').dialog;

        var va = electron.remote.dialog.showOpenDialog();

        var contents = fs.readFileSync(va[0], "base64");
        imageBytes = fs.readFileSync(va[0]);

        $('#previewImage').html('<img width="240" src="data:image/png;base64,' + contents + '" />');
        $('#analyze_button').prop('disabled', false);

    });

    // Handle clicks of the Analyze button
    $("#analyze_button").click(function () {

        $.ajax({
            type: "POST",
            url: url,
            data: imageBytes,
            processData: false,
            headers: {
                "Prediction-Key": predictionKey,
                "Content-Type": "multipart/form-data"
            }
        }).done(function (data) {

           

        }).fail(function (xhr, status, err) {
            alert(err);
        });

        $('#analyze_button').prop('disabled', true);
    });

});


