import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { Button } from "flowbite-react";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const [cards, setCards] = useState<any[]>([]);
  const [likedCards, setLikedCards] = useState<any[]>([]);
  const [myCards, setMyCards] = useState<any[]>([]);
  const nav = useNavigate();


  const fetchCards = async () => {
    try {
      const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
      setCards(res.data);
    } catch (error) {
      console.error("Can't load BizCards :(", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (user && cards.length > 0) {
      setLikedCards(cards.filter(card => card.likes?.includes(user._id)));
      setMyCards(cards.filter(card => card.user_id === user._id));
       }
  }, [user, cards]);

 

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-4xl font-bold text-pink-800">My Profile</h1>
      <p className="text-lg text-pink-500">Hello {user.name.first}!</p>

      <div className="w-full max-w-xl rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-2 text-2xl font-semibold "></h2>
        <p className="text-pink-500"><strong className="text-pink-800">Name:</strong> {user.name.first} {user.name.last}</p>
        <p className="text-pink-500"><strong className="text-pink-800">Email:</strong> {user.email}</p>
        <p className="text-pink-500"><strong className="text-pink-800">Phone:</strong> {user.phone || "none"}</p>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="mb-2 mt-6 text-2xl font-semibold text-pink-600">Liked BizCards</h2>
        {likedCards.length === 0 ? (
          <p className="text-gray-500">No liked BizCards yet..</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {likedCards.map(card => (
              <div key={card._id} className="rounded border p-3 shadow">
                <img src={card.image?.url} alt={card.title} className="mb-2 h-32 w-full rounded object-cover" />
                <h3 className="font-bold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
                  <Button
                    color="pink"
                    onClick={() => nav("/card/" + card._id)}
                    className="text-sm"
                  >
                    BizCard Info
                  </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-12 w-full max-w-4xl">
        <h2 className="mb-2 mt-6 text-2xl font-semibold text-pink-600">My BizCards</h2>
        {myCards.length === 0 ? (
          <p className="text-gray-500">Seems like you don't have any BizCards..</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {myCards.map(card => (
              <div key={card._id} className="rounded border p-3 shadow">
                <img src={card.image?.url} alt={card.title} className="mb-2 h-32 w-full rounded object-cover" />
                <h3 className="font-bold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
