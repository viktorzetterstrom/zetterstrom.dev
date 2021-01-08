import React from "react";
import { Rating, FormatType } from "../ratings/types";

type RatingProps = { ratings: Rating[] };
export const Ratings: React.FC<RatingProps> = ({ ratings }) => (
  <div>
    <h1>Movie Ratings</h1>
    <div>
      <h2>Movies</h2>
      <ul>
        {ratings
          .filter(({ type }) => type === FormatType.MOVIE)
          .map(({ title, rating, url }) => (
            <li key={title}>
              <a target="_blank" href={url}>
                {title}
              </a>{" "}
              - {rating}
            </li>
          ))}
      </ul>
    </div>
    <div>
      <h2>TV Series</h2>
      <ul>
        {ratings
          .filter(({ type }) => type === FormatType.SERIES)
          .map(({ title, rating, url }) => (
            <li key={title}>
              <a target="_blank" href={url}>
                {title}
              </a>{" "}
              - {rating}
            </li>
          ))}
      </ul>
    </div>
  </div>
);
