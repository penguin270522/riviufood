export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  countPost: number;
  countLocation: number;
}
export interface IDistrict {
  id: string;
  name: string;
  value: string;
}
export interface INational {
  id: string;
  name: string;
  value: string;
}

export interface ICreateStore {
  name: string;
  watch_word: string;
  locationFood_id: number;
  openTime: string;
  closeTime: string;
  address: string;
  numberPhone: string;
  highestPrince: string;
  lowestPrince: string;
  area_id: number;
}

export interface IReadStore extends ICreateStore {
  id: string;
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
  id: string;
  author: IUser;
  store: IStore;
  title: string;
  content: string;
  images: string[];
  created_at: string;
  comments: IComment[];
  favourities: string[];
}
export interface ILocationReview {
  id: number;
  name: string;
  value: string;
  countLocation: string;
}
export interface IStore {
  name: string;
  watch_word: string;
  locationFood_id: number;
  openTime: string;
  closeTime: string;
  address: string;
  //images: FileList;
  numberPhone: string;
  highestPrince: string;
  lowestPrince: string;
  area_id: number;
  id: string;
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
  watch_word: string;
  locationFood_id: number;
  openTime: string;
  closeTime: string;
  address: string;
  //images: FileList;
  numberPhone: string;
  highestPrince: string;
  lowestPrince: string;
  area_id: number;
  id: string;
}

export interface IReviewCuisine {
  author: IUser;
  comments: string[];
  images: string[];
  favourities: string[];
  store: IStoreRead;
  title: string;
  content: string;
  id: string;
  created_at: string;
}
