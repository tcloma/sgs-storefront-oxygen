import type {CollectionWithProducts} from './shopifyTypes';

export type CollectionQuery<T> = {
  collections: {
    nodes: T[];
  };
};

export type CollectionDetails = {
  collection: CollectionWithProducts;
};
