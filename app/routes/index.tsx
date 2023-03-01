import {Link, useLoaderData} from '@remix-run/react';
import {LoaderArgs, MetaFunction} from '@shopify/remix-oxygen';
import {ALL_COLLECTIONS} from '~/queries/collectionQueries';
import type {CollectionQuery} from '~/types/queryTypes';
import type {Collection} from '~/types/shopifyTypes';
import {Image} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({
  context,
}: LoaderArgs): Promise<CollectionQuery<Collection>> {
  return await context.storefront.query(ALL_COLLECTIONS);
}

export default function Index() {
  const {collections} = useLoaderData<typeof loader>();
  const {nodes: featuredCollections} = collections;
  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
        {featuredCollections.map((collection) => {
          if (collection.title !== 'IG SALES')
            return (
              <Link
                to={`/collections/${collection.handle}`}
                key={collection.id}
              >
                <div className="grid gap-4">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      key={collection.id}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      widths={[400, 500, 600, 700, 800, 900]}
                      loaderOptions={{
                        scale: 2,
                        crop: 'center',
                      }}
                    />
                  )}
                  <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                    {collection.title}
                  </h2>
                </div>
              </Link>
            );
        })}
      </div>
    </section>
  );
}
