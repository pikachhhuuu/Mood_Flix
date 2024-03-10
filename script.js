const API_KEY = '3cc34579f196f9838a304fb67a2598bc';
const BASE_URL = 'https://api.themoviedb.org/3';
const recommendationsDiv = document.getElementById("recommendations");

document.getElementById("happy-btn").addEventListener("click", () => fetchMoviesByMood('happy'));
document.getElementById("sad-btn").addEventListener("click", () => fetchMoviesByMood('sad'));
document.getElementById("excited-btn").addEventListener("click", () => fetchMoviesByMood('excited'));
document.getElementById("calm-btn").addEventListener("click", () => fetchMoviesByMood('calm'));
document.getElementById("lonely-btn").addEventListener("click", () => fetchMoviesByMood('lonely'));
document.getElementById("heartbreak-btn").addEventListener("click", () => fetchMoviesByMood('heartbreak'));
document.getElementById("romance-btn").addEventListener("click", () => fetchMoviesByMood('romance'));

async function fetchMoviesByMood(mood) {
    const genreId = getGenreIdByMood(mood);
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&vote_count.gte=100`);
    const data = await response.json();
    const movies = data.results.slice(0,25); // Fetching 5 movies for each mood
    displayMovies(movies);
}

function getGenreIdByMood(mood) {
    switch (mood) {
        case 'happy':
            return 35 && 10402; // Comedy genre ID
        case 'sad':
            return 35; // humour genre ID
        case 'excited':
            return 28; // Action genre ID
        case 'calm':
            return 14; // Fantasy genre ID
        case 'lonely':  
            return 9648;  // scary genre ID
        case 'heartbreak':
            return 10751; // family genre ID
        case 'romance':
            return 10749; // Science Fiction genre ID
        default:
            return 0; // Default to no genre
    }
}

function displayMovies(movies) {
    recommendationsDiv.innerHTML = "";
    movies.forEach(movie => 
        {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        // Creating an anchor tag with the TMDb movie URL
        const movieLink = document.createElement("a");
        movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;
        movieLink.target = "_blank"; // Open link in a new tab
        movieLink.rel = "noopener noreferrer"; // Recommended for security when using target="_blank"
        movieLink.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;
        movieDiv.appendChild(movieLink);
        recommendationsDiv.appendChild(movieDiv);
    });
}
$(document).ready(function() {
    $('.popup-btn').click(function(e) {
      $('.popup-wrap').fadeIn(500);
      $('.popup-box').removeClass('transform-out').addClass('transform-in');
  
      e.preventDefault();
    });
  
    $('.popup-close').click(function(e) {
      $('.popup-wrap').fadeOut(500);
      $('.popup-box').removeClass('transform-in').addClass('transform-out');
  
      e.preventDefault();
    });
  });
