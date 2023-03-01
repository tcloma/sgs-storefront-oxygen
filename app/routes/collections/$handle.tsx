import {useLoaderData} from '@remix-run/react';
import {json, LoaderArgs} from '@shopify/remix-oxygen';
import ProductGrid from '~/components/ProductGrid';
import {COLLECTION_DETAILS} from '~/queries/collectionQueries';
import {CollectionDetails} from '~/types/queryTypes';

export async function loader({
  params,
  context,
}: LoaderArgs): Promise<CollectionDetails> {
  const {handle} = params;
  const {collection} = (await context.storefront.query(COLLECTION_DETAILS, {
    variables: {
      handle,
    },
  })) as CollectionDetails;

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  }) as unknown as CollectionDetails;
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();
  console.log(collection);
  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
      <ProductGrid
        collection={collection}
        url={`/collections/${collection.handle}`}
      />
    </>
  );
}
