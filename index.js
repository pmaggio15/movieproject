// const venues = [
//   "The 1915 Barn",
//   "Lazy B Barn",
//   "Star M Bar",
//   "Gallatin River Hideaway Wedding And Event Venues",
//   "Woodlands At Cottonwood Canyon",
//   "The Chateau Event Center",
// ];
const venueWrapper = document.querySelector('.search__box')

function renderVenue(filter) {
const venueWrapper = document.querySelector('.venues');

const venue = getVenue();

if(filter === 'A_TO_Z') {
    venue.sort((a, b) => a.title.localeCompare(b.title));
}
else if (filter === 'LOW_TO_HIGH') {
    venue.sort((a, b) => a.originalPrice - b.originalPrice);
}
else if (filter === 'RATING') {
    venue.sort((a, b) => b.rating - a.rating);
}

const venueHtml = venue
    .map((venues) => {
        return `
                <div class="venue">
                    <figure class="venue__img--wrapper">
                        <img class="venue__img" src="${venues.url}" alt="">
                        <div class="info__overlay">More information</div>
                    </figure>
                    <div class="venue__title">${venues.title}</div>
                    <div class="venue__ratings">
                        ${ratingsHTML(venues.rating)}
                    </div>
                    <h1 class="reviews">
                        <p class="review__para">
                            ${venues.review}
                        </p>
                    </h1>
                </div>`;
        })
        .join("");

venueWrapper.innerHTML = venueHtml;
}

function searchChange(event) {
    renderVenues(event.target.value)
}

async function renderVenues(searchTerm) {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=345f8c7db76570b43779c3840b4d2e7a'); //need to add https: searchable s${}
    const data = await response.json();
    const venuesArr = data;
    console.log(venuesArr);
    venueWrapper.innerHTML = venuesArr.slice(0, 3).map((venues) => {
        return `
         <div class="venue">
                    <figure class="venue__img--wrapper">
                        <img class="venue__img" src="${venues.url}" alt="">
                        <div class="info__overlay">More information</div>
                    </figure>
                    <div class="venue__title">${venues.title}</div>
                    <h1 class="reviews">
                        <p class="review__para">
                            ${venues.review}
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

function filterVenues (event) {
    renderVenue(event.target.value);
}

setTimeout (() => {
    renderVenue();
});

// FAKE DATA //
function getVenue () {
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