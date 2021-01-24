import React from "react";
import { Rating, FormatType } from "../ratings/types";

const generateRating = ({ title, rating, year, runtimeMinutes }: Rating) => (
  <li key={title}>
    <span className={`rating rating-${rating}`}>{rating}</span>
    {title} - {year} - {runtimeMinutes}m
  </li>
);

type RatingProps = { ratings: Rating[] };
export const Ratings: React.FC<RatingProps> = ({ ratings }) => (
  <div>
    <h1>movies.zetterstrom.dev</h1>
    <div>
      <h2>movies</h2>
      <ul>
        {ratings
          .filter(({ type }) => type === FormatType.MOVIE)
          .map(generateRating)}
      </ul>
    </div>
    <p>--------------------------------------------------------------------</p>
    <div>
      <h2>tv-series</h2>
      <ul>
        {ratings
          .filter(({ type }) => type === FormatType.SERIES)
          .map(generateRating)}
      </ul>
    </div>
  </div>
);
