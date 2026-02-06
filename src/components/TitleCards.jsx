import React, { useEffect, useRef, useState } from 'react';
import cards_data from '../assets/cards/Cards_data';
import {Link} from 'react-router-dom'




const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([]);
  
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTVmN2I1ODY4ZGZmYmY0MjU5MWUwNTRlYjE3MzZmNiIsIm5iZiI6MTc3MDMyMTc4OC4yMjg5OTk5LCJzdWIiOiI2OTg0Zjc3Y2JlMmRhNmFjOTMzNjM3ZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AGaM57okD8OO9MzBBvzjTxtYjW8SJ95xL76b01M5tKM'
  }
};


const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() =>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className="titlecards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card__list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
