import React from "react";
import { Rating } from "../ratings";

type AppProps = { ratings: Rating[] };
export const App: React.FC<AppProps> = ({ ratings }) => (
  <div>
    <h1>Movie Ratings</h1>
    <div>
      <ul>
        {ratings.map((rating) => (
          <li>
            {rating.Title}-{rating["Your Rating"]}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
