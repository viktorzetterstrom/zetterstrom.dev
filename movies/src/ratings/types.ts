export enum FormatType {
  SERIES = "tvSeries",
  MOVIE = "movie",
}

export interface Rating {
  rating: number;
  title: string;
  url: string;
  type: FormatType;
  imdbRating: number;
  imdbVotes: number;
  runtimeMinutes: number;
  year: string;
  genres: string;
  released: string;
  directors: string;
}

export interface ImdbRating {
  const: string;
  "Your Rating": string;
  "Date Rated": string;
  Title: string;
  URL: string;
  "Title Type": FormatType;
  "IMDb Rating": string;
  "Runtime (mins)": string;
  Year: string;
  Genres: string;
  "Num Votes": string;
  "Release Date": string;
  Directors: string;
}
