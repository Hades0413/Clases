// BUSCAR PROFE
const searchBoxProf = document.querySelector(
  '.search-tutor input[name="search_box"]'
);
const teacherBoxContainer = document.getElementById("teacher-box-container");
const autocompleteResultsProf = document.createElement("div");
autocompleteResultsProf.id = "autocomplete-results-prof";
teacherBoxContainer.insertBefore(
  autocompleteResultsProf,
  teacherBoxContainer.firstChild
);

const fakeTeacherData = [
  {
    name: "RAEL ANGEL MOSTACERO MENDOZA",
    subject: "LP II",
    image: "hades0.png",
  },
  { name: "JHONATAN ABAL MEJIA", subject: "POO II", image: "hades0.png" },
  {
    name: "WALTER JAVIER NAPAN TARMEÑO",
    subject: "BDA II",
    image: "hades0.png",
  },
  { name: "GERARDO SARMIENTO QUISTAN", subject: "GSTI", image: "hades0.png" },
  { name: "HENRY BRAHANIND BLAS SOSA", subject: "DHP IV", image: "hades0.png" },
  {
    name: "ANA MARIA VARGAS DE LA CRUZ",
    subject: "ADS II",
    image: "hades0.png",
  },
];

searchBoxProf.addEventListener("input", function () {
  const searchText = searchBoxProf.value.toLowerCase();

  const matchingTeachers = fakeTeacherData.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchText) ||
      teacher.subject.toLowerCase().includes(searchText)
  );

  const recommendationHTML = matchingTeachers
    .map(
      (teacher) => `
          <div class="autocomplete-result">
              <div class="teacher-info">
                  <img loading="lazy" src="assets/profe/${teacher.image}" alt="${teacher.subject}" style="width: 50px;">
                  <div class="info">
                      <h3>${teacher.name}</h3>
                      <span>${teacher.subject}</span>
                  </div>
              </div>
          </div>
      `
    )
    .join("");

  autocompleteResultsProf.innerHTML = recommendationHTML;

  // Manejar la selección de recomendación
  const autocompleteResults = document.querySelectorAll(".autocomplete-result");
  autocompleteResults.forEach((result) => {
    result.addEventListener("click", function () {
      const selectedName = result.querySelector("h3").textContent;
      searchBoxProf.value = selectedName;
      autocompleteResultsProf.innerHTML = "";
    });
  });
});

// Manejar el envío del formulario y la redirección
document
  .querySelector(".search-tutor")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío al seleccionar

    const selectedSubject = searchBoxProf.value;
    switch (selectedSubject) {
      case "RAEL ANGEL MOSTACERO MENDOZA":
        window.location.href = `profes/PROFE1/prof1.html`;
        break;
      case "JHONATAN ABAL MEJIA":
        window.location.href = `profes/PROFE2/prof2.html`;
        break;
      case "WALTER JAVIER NAPAN TARMEÑO":
        window.location.href = `profes/PROFE3/prof3.html`;
        break;
      case "GERARDO SARMIENTO QUISTAN":
        window.location.href = `profes/PROFE4/prof4.html`;
        break;
      case "HENRY BRAHANIND BLAS SOSA":
        window.location.href = `profes/PROFE5/prof5.html`;
        break;
      case "ANA MARIA VARGAS DE LA CRUZ":
        window.location.href = `profes/PROFE6/prof6.html`;
        break;
      default:
        break;
    }
  });

// CLICK FUERA DE LAS RECOMENDACIONES
document.addEventListener("click", function (event) {
  if (
    !searchBoxProf.contains(event.target) &&
    !autocompleteResultsProf.contains(event.target)
  ) {
    autocompleteResultsProf.innerHTML = "";
  }
});
