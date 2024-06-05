document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");

  const moviesLink = document.getElementById("movies-link");
  const aboutLink = document.getElementById("about-link");

  moviesLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadMovies();
  });

  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadAbout();
  });

  const loadAbout = () => {
    mainContent.innerHTML = `
        <div class="about-container">
        <h2>About Us</h2>
        <p class="p" >Welcome to our movie page!

        In this exciting space, we delve into the fascinating world of cinema in all its forms and genres. We are a team of movie enthusiasts dedicated to providing you with a unique and thrilling cinematic experience.
        
        Our mission is to share our passion for movies and provide you with resources to discover new films, revisit timeless classics, and explore the vast universe of cinema. Whether you're a seasoned cinephile or simply seeking entertainment, we're here for you.
        
        On our page, you'll find honest reviews, carefully curated recommendations, and informative articles covering everything related to the world of film. From in-depth critiques to must-watch movie lists, we're committed to delivering quality content that enhances your movie-watching experience.
        
        Moreover, we love interacting with our community of movie buffs. So feel free to leave us your comments, share your thoughts, and join the conversation!
        
        Join us on this thrilling journey through the world of cinema!</p>
    </div>
        `;
  };

  const loadMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=432fbe8327d23760a3e88a6c24652d16&language=en-US&page=1";
    const response = await fetch(url);
    const data = await response.json();
    let movies = data.results;
    //  <aside class="sidebar ">
    //                 <h2>Filter </h2>
    //                 <input  class="search" type="text" placeholder="Search..." id="search-box">
    //                 <svg viewBox="0 0 24 24" class="search__icon">
    //                 <g>
    //                   <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
    //                   </path>
    //                 </g>
    //               </svg>
    //             </aside>
    mainContent.innerHTML = `
        <div class="container">
           
<div class="search-container">
    <input class="input" type="text" placeholder="Search..." id="search-box">
  
</div>
            <div class="movies moviePage">
                ${movies
                  .map(
                    (movie) => `
                    
                        <a class="movie-card" href="#" onclick="showDetail(${movie.id})">
                            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="${movie.title}">
                            <div class="details">
                                <h1>${movie.title}</h1>
                                <p>Released ${movie.release_date}</p>
                            </div>
                        </a>
                `
                  )
                  .join("")}
            </div>

        </div>
        `;

    document.getElementById("search-box").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const movieCards = document.querySelectorAll(".movie-card");

      movieCards.forEach((card) => {
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

    const genres = movie.genres.map((genre) => genre.name).join(", ");

    mainContent.innerHTML = `
            <article class="detailPage">
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

  loadMovies();
});
