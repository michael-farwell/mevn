export interface Movie {
  _id: string;
  title: string;
  poster: string;
  plot: string;
  rated: string;
  reviews: Review[];
}

export interface Review {
  _id: string;
  user_id: number;
  movie_id: number;
  editing: boolean;
  review: string;
  name: string;
  date: Date;
}