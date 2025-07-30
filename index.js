const moviesWrapper = document.querySelector(".movies")

function filterMovies(event) {
  renderMovies(event.target.value);
}

function searchChange(event) {
    renderMovies(event.target.value);
}
document.getElementById('filter').addEventListener('change', e => {
  renderMovies(e.target.value);
  
});

async function renderMovies (searchTerm = '') {
    const response = await fetch('https://api.watchmode.com/v1/releases/?apiKey=CF6lCCsw66HpPjQduwhTskwF6OB6tCKbtWKPzBcH');
    const data = await response.json();
    const moviesArr = data.releases;
    const term     = searchTerm.trim().toLowerCase();
    const filtered = moviesArr.filter(movie => {
    const titleMatch  = movie.title.toLowerCase().includes(term);
    const sourceMatch = movie.source_name.toLowerCase().includes(term);
    const hasImage     = Boolean(movie.poster_url);
    return (titleMatch || sourceMatch) && hasImage;
  });

    
    moviesWrapper.innerHTML = filtered.slice(0, 9).map((movie) => {
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
    
}

//  const filterValue = document.getElementById('filter').value;

//   let finalList = filtered;  
//   if (filterValue === 'MOVIE') {
//     finalList = finalList.filter(m => m.tmdb_type === 'movie');
//   } else if (filterValue === 'TV SHOWS') {
//     finalList = finalList.filter(m => m.tmdb_type === 'tv');
//   }

//   moviesWrapper.innerHTML = finalList.slice(0, 9).map((movie) => {
//         return `
//           <div class="movie">
//                 <figure class="movie__img--wrapper">
//                     <img class="movie__img" src="${movie.poster_url}" alt="">
//                     <div class="info__overlay">Buy Tickets Now</div>
//                 </figure>
//                 <div class="movie__title">${movie.title}</div>
//                 <div class="movie__type">Type: ${movie.source_name}</div>
//             </div>
//         `
//     }).join("");
