//COLOR DE LA PÁGINA
let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

// Función para construir rutas relativas
function buildRelativePath(path) {
  const parts = window.location.pathname.split('/').filter(part => part !== '');
  parts.pop(); // Elimina el nombre del archivo actual
  const levelsUp = parts.map(() => '..').join('/');
  return `${levelsUp}/${path}`;
}

// BUSCAR CURSO
const searchBox = document.getElementById('search_box');
const searchButton = document.querySelector('.search-form button');
const autocompleteResults = document.getElementById('autocomplete-results');

const fakeRecommendations = [
  'LP II',
  'POO II',
  'BDA II',
  'GSTI',
  'DHP IV',
  'ADS II',
];

searchButton.addEventListener('click', function (event) {
  event.preventDefault();

  const searchText = searchBox.value.toUpperCase();

  const courseMap = {
    'LP II': 'cursos/CICLO IV/LP II/lp.html',
    'POO II': 'cursos/CICLO IV/POO II/poo.html',
    'BDA II': 'cursos/CICLO IV/BDA II/bda.html',
    'GSTI': 'cursos/CICLO IV/GSTI/gsti.html',
    'DHP IV': 'cursos/CICLO IV/DHP IV/dhp.html',
    'ADS II': 'cursos/CICLO IV/ADS II/ads.html',
  };

  if (searchText in courseMap) {
    window.location.href = buildRelativePath(courseMap[searchText]);
  }
});

searchBox.addEventListener('input', function () {
  const searchText = searchBox.value.toUpperCase();

  const filteredRecommendations = fakeRecommendations.filter(item =>
    item.toUpperCase().startsWith(searchText)
  );

  const recommendationHTML = filteredRecommendations
    .map(
      item => `
        <div class="autocomplete-result">${item}</div>
    `
    )
    .join('');

  autocompleteResults.innerHTML = recommendationHTML;

  const autocompleteItems = autocompleteResults.querySelectorAll(
    '.autocomplete-result'
  );

  autocompleteItems.forEach(item => {
    item.addEventListener('click', function () {
      searchBox.value = item.textContent;
      autocompleteResults.innerHTML = '';
    });
  });
});

// Click fuera de las recomendaciones
document.addEventListener('click', function (event) {
  if (
    event.target !== searchBox &&
    !autocompleteResults.contains(event.target)
  ) {
    autocompleteResults.innerHTML = '';
  }
});
