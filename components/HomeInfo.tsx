import React from "react";
import { MdOutlineMusicNote } from "react-icons/md";
import { MdOutlineLocalMovies } from "react-icons/md";

const HomeInfo = () => {
  return (
    <div className="container">
      {/* playList */}
      <div className="play-container">
        <div className="title">
          <MdOutlineMusicNote />
          My PlayList
        </div>
        <ul>
          {playList.map((song) => (
            <li key={song.id}>
              <img src={`/playlist/${song.id}.jpg`} />
              <div className="info-box">
                <div>{song.title}</div>
                <div>{song.singer}</div>
                <div className="space-between">
                  <span>{song.genre}</span>
                  <span>{song.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* movieList */}
      <div className="movie-container">
        <div className="title">
          <MdOutlineLocalMovies />
          My MovieList
        </div>
        <ul>
          {movieList.map((movie) => (
            <li key={movie.id}>
              <img src={`/movielist/${movie.id}.jpg`} />
              <div className="movie-info-box">
                <div>{movie.title}</div>
                <div>{movie.director} 감독</div>
                <div>{movie.date}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
        }
        .play-container {
          margin-bottom: 20px;
        }
        .title {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          column-gap: 3px;
        }
        ul {
          margin-bottom: 10px;
        }
        .movie-container ul {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 300px;
          overflow: auto;
          padding-bottom: 10px;
        }
        li {
          position: relative;
          display: flex;
          align-items: center;
          column-gap: 10px;
          margin-bottom: 10px;
        }
        .movie-container li {
          margin-right: 10px;
        }
        .play-container img {
          width: 100px;
          height: 100px;
          border-radius: 12px;
          object-fit: contain;
        }
        .movie-container img {
          position: relative;
          width: 120px;
          height: 180px;
          border-radius: 12px;
          object-fit: contain;
        }
        li .info-box {
          display: flex;
          flex-direction: column;
          row-gap: 5px;
        }
        li .movie-info-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          display: none;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          border-radius: 12px;
        }
        li:hover .movie-info-box {
          opacity: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          row-gap: 4px;
          font-size: 14px;
        }
        li .movie-info-box div:first-child {
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 10px;
        }
        li .info-box div:first-child {
          font-weight: 800;
        }
        li .space-between {
          margin-top: 10px;
        }
        li .space-between span:first-child {
          margin-right: 16px;
        }
      `}</style>
    </div>
  );
};

const playList = [
  {
    id: 1,
    title: "나무",
    genre: "발라드",
    singer: "카더가든",
    date: "2019.04.16",
  },
  {
    id: 2,
    title: "1994",
    genre: "POP",
    singer: "Alec Benjamin",
    date: "2018.11.02",
  },
  {
    id: 3,
    title: "헤어지자 말해요",
    genre: "발라드",
    singer: "박재정",
    date: "2023.04.20",
  },
  {
    id: 4,
    title: "있어주라",
    genre: "랩/힙합, 인디음악",
    singer: "Kid Wine",
    date: "2020.06.14",
  },
  {
    id: 5,
    title: "반복",
    genre: "랩/힙합",
    singer: "한요한",
    date: "2020.02.08",
  },
];

const movieList = [
  {
    id: 1,
    title: "아바타:물의 길",
    director: "James Cameron",
    date: "2022.12.14",
  },
  {
    id: 2,
    title: "내부자들",
    director: "우민호",
    date: "2015.11.19",
  },
  {
    id: 3,
    title: "어벤져스:엔드게임",
    director: "Joe Russo",
    date: "2019.04.24",
  },
  {
    id: 4,
    title: "써클",
    director: "Mario Miscione",
    date: "2015.05.28",
  },
  {
    id: 5,
    title: "기생충",
    director: "봉준호",
    date: "2019.05.30",
  },
];

export default HomeInfo;
