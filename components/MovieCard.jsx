import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function MovieCard({ movie }) {

  const { token } = useAuth();

  const handleAddToFavourites = () => {
    if(!token){
      alert("Please login")
      return;
    }

    axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/favorites/${movie._id}`,
      {...movie},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    )
    .then((response) => {
      alert("Movie added to favourites");
    })
    .catch((error) => {
      alert("Error in adding favourite");
    });
  };

  return (
    <div className="bg-gray-800 rounded-md shadow-lg overflow-hidden flex flex-col justify-between">
      <img src={movie.image} alt={movie.title} className="w-full h-60 object-cover" />
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-white">{movie.title}</h3>
      </div>
      <div className="p-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-full text-center"
          onClick={handleAddToFavourites}
        >
          Add to Favourites
        </button>
      </div>
    </div>
  );
}
