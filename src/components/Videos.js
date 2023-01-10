import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../hooks/useVideoList';
import classes from '../styles/Videos.module.css';
import Video from './Video';

export default function Videos() {
  const [page, setPage] = useState(1);
  const {loading, error, videos, hasMore} = useVideoList(page);
  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll 
          className={classes.videos}
          dataLength={videos.length} 
          hasMore={hasMore} 
          next={() => setPage(page + 8)}
          loader='Loading....'
        >
          {videos.map((video) => video.noq > 0 ? (
            <Link to={`/quiz/${video.youtubeID}`} 
              state={{
                videoTitle: video.title
              }}
              key={video.youtubeID}
            >
              <Video 
                title={video.title} 
                id={video.youtubeID} 
                noq={video.noq} 
              />
            </Link>
          ) :
            <Video 
              title={video.title} 
              id={video.youtubeID} 
              noq={video.noq}
              key={video.youtubeID} 
            />
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {loading && <div>Loading....</div>}
      {error && <div>There was an error!</div>}
    </div>
  );
}

/* For pagination or to load 8 items per page use firebase function - startAt(), limitToFirst()

And for infinity scroll and load use a React package - react-infinite-scroll-component
To install-- npm i react-infinite-scroll-component */