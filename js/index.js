document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");
    // const homeLink = document.getElementById("home-link");
    const moviesLink = document.getElementById("movies-link");
    // const aboutLink = document.getElementById("about-link");

    // homeLink.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     loadHome();
    //  });

    moviesLink.addEventListener("click", (e) => {
        e.preventDefault();
        loadMovies();
    });

    //  aboutLink.addEventListener("click", (e) => {
    //    e.preventDefault();
    //   loadAbout();
    //  });

    const loadHome = () => {
        mainContent.innerHTML = `
            <h1>Welcome to Movie Project</h1>
            <p>This is the home page.</p>
        `;
    };

    const loadAbout = () => {
        mainContent.innerHTML = `
            <h1>About Us</h1>
            <p>This is the about page.</p>
        `;
    };

    const loadMovies = async () => {
        const url = "https://api.themoviedb.org/3/movie/popular?api_key=432fbe8327d23760a3e88a6c24652d16&language=en-US&page=1";
        const response = await fetch(url);
        const data = await response.json();
        let movies = data.results;

        mainContent.innerHTML = `
            <aside class="sidebar">
                <h2>Search Movies</h2>
                <input  class="input" type="text" placeholder="Search..." id="search-box">
            </aside>
            <div class="movies moviePage">
                ${movies.map(movie => `
                    
                        <a class="movie-card" href="#" onclick="showDetail(${movie.id})">
                            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
                            <div class="details">
                                <h1>${movie.title}</h1>
                                <p>Released ${movie.release_date}</p>
                            </div>
                        </a>
              
                `).join('')}
            </div>
        `;

        document.getElementById("search-box").addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const movieCards = document.querySelectorAll(".movie-card");

            movieCards.forEach(card => {
                const title = card.querySelector("h1");
                if (title && title.innerHTML.toLowerCase().includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    };

    window.showDetail = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=432fbe8327d23760a3e88a6c24652d16&language=en-US`;
        const response = await fetch(url);
        const movie = await response.json();

        const genres = movie.genres.map(genre => genre.name).join(', ');

        mainContent.innerHTML = `
            <article class="detailPage">
                <header>
                    <nav>
                        <a href="#" id="back-link" class="backLink">Movies</a>
                    </nav>
                </header>
                <div class="background" style="background-image: url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path});">
                    <div class="summary">
                        <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
                        <div class="details">
                            <h1>${movie.title} <span class="rating">${movie.vote_average}</span></h1>
                            <p>${movie.overview}</p>
                            <p>Genres: ${genres}</p>
                            <p>Release Date: ${movie.release_date}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;

        document.getElementById("back-link").addEventListener("click", (e) => {
            e.preventDefault();
            loadMovies();
        });
    };

    loadHome();
});



//     const loadMovies = async () => {
//         const url = "https://api.themoviedb.org/3/movie/popular?api_key=432fbe8327d23760a3e88a6c24652d16&language=en-US&page=1";
//         const response = await fetch(url);
//         const data = await response.json();
//         const movies = data.results;

//         mainContent.innerHTML = `
//             <div class="movies moviePage">
//                 ${movies.map(movie => `
                   
//                         <a href="#" onclick="showDetail(${movie.id})">
//                             <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
//                             <div class="details">
//                                 <h1>${movie.title}</h1>
//                                 <p>Released ${movie.release_date}</p>
//                             </div>
//                         </a>
              
//                 `).join('')}
//             </div>
//         `;
//     };

//     window.showDetail = async (id) => {
//         const url = `https://api.themoviedb.org/3/movie/${id}?api_key=432fbe8327d23760a3e88a6c24652d16&language=en-US`;
//         const response = await fetch(url);
//         const movie = await response.json();

//         const genres = movie.genres.map(genre => genre.name).join(', ');

//         mainContent.innerHTML = `
//             <article class="detailPage">
//                 <header>
//                     <nav>
//                         <a href="#" id="back-link" class="backLink">Movies</a>
//                     </nav>
//                 </header>
//                 <div class="background" style="background-image: url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path});">
//                     <div class="summary">
//                         <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
//                         <div class="details">
//                             <h1>${movie.title} <span class="rating">${movie.vote_average}</span></h1>
//                             <p>Genres: ${genres}</p>
//                             <p>${movie.overview}</p>
//                             <p>Length ${movie.runtime} min</p>
                            
//                         </div>
//                     </div>
//                 </div>
//             </article>
//         `;

//         document.getElementById("back-link").addEventListener("click", (e) => {
//             e.preventDefault();
//             loadMovies();
//         });
//     };

//     loadMovies();
// });
