// api.js
// const baseUrl = "https://api.themoviedb.org/3";
// const imageUrlW500 = "https://image.tmdb.org/t/p/w500";
// const imageUrlOriginal = "https://image.tmdb.org/t/p/original";
// const apiKey = "cb11d614163692e7049f74d70b7342da"; // Replace with your TMDB API key

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = ""; // Ganti dengan API Key Anda
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_URL = "https://www.youtube.com/embed/";

export function getImageUrl(path) {
  return path
    ? `${IMAGE_BASE_URL}${path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
}

export function getYoutubeUrl(key) {
  return `${YOUTUBE_URL}${key}`;
}

export async function fetchData(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  // Tambahkan parameter API Key dan parameter lainnya
  url.searchParams.append("api_key", API_KEY);
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Mendapatkan film populer dengan kemampuan memuat lebih banyak halaman
export async function getPopularMovies(page = 10) {
  return fetchData("/movie/popular", { page });
}

// Mendapatkan film yang sedang tayang
export async function getNowPlayingMovies(page = 10) {
  return fetchData("/movie/now_playing", { page });
}

// Fungsi pencarian film berdasarkan query
export async function searchMovies(query, page = 10) {
  return fetchData("/search/movie", { query, page });
}

// Mendapatkan detail film berdasarkan ID
export async function getMovieDetails(id) {
  try {
    // Get both movie details and videos in parallel
    const [movieData, videosData] = await Promise.all([
      fetchData(`/movie/${id}`),
      fetchData(`/movie/${id}/videos`),
    ]);

    // Filter for YouTube trailers and teasers
    const trailers = videosData.results
      .filter(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      )
      .map((video) => ({
        id: video.id,
        key: video.key,
        name: video.name,
        type: video.type,
        url: getYoutubeUrl(video.key),
        thumbnail: `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`,
      }));

    // Return combined data
    return {
      ...movieData,
      trailers,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

// Mendapatkan semua film dari berbagai endpoint
export async function getAllMoviesFromEndpoints(maxPages = 1000) {
  const allMovies = new Set(); // Menggunakan Set untuk menghindari duplikasi

  try {
    for (let page = 1; page <= maxPages; page++) {
      const [popular, nowPlaying] = await Promise.all([
        getPopularMovies(page),
        getNowPlayingMovies(page),
      ]);

      if (popular?.results) {
        popular.results.forEach((movie) =>
          allMovies.add(JSON.stringify(movie))
        );
      }
      if (nowPlaying?.results) {
        nowPlaying.results.forEach((movie) =>
          allMovies.add(JSON.stringify(movie))
        );
      }
    }
  } catch (error) {
    console.error("Error fetching movies from multiple endpoints:", error);
    throw error;
  }

  // Ubah kembali Set menjadi array
  return Array.from(allMovies).map((movie) => JSON.parse(movie));
}
