var url = window.location.pathname;
var exerciseId = url.substring(url.lastIndexOf("/") + 1);

function displayExercise(exerciseId) {
  const requestUrl = "https://wger.de/api/v2/exerciseinfo/" + exerciseId;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#exercise-container").empty();
      $("#exercise-container").append(`
        <div class="card m-5" style="width: 30rem;">
          <div class="card-header font-weight-bolder text-uppercase"><h3>${data.name}</h3></div>
          <div class="card-body">
            <h5 class="card-subtitle">${data.category.name}</h5>
            <p class="card-text">${data.description}</p>
            <span class="checkbox"><label><input type="checkbox" value="M" name="day">M</label></span>
            <span class="checkbox"><label><input type="checkbox" value="Tu" name="day">Tu</label></span>
            <span class="checkbox"><label><input type="checkbox" value="W" name="day">W</label></span>
            <span class="checkbox"><label><input type="checkbox" value="Th" name="day">Th</label></span>
            <span class="checkbox"><label><input type="checkbox" value="F" name="day">F</label></span>
            <span class="checkbox"><label><input type="checkbox" value="Sa" name="day">Sa</label></span >
            <span class="checkbox"><label><input type="checkbox" value="Su" name="day">Su</label></span >
            <br>
            <input id = "btnSubmit-${data.id}" type="submit" value="Save to Routine"/>
          </div>
        </div>
      `);

      $(`#btnSubmit-${data.id}`).click(function (event) {
        event.preventDefault();
        var days = [];
        $.each($("input[name='day']:checked"), function () {
          days.push($(this).val());
        });
        $.each($("input[name='day']:checked"), function () {
          $(this).prop("checked", false);
        });
        newFormHandler(data.id, data.name, days);
      });
    });
}

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

displayExercise(exerciseId);
