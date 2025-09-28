const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const YOUTUBE_URL = import.meta.env.VITE_YOUTUBE_URL;

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

export async function getPopularMovies(page = 1) {
  return fetchData("/movie/popular", { page });
}

export async function getNowPlayingMovies(page = 1) {
  return fetchData("/movie/now_playing", { page });
}

export async function searchMovies(query, page = 1) {
  return fetchData("/search/movie", { query, page });
}

export async function getMovieDetails(id) {
  try {
    const [movieData, videosData] = await Promise.all([
      fetchData(`/movie/${id}`),
      fetchData(`/movie/${id}/videos`),
    ]);

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

    return {
      ...movieData,
      trailers,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function getAllMoviesFromEndpoints(maxPages = 1000) {
  const allMovies = new Set();

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

  return Array.from(allMovies).map((movie) => JSON.parse(movie));
}
