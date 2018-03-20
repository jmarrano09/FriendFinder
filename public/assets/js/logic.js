var config = {
            ".chosen-select": {},
            ".chosen-select-deselect": {
                allow_single_deselect: true
            },
            ".chosen-select-no-single": {
                disable_search_threshold: 10
            },
            ".chosen-select-no-results": {
                no_results_text: "Oops, nothing found!"
            },
            ".chosen-select-width": {
                width: "95%"
            }
        };

        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }

        // Capture the form inputs
        $("#submit").on("click", function (event) {
            event.preventDefault();
            console.log("submitted");

            // Form validation
            function validateForm() {
                var isValid = true;
                $(".form-control").each(function () {
                    if ($(this).val() === "") {
                        isValid = false;
                    }
                });

                $(".chosen-select").each(function () {

                    if ($(this).val() === "") {
                        isValid = false;
                    }
                });
                return isValid;
            }

            // If all required fields are filled
            if (validateForm()) {
                // Create an object for the user"s data or new friend
                var userData = {
                    name: $("#name").val(),
                    photo: $("#photo").val(),
                    scores: [
                        $("#q1").val(),
                        $("#q2").val(),
                        $("#q3").val(),
                        $("#q4").val(),
                        $("#q5").val(),
                        $("#q6").val(),
                        $("#q7").val(),
                        $("#q8").val(),
                        $("#q9").val(),
                        $("#q10").val()
                    ]
                };
                console.log(userData);

                // AJAX post the data to the friends API.
                $.post("/api/friends", userData, function (data) {

                    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
                    $("#match-name").text(data.name);
                    $("#match-img").attr("src", data.photo);

                    // Show the modal with the best match
                    $("#results-modal").modal("toggle");

                });
            } else {
                alert("Please fill out all fields before submitting!");
            }
            runFriendFinder();
        });

        function runFriendFinder() {
            // The origin property returns the protocol, hostname and port number of a URL.
            var currentURL = window.location.origin;
        
            $.ajax({ url: currentURL + "/api/friends", method: "GET"})
            .then(function(friendData) {
              console.log("------------------------------");
              console.log("URL: "+ currentURL+"/api/friends");
              console.log("------------------------------");
              console.log(friendData);
              user = friendData.length-1;
        
              friendArray = [];
        
              for (var i=0; i < friendData.length; i++){
                console.log(friendData[i].scores);
                let sum = friendData[i].scores.reduce((a,b) => parseInt(a) + parseInt(b), 0);
                console.log(sum);
                friendArray.push(sum);
        
              }
              console.log(user);
              console.log(friendArray);
              console.log(friendArray[user]);
        
              matchArray = [];
        
              for (var a=0; a < friendArray.length-1; a++){
                let matchDiff = Math.abs(friendArray[a]-friendArray[user]);
                matchArray.push(matchDiff);
                console.log(matchDiff);
              }
        
              console.log(matchArray);
              var idx = matchArray.indexOf(Math.min.apply(null,matchArray));
              console.log(idx);
              console.log(friendData[idx]);
        
              
            })
          };