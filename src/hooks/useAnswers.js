import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useAnswers(videoId) {
  const [loading, setLoding] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      // Database related work
      const db = getDatabase(); // For database
      const answersRef = ref(db, `answers/${videoId}/questions`); // For database nodes
      const answerQuery = query(
        answersRef, // Node references
        orderByKey(),
      );

      try {
        setError(false);
        setLoding(true);
        // Request for database
        const snapshort = await get(answerQuery);
        setLoding(false);
  
        // console.log(snapshort);

        if(snapshort.exists())
          setAnswers((prevAnswers) => [...prevAnswers, ...Object.values(snapshort.val())]);

      } catch(err) {
        console.log(err);
        setLoding(false);
        setError(true);
      }
    }

    fetchAnswers();
    
  }, [videoId]);

  return {
    loading,
    error,
    answers
  };
}
