export interface Collection {
  id: string;
  title: string;
  handle: string;
  image: {
    altText: string;
    width: number;
    height: number;
    url: string;
  };
}
