import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Home = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const [cards, setCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("abc");
  const nav = useNavigate();

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleLike = async (cardId: string) => {
    if (!user) {
      alert("יש להתחבר כדי לסמן לייק");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token missing");

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCards();
    } catch (error) {
      console.error("liking error:", error);
    }
  };

  const filteredCards = cards.filter((card) =>
    card.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortOption) {
      case "abc":
        return a.title?.localeCompare(b.title);
      case "z-a":
        return b.title?.localeCompare(a.title);
      case "createdAt":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col items-center justify-start gap-2 ">
      <h1 className="text-4xl font-semibold text-pink-800">HomeBiz</h1>
      <p className="text-lg text-pink-700">search for your type of Biz!</p>

      <input
        type="text"
        placeholder="BizCard name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-64 rounded border border-gray-300 p-2 text-sm"
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="mb-4 w-64 rounded border border-gray-300 p-2 text-sm text-gray-500"
      >
        <option value="abc">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="createdAt">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {sortedCards.map((card) => {
          const likedByUser = user && card.likes?.includes(user._id);

          return (
            <div
              key={card._id}
              className="flex h-[460px] w-[220px] max-w-sm flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md"
            >
              <img
                src={card.image?.url}
                alt={card.title}
                className="size-full max-h-40 object-cover"
              />
              <div className="flex h-full flex-col justify-between p-4">
                <h5 className="mb-1 text-lg font-bold text-pink-800">{card.title}</h5>
                <p className="mb-2 text-base font-bold text-pink-700">{card.subtitle}</p>
                <p className="mb-2 line-clamp-1 text-sm text-pink-500">{card.description}</p>
                <p className="text-sm text-pink-500">Date Created: {card.createdAt}</p>

               
                <div className="mt-2 flex items-center justify-between">
                  {user ? (
                    <button onClick={() => handleLike(card._id)} className="text-2xl text-pink-600">
  {likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                  ) : (
                    <p className="ml-2 text-sm text-gray-400">login to like </p>
                  )}

                  <Button
                    color="pink"
                    onClick={() => nav("/card/" + card._id)}
                    className="text-sm"
                  >
                    BizCard Info
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
