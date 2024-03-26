export interface IUser {
  _id: string;
  phone_number: string;
  name: string;
  email: string;
  role: string;
  verify_otp: false;
  avatar: string;
  totalReviews: number;
}

export interface ICreateStore {
  name: string;
  slogan: string;
  cuisine_national: string;
  open_time: string;
  close_time: string;
  address: string;
  images: FileList;
  phone_number: string;
  price_highest: string;
  price_lowest: string;
  province: string;
}

export interface IReadStore extends ICreateStore {
  _id: string;
  owner: IUser;
}

export interface ICreateReview {
  author: string; // id author
  store: string; // id store
  content: string;
  images: FileList;
  rating: {
    serve: number;
    price: number;
    space: number;
    smell: number;
    food_safety: number;
  };
}

export interface IReview {
  rating: {
    serve: number;
    price: number;
    space: number;
    smell: number;
    food_safety: number;
  };
  _id: string;
  author: IUser;
  store: IStore;
  title: string;
  content: string;
  images: string[];
  created_at: string;
  comments: IComment[];
  favourities: string[];
}

export interface IStore {
  _id: string;
  name: string;
  slogan: string;
  cuisine_national: string;
  images: string[];
  open_time: string;
  close_time: string;
  price_highest: number;
  price_lowest: number;
  address: string;
  owner: string;
}

export interface IComment {
  author: IUser;
  content: string;
  created_at: string;
}
export interface IStoreDetail {
  serve: number;
  price: number;
  food_safety: number;
  space: number;
  smell: number;
  total_rating: number;
  foundReviews: IReview[];
  foundStore: IStore;
}

export interface ICreateComment {
  author: string;
  content: string;
}

export interface IStoreRead {
  name: string;
  slogan: string;
  cuisine_national: string;
  open_time: string;
  close_time: string;
  address: string;
  images: FileList;
  phone_number: string;
  price_highest: string;
  price_lowest: string;
  province: string;
  _id: string;
}

export interface IReviewCuisine {
  author: IUser;
  comments: string[];
  images: string[];
  favourities: string[];
  store: IStoreRead;
  title: string;
  content: string;
  _id: string;
  created_at: string;
}
