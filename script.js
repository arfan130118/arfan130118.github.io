// const btnSearch = document.querySelector('.btn-search');
// btnSearch.addEventListener('click',function () {
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=5635e58c&s='+inputKeyword.value)
// .then(response=>response.json())
// .then(response=>{
//     const movies = response.Search;
//     let cards ='';
//     movies.forEach(m=>{
//         cards+=showMovieCards(m);
//         const moviesContainer = document.querySelector('.movies-container');
//         moviesContainer.innerHTML = cards;
        
//         const btnMovieDetail = document.querySelectorAll('.btn-movie-detail');
//         btnMovieDetail.forEach(btn=>{
//             btn.addEventListener('click',function () {
//                 const imdbid = this.dataset.imdbid; 
//                 fetch('http://www.omdbapi.com/?apikey=5635e58c&i='+imdbid)
//                 .then(response=>response.json())
//                 .then(m=>{
//                     const movieDetail =showMovieDetail(m);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML = movieDetail;
//                 });
//             });
//         });
//     });
// });      
// });

// ? Refactoring
const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateMovies(movies);
});

function getMovies(keyword) {
   return fetch('http://www.omdbapi.com/?apikey=5635e58c&s='+keyword)
   .then(response=>response.json())
   .then(response=>response.Search);
}

function updateMovies(movies) {
    let cards = '';
    movies.forEach(m=>{
        cards+=showMovieCards(m);
    });

    const movieContainers = document.querySelector('.movie-containers');
    movieContainers.innerHTML = cards;
}

document.addEventListener('click',async function (e) {
    if (e.target.classList.contains('btn-movie-detail')){
        const imdbid = e.target.dataset.imdbid;
        const movie = await getMovie(imdbid);
        updateMovie(movie);
    }
});

function getMovie(imdibd) {
    return fetch('http://www.omdbapi.com/?apikey=5635e58c&i='+imdibd)
    .then(response=>response.json());
}

function updateMovie(movie) {
    const movieDetail = showMovieDetail(movie);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}



// ? Akhir Refactoring






// ! fungsi

function showMovieCards(m) {
    return `<div class="col-md-4">
    <div class="card">
        <img src=${m.Poster} class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary btn-movie-detail" data-bs-toggle="modal" 
          data-bs-target="#movie-detail-modal" data-imdbid=${m.imdbID}>Show Detail</a>
        </div>
      </div>
</div>`
}

function showMovieDetail(m) {
    return  `<div class="container-fluid">
    <div class="row">
        <div class="col-md-4">
            <img src=${m.Poster} class="img-fluid">
        </div>
        <div class="col">
          <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
              <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
              <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
              <li class="list-group-item"><strong>Write : </strong>${m.Write}</li>
              <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`   
}