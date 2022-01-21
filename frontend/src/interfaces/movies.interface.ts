export interface MovieInterface {
  _id: string;
  title: string;
  poster: string;
  plot: string;
  rated: string;
  reviews: ReviewInterface[];
}

export interface ReviewInterface {
  _id: string;
  review: string;
  name: string;
  date: Date;
}