import FavouriteButtonDelete from "./FavouriteDelete";
import Link from "next/link";


export default function Favourites({favourites, updateOnDelete}: {favourites: any, updateOnDelete: () => void}) {
  return (
    <div className="flex flex-col">
      {favourites.length === 0 ? (
        <p>You don not have any saved offers</p>
      ) : (
        favourites.map((favourite: any) => (
          <div key={favourite.id}
               className="flex flex-row border-2 border-gray-200 hover:shadow-md rounded-xl mb-2 p-5">
            <div>
              <Link href={`/offer/${favourite.offer.id}`}>
                <h2 className="text-xl">{favourite.offer.title}</h2>
              </Link>
            </div>
            <FavouriteButtonDelete offerId={favourite.id} updateOnDelete={updateOnDelete}/>
          </div>
        ))
      )}
    </div>
  );
}
