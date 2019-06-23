/*timer*/

var timerBox = $("#timer");

setInterval(function () {
    var time = moment().format('HH:mm:ss a');
    timerBox.text(time)
}, 1000)



/* firebase
===========================*/
var config = {
    apiKey: "AIzaSyD0ZMraL6fFnV_gBD1veh77qoiMH48p8qA",
    authDomain: "train-c1ea4.firebaseapp.com",
    databaseURL: "https://train-c1ea4.firebaseio.com",
    projectId: "train-c1ea4",
    storageBucket: "",
    messagingSenderId: "685515506864",
    appId: "1:685515506864:web:ca5333aea6b4f189"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();



/*functions
===========================================*/

//When Submit button is clicked.....
$('#submit').on('click', function (event) {

    event.preventDefault();
    //Get input info
    var trainName = $('#trainName').val().trim();
    var dest = $('#dest').val().trim();
    var freq = $('#freq').val().trim();
    var firstTrainTime = $('#firstTrainTime').val().trim();



    /*========================timesheet activity====================*/
    //Conversion
    //Convert to HH:MM
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    //Converts the firsTimeCover object into string
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextTrainFormat = moment(nextTrain).format('hh:mm');

    database.ref('/trainSchedule').push({
        trainName: trainName,
        destination: dest,
        arrival: nextTrainFormat,
        minutesAway: tMinutesTillTrain,
       
    });
    alert("Employee successfully added");
});

/*=====================================================*/
database.ref('/trainSchedule').on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val());

    var tBody = $("#tbody");
    var tRow = $('<tr>');

    var tdTName = $('<td>').text(childSnapshot.val().trainName);

    var tdDestination = $('<td>').text(childSnapshot.val().destination);

    var tdFrequency = $('<td>').text(childSnapshot.val().frequency);

    var tdArrival = $('<td>').text(childSnapshot.val().arrival);

    var tdMinutesAway = $('<td>').text(childSnapshot.val().minutesAway);

    tRow.append(tdTName, tdDestination, tdArrival,tdFrequency,tdMinutesAway);
    tBody.append(tRow);



});
