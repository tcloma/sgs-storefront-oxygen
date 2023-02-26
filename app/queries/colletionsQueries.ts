const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

export {COLLECTIONS_QUERY};
