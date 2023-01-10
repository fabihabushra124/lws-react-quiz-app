import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useVideoList(page) {
  const [loading, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      // Database related work
      const db = getDatabase(); // For database
      const videosRef = ref(db, 'videos'); // For database nodes
      const videoQuery = query(
        videosRef, // Node references
        orderByKey(),
        // eslint-disable-next-line prefer-template
        startAt('' + page), // Starting page, page number should be a string
        limitToFirst(8) // Per page items
      );

      try {
        setError(false);
        setLoding(true);
        // Request for database
        const snapshort = await get(videoQuery);
        setLoding(false);
  
        // console.log(snapshort);

        if(snapshort.exists()) {
          setVideos((prevVideos) => [...prevVideos, ...Object.values(snapshort.val())]);
        } else {
          setHasMore(false); 
        }

      } catch(err) {
        console.log(err);
        setLoding(false);
        setError(true);
      }
    } // In firebase videos is a Key & it's children are Nodes

    // setTimeout(() => fetchVideos(), 1000); // To see the lazy loading

    fetchVideos();
    
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore
  };
}
