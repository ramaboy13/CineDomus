const API_KEY = import.meta.env.VITE_NEWS_API_KEY; 
const BASE_URL = "https://newsapi.org/v2";

export async function fetchEntertainmentNews(page = 1, pageSize = 9) {
  const url = `${BASE_URL}/top-headlines?category=entertainment&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== "ok") {
      console.error("Error fetch news:", data);
      return [];
    }
    // map ke bentuk yang kamu pakai di component
    return data.articles.map((art, idx) => ({
      id: art.url + idx,
      title: art.title,
      excerpt: art.description || "",
      image: art.urlToImage,
      date: art.publishedAt ? new Date(art.publishedAt).toLocaleDateString() : "",
      author: art.author || art.source.name || "Unknown",
      url: art.url
    }));
  } catch (err) {
    console.error("Fetch news error:", err);
    return [];
  }
}
