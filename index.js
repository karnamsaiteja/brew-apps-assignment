"use strict";

///////////////////////////////////////////////////
// CONSTANTS
///////////////////////////////////////////////////

const IMAGE_URL = `http://image.tmdb.org/t/p/w1280`;
const API_KEY = `ac5515314d4b6d0d214f1e84bb085ea9`;
const tagsEl = document.querySelector(`.tags`);
const cardsEl = document.querySelector(`.cards`);

///////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////

// Rendering Data

// const renderData = function (data) {
//   data.forEach((element, i) => {
//     const html = `
//         <div class="card">
//               <img
//                 class="card-thumbnail"
//                 src="${
//                   !element.backdrop_path
//                     ? "https://i.postimg.cc/pTsTsm2s/image-not-found-3.jpg"
//                     : IMAGE_URL + element.backdrop_path
//                 }"
//                 alt="${element.title}"
//               />
//               <div class="card-content">
//                 <p class="card-heading">${element.title} (${element.release_date
//       .split(``)
//       .splice(0, 4)
//       .join(``)})</p>
//                 <div class="card-holders">
//                   <p class="vote"><i class="fas fa-star ${getClassByRate(
//                     element.vote_average
//                   )}"></i>&nbsp;&nbsp;${element.vote_average}</p>
//                   <span class="vote-count">(${
//                     element.vote_count
//                   } ratings)</span>
//                 </div>
//               </div>
//             </div>
//         `;
//     cardsEl.innerHTML += html;
//   });
// };

const renderData = function (data) {
  for (let i = 0; i < 18; i++) {
    const html = `
        <div class="card">
              <img
                class="card-thumbnail"
                src="${
                  !data[i].backdrop_path
                    ? "https://i.postimg.cc/pTsTsm2s/image-not-found-3.jpg"
                    : IMAGE_URL + data[i].backdrop_path
                }"                
                alt="${data[i].title}"
              />
              <div class="card-content">
                <p class="card-heading">${data[i].title} (${data[i].release_date
      .split(``)
      .splice(0, 4)
      .join(``)})</p>
                <div class="card-holders">
                  <p class="vote"><i class="fas fa-star ${getClassByRate(
                    data[i].vote_average
                  )}"></i>&nbsp;&nbsp;${data[i].vote_average}</p>
                  <span class="vote-count">(${
                    data[i].vote_count
                  } ratings)</span>
                </div>
              </div>
            </div>
        `;
    cardsEl.innerHTML += html;
  }
};

// Get color by rating
const getClassByRate = function (vote) {
  if (vote >= 8) return `orange`;
  if (vote >= 5) return `green`;
  return `red`;
};

// Rendering data according to the tags clicked

const renderAccordingToTag = async function (url) {
  document.querySelector(`.loading`).style.display = `flex`;
  document.querySelector(`.load-more`).style.display = `none`;

  cardsEl.innerHTML = ``;
  const res = await fetch(
    `http://api.themoviedb.org/3${url}&api_key=${API_KEY}&page=1`
  );
  const data = await res.json();
  document.querySelector(`.loading`).style.display = `none`;
  renderData(data.results);
  document.querySelector(`.load-more`).style.display = `flex`;
};

const loadMore = async function (url) {
  document.querySelector(`.loading-2`).style.display = `flex`;
  document.querySelector(`.load-more`).style.display = `none`;

  const res = await fetch(
    `http://api.themoviedb.org/3${url}&api_key=${API_KEY}&page=2`
  );
  const res2 = await fetch(
    `http://api.themoviedb.org/3${url}&api_key=${API_KEY}&page=3`
  );
  const data = await res.json();
  const data2 = await res2.json();
  document.querySelector(`.load-more`).style.display = `none`;

  renderData(data.results);
  renderData(data2.results);
  document.querySelector(`.loading-2`).style.display = `none`;
};

// Toggling style of tags

const toggleTag = function (nameOfClass) {
  document
    .querySelectorAll(`.btn`)
    .forEach((curr) => curr.classList.remove(`active`));
  document.querySelector(nameOfClass).classList.add(`active`);
};

// INITIAL STATE

renderAccordingToTag(`/discover/movie?sort_by=popularity.desc`);
///////////////////////////////////////////////////
// EVENT DELEGATION
///////////////////////////////////////////////////
let urlEndpoint;

tagsEl.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`trending`)) {
    toggleTag(".trending");
    urlEndpoint = `/discover/movie?sort_by=popularity.desc`;
    renderAccordingToTag(urlEndpoint);
  }
  if (e.target.classList.contains(`highest-gross`)) {
    toggleTag(".highest-gross");
    urlEndpoint = `/discover/movie?&sort_by=revenue.desc`;

    renderAccordingToTag(urlEndpoint);
  }
  if (e.target.classList.contains(`david-fincher`)) {
    toggleTag(".david-fincher");
    urlEndpoint = `/discover/movie?with_people=7467&sort_by=popularity.desc`;

    renderAccordingToTag(urlEndpoint);
  }
  if (e.target.classList.contains(`kids`)) {
    toggleTag(".kids");
    urlEndpoint = `/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc`;

    renderAccordingToTag(urlEndpoint);
  }
  if (e.target.classList.contains(`scifi`)) {
    toggleTag(".scifi");
    urlEndpoint = `/discover/movie?with_genres=878&sort_by=vote_average.desc&vote_count.gte=100`;

    renderAccordingToTag(urlEndpoint);
  }
  if (e.target.classList.contains(`drama`)) {
    toggleTag(".drama");
    urlEndpoint = `/discover/movie?with_genres=18`;

    renderAccordingToTag(urlEndpoint);
  }
  if (e.target.classList.contains(`comedies`)) {
    toggleTag(".comedies");
    urlEndpoint = `/discover/movie?with_genres=35&sort_by=revenue.desc`;

    renderAccordingToTag(urlEndpoint);
  }
});

console.log(urlEndpoint);
