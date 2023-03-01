export interface Collection {
  id: string;
  title: string;
  handle: string;
  image: Image;
  description?: string;
}

export interface CollectionWithProducts extends Collection {
  products: {
    nodes: any[];
  };
}

export interface Products {
  id: string;
  title: string;
  publishedAt: string;
  handle: string;
  variants: {
    nodes: {
      id: string;
      image: Image;
      price: Price;
      compareAtPrice: Price;
    };
  };
}

interface Image {
  altText: string;
  width: number;
  height: number;
  url: string;
}

interface Price {
  amount: string;
  currencyCode: string;
}
