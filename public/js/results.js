/**
* Name: Eloy Gonzalez
* Date: 03/21/2021
* Description:
 Workoutapi
*/

/**Decalared Variables
 * Last Modified: 04/29/2021 Egon
 * add variables for traversing the DOM and api credentials for trademarks
 */
var testglobal;
var globaltitle;
var globaleceid;
var testglobal;

function WorkoutCategoryApi() {
  //alert("testapi");

  var requestUrl = "https://wger.de/api/v2/exercisecategory/";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data.results[0]);
      var WorkoutCategory = data.results;
      var options = [];
      var options1 = [];
      for (var i = 0; i < WorkoutCategory.length; i++) {
        options.push(
          '<option value="' +
            WorkoutCategory[i].id +
            '">' +
            WorkoutCategory[i].name +
            "</option>"
        );
        options1.push(
          '<a class="dropdown-item" href="#">' +
            WorkoutCategory[i].name +
            "</a>"
        );
      }

      // console.log( options1 );
      $("#dropdown").html(options1.join(""));

      $("#dropdown1").html(options.join(""));
      //console.log(options);
    });
}

function WorkoutExerciseImages(exerciseid) {
  console.log(exerciseid);
  //alert("testapi");
  let WorkoutWorkout = "";
  var requestUrl =
    "https://wger.de/api/v2/exerciseimage/?exercise=" + exerciseid;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.results);
      return data.results;
      //   data.results[0].image
      // callback("https://wger.de/media/exercise-images/83/Bench-dips-1.png");
      // rr(data.results[0].image);
    });
}

function WorkoutExerciseCategoryApi(val) {
  //alert("testapi");
  let abc = 0;

  var requestUrl =
    "https://wger.de/api/v2/exercise/?limit=20&offset=20&language=2&category=" +
    val +
    "";
  const imglink = fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var WorkoutWorkout = data.results;
      var options2 = [];
      var img;
      // console.log(data.results);
      $("#container2").empty();
      for (var i = 0; i < WorkoutWorkout.length; i++) {
        $("#container2").append(`<div class="card" style="width: 18rem;">
        <img id="img-${WorkoutWorkout[i].id}" class="card-img-top" src="https://wger.de/media/exercise-images/83/Bench-dips-1.png" alt="Card image cap">
        <div class="card-body">
          <h5 id = "cardtitle" class="card-title">${WorkoutWorkout[i].name}</h5>
          <p class="card-text">${WorkoutWorkout[i].description}</p>
          <p class="card-text"></p>
          <span class="checkbox"><label><input type="checkbox" value="M" name="day">M</label></span>
          <span class="checkbox"><label><input type="checkbox" value="Tu" name="day">Tu</label></span>
          <span class="checkbox"><label><input type="checkbox" value="W" name="day">W</label></span>
          <span class="checkbox"><label><input type="checkbox" value="Th" name="day">Th</label></span>
          <span class="checkbox"><label><input type="checkbox" value="F" name="day">F</label></span>
          <span class="checkbox"><label><input type="checkbox" value="Sa" name="day">Sa</label></span >
          <span class="checkbox"><label><input type="checkbox" value="Su" name="day">Su</label></span >
          <br>
          <input id = "btnSubmit-${WorkoutWorkout[i].id}" type="submit" value="Save to Routine"/>
        </div>
      </div>`);
        var msg = WorkoutWorkout[i].id;
        $(`#btnSubmit-${WorkoutWorkout[i].id}`).click(function (event) {
          event.preventDefault();
          // console.log($(this).parent().find("#cardtitle").html());
          //console.log(this.id);
          //const  description= document.querySelector('#project-funding').value.trim();

          // console.log($(this).parent().find("#cardtitle").html());
          //console.log($(this).parent().find(".card-img-top").html());
          const description = $(this).parent().find("#cardtitle").html().trim();

          //  var id = this.id.slice(10, 30);
          //  alert($(this).parent().find("#cardtitle").html());
          const exerciseId = this.id.slice(10, 30).trim(); //$(this).parent().find(".card-img-top").html();
          var days = [];
          $.each($("input[name='day']:checked"), function () {
            days.push($(this).val());
          });

          $.each($("input[name='day']:checked"), function () {
            $(this).prop("checked", false);
          });

          newFormHandler(exerciseId, description, days);
        });

        // console.log(WorkoutWorkout[i]);
        var requestUrl =
          "https://wger.de/api/v2/exerciseimage/?exercise=" +
          WorkoutWorkout[i].id;
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            //  console.log(data.results);
            if (data.results && data.results.length && data.results[0].image) {
              // console.log(data.results[0].image);
              img = data.results[0].image;
              //  console.log($(`#img-${data.results[0].exercise}`));
              $(`#img-${data.results[0].exercise}`).attr(`src`, img);
            } else {
              // console.log("no image");
              img = "https://wger.de/media/exercise-images/83/Bench-dips-1.png";
              //  https://wger.de/media/exercise-images/83/Bench-dips-1.png
            }
          });
      }
      //   $("#container2").html(options2.join(""));
      // $("#container2").html(options2.join(""));
    });
}
$("#dropdown1").change(function () {
  var selectedValue = $("#dropdown1").val();
  WorkoutExerciseCategoryApi(selectedValue);
  globaltitle = $(this).parent().find("#cardtitle").html();
  globaleceid = 22;
  //  alert("Selected Value: " + selectedValue);
  //window.open('https://www.uspto.gov/trademarks/apply/initial-application-forms', '_blank');
});

const newFormHandler = async (exerciseId, description, days) => {
  const title = description;
  weekdsaysArray = days;
  // weekdsaysArray.push("M");
  // weekdsaysArray.push("T");
  // weekdsaysArray.push("W");
  //weekdsaysArray.push("Th");
  // weekdsaysArray.push("F");

  const weekdays = weekdsaysArray;
  //const  description= document.querySelector('#project-funding').value.trim();
  const exercise_id = exerciseId;

  if (exercise_id && title) {
    const response = await fetch(`/api/routines`, {
      method: "POST",
      body: JSON.stringify({ title, exercise_id, weekdays }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to create routine");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/routines/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      alert("Failed to delete routine");
    }
  }
};

//call function

WorkoutExerciseCategoryApi();
WorkoutCategoryApi();

document
  .querySelector(".project-list")
  .addEventListener("click", delButtonHandler);
