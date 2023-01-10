import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useQuestions(videoId) {
  const [loading, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      // Database related work
      const db = getDatabase(); // For database
      const quizRef = ref(db, `quiz/${videoId}/questions`); // For database nodes
      const quizQuery = query(
        quizRef, // Node references
        orderByKey(),
      );

      try {
        setError(false);
        setLoding(true);
        // Request for database
        const snapshort = await get(quizQuery);
        setLoding(false);
  
        // console.log(snapshort);

        if(snapshort.exists())
          setQuestions((prevQuestions) => [...prevQuestions, ...Object.values(snapshort.val())]);

      } catch(err) {
        console.log(err);
        setLoding(false);
        setError(true);
      }
    } // In firebase videos is a Key & it's children are Nodes

    // setTimeout(() => fetchVideos(), 1000); // To see the lazy loading

    fetchQuestions();
    
  }, [videoId]);

  return {
    loading,
    error,
    questions
  };
}
