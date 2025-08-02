const moviesWrapper = document.querySelector(".movies");
const searchInput  = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const loadingEl = document.getElementById("loading");
const searchBtn    = document.getElementById("searchBtn");
const appContent = document.getElementById("appContent");
const attribution = document.createElement("div");


attribution.id = "attribution";
attribution.innerHTML = `Streaming data powered by <a href="https://www.watchmode.com" target="_blank">Watchmode.com</a>`;
document.body.appendChild(attribution);


let debounceTimeout;
function debounceRenderMovies(term) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    renderMovies(term);
  }, 1000);  // ⬅️ increase delay to reduce 429 rate-limits
}

filterSelect.addEventListener('change', () => {
  if (!filterSelect.value) {
    moviesWrapper.innerHTML = ""
  } else {
    renderMovies(searchInput.value)
  }
})

async function getReleases() {
  await new Promise(res => setTimeout(res, 1000));
  const response = await fetch("https://api.watchmode.com/v1/releases/?apiKey=hAU9lCluAtDwEpHsN29dAdcv1tsjQw6qV3A9WvFX");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.releases;
}


async function renderMovies (searchTerm = "") {
appContent.style.display = "none";
loadingEl.classList.add("active");
moviesWrapper.innerHTML = "";

  try {
    const releases = await getReleases();

    let list = releases.filter(m => Boolean(m.poster_url));
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter(m =>
        m.title.toLowerCase().includes(term) ||
        m.source_name.toLowerCase().includes(term)
      );
    }

    const sortType = filterSelect.value
    if (sortType === "MOVIE") {
    list = list.filter(m => m.tmdb_type === "movie");
    } else if (sortType === "TV SHOWS") {
    list = list.filter(m => m.tmdb_type === "tv");
    }
    if (list.length === 0) {
      moviesWrapper.innerHTML = `
        <div class="no-results">
          <p>"${searchTerm}" is not showing at our theater. Please try a different search term.</p>
        </div>
      `;
      return;
    }

    moviesWrapper.innerHTML = list.slice(0, 9).map((movie) => {
        return `
          <div class="movie">
                <figure class="movie__img--wrapper">
                    <img class="movie__img" src="${movie.poster_url}" alt="">
                    <div class="info__overlay">Buy Tickets Now</div>
                </figure>
                <div class="movie__title">${movie.title}</div>
                <div class="movie__type">Type: ${movie.source_name}</div>
                <h1 class="release__date">${movie.source_release_date}</h1>
            </div>
        `
    }).join("");


  } catch (err) {
    console.error("renderMovies errors:", err);
    moviesWrapper.innerHTML = "<p>Failed to load movies.</p>";
  } finally {
    loadingEl.classList.remove("active");
    appContent.style.display = "";
  }
    
}

searchBtn.addEventListener("click",  () => renderMovies(searchInput.value));
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    renderMovies(searchInput.value);
  }
});
