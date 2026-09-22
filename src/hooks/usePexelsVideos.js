// hooks/usePexelsVideos.js
// Example usage:
//   const { videos, loading, error } = usePexelsVideos('biology', 6);
//   videos[0].url is a playable mp4 you can drop straight into <video src=...>

import { useState, useEffect } from 'react';

const API_BASE = import.meta.env?.VITE_ALCB_API_URL || 'http://localhost:4000';

export default function usePexelsVideos(query, perPage = 6) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/media/videos?query=${encodeURIComponent(query)}&perPage=${perPage}`
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          if (data.success) {
            setVideos(data.videos);
          } else {
            setError(data.error || 'Failed to load videos');
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      cancelled = true;
    };
  }, [query, perPage]);

  return { videos, loading, error };
}