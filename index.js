const moviesWrapper = document.querySelector(".movies")

function searchChange(event) {
    console.log(event.target.value);
}

async function renderMovies () {
    const response = await fetch('https://api.watchmode.com/v1/releases/?apiKey=CF6lCCsw66HpPjQduwhTskwF6OB6tCKbtWKPzBcH');
    const data = await response.json();
    const moviesArr = data.releases;
    
    moviesWrapper.innerHTML = moviesArr.slice(0, 3).map((movie) => {
        return `
          <div class="movie">
                <figure class="movie__img--wrapper">
                    <img class="movie__img" src="${movie.poster_url}" alt="">
                    <div class="info__overlay">Buy Tickets Now</div>
                </figure>
                <div class="movie__title">${movie.title}</div>
                <h1 class="release__date">${movie.source_release_date}</h1>
            </div>
        `
    }).join("");
}

renderMovies();