type BookProps = {
  type: 'books';
  id: string;
  attributes: {
    name: string;
    copiesSold: number;
  };
  relationships: {
    author: {
      data: {
        id: string;
        type: string;
      };
    };
  };
};

export type StoreProps = {
  type: string;
  id: string;
  attributes: {
    name: string;
    website: string;
    rating: number;
    storeImage: string;
    establishmentDate: string;
  };
  relationships: {
    countries: {
      data: {
        id: string;
        type: string;
      };
    };
    books: {
      data: BookProps[];
    };
  };
};

export type IncludedProps = {
  type: 'books' | 'authors' | 'countries';
  id: string;
  attributes: {
    [key: string]: any;
  };
  relationships: {
    [key: string]: any;
  };
};

export type StoreResponseProps = {
  data: StoreProps[];
  included: IncludedProps[];
};

export type NormalizeStoresProps = {
  type: string;
  id: string;
  name: string;
  link: string;
  rating: number;
  image: string;
  date: string;
  countryId: string;
  storeBooks: IncludedProps[];
  books: IncludedProps[];
  authors: IncludedProps[];
  countries: IncludedProps[];
};

export type NormalizeBookProps = {
  id: string;
  bookName: string;
  copiesSold: number;
  authorName: string;
};
