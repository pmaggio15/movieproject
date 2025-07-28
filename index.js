
const movieWrapper = document.querySelector('.search__box')

function renderMovie(filter) {
const movieWrapper = document.querySelector('.movies');

const movie = getMovie();

if(filter === 'A_TO_Z') {
    movie.sort((a, b) => a.title.localeCompare(b.title));
}
else if (filter === 'LOW_TO_HIGH') {
    movie.sort((a, b) => a.originalPrice - b.originalPrice);
}
else if (filter === 'RATING') {
    movie.sort((a, b) => b.rating - a.rating);
}

const movieHtml = movie
    .map((movies) => {
        return `
                <div class="movie">
                    <figure class="movie__img--wrapper">
                        <img class="movie__img" src="${movies.url}" alt="">
                        <div class="info__overlay">Buy Tickets Now</div>
                    </figure>
                    <div class="movie__title">${movies.title}</div>
                    <div class="movie__ratings">
                        ${ratingsHTML(movies.rating)}
                    </div>
                    <h1 class="reviews">
                        <p class="review__para">
                            ${movies.review}
                        </p>
                    </h1>
                </div>`;
        })
        .join("");

movieWrapper.innerHTML = movieHtml;
}

function searchChange(event) {
    renderMovies(event.target.value)
}

async function renderMovies(searchTerm) {
    const response = await fetch('https://www.omdbapi.com/?s=${searchTerm}&apikey=${fdeb603c}'); //need to add https: searchable s${}
    const data = await response.json();
    const moviesArr = data;
    console.log(moviesArr);
    movieWrapper.innerHTML = moviesArr.slice(0, 3).map((movie) => {
        return `
         <div class="venue">
                    <figure class="venue__img--wrapper">
                        <img class="venue__img" src="${movie.url}" alt="">
                        <div class="info__overlay">More information</div>
                    </figure>
                    <div class="venue__title">${movie.title}</div>
                    <h1 class="reviews">
                        <p class="review__para">
                            ${movie.review}
                        </p>
                    </h1>
                </div>
                `;
    }).join("")
}

  
function ratingsHTML(rating) {
    let ratingHTML = "";
    for (let i = 0; i < Math.floor(rating); ++i) {
        ratingHTML += '<i class="fa-solid fa-star"></i>\n';
    }
    if (!Number.isInteger(rating)) {
        ratingHTML += '<i class="fa-solid fa-star-half"></i>'
    }
    return ratingHTML;
}

function filterMovies (event) {
    renderMovie(event.target.value);
}

setTimeout (() => {
    renderMovie();
});

// FAKE DATA //
function getMovie () {
    return [        
        {
            id: 1,
            title: "The 1915 Barn",
            url: "assets/1915 Barn.jpeg",
            originalPrice: 10000,
            rating: 5.0,
            review: "“The garden ceremony was straight out of a fairytale book.” — Emily & Jordan",
        },   
        {
            id: 2,
            title: "Lazy B Barn",
            url: "assets/The lazy b barn.jpeg",
            originalPrice: 8000,
            rating: 4.5,
            review: "“Our guests are still talking about how romantic our wedding was!” — Olivia & Ethan",
        
        },
        {
            id: 3,
            title: "Star M Barn",
            url: "assets/star M barn.jpeg",
            originalPrice: 11000,
            rating: 5,
            review: "“From the moment we toured the property, we knew it was the one for us!” — Priya & Michael",
           
        },
        {
            id: 4,
            title: "Gallatin River Hideaway",
            url: "assets/Gallatin River.jpeg",
            originalPrice: 6000,
            rating: 3,
            review: "“Professional, polished, and personal. We had the sweetest send-off with sparklers.” — Anna & Tim",
        },
        {
            id: 5,
            title: "Woodlands At Canyon",
            url: "assets/woodland.jpeg",
            originalPrice: 9000,
            rating: 4,
            review: "“A hidden gem! The rustic barn has so much character, and the outdoor lawn is pristine.” — Hannah & Marcus",
        },
        {
            id: 6,
            title: "The Chateau Event Center",
            url: "assets/The Chateu.jpeg",
            originalPrice: 16000,
            rating: 3.5,
            review: "“Every detail was impeccable—the floral backdrop was stunning and the service was flawless.” — Sofia & Luis",
            
        }
    ]
}