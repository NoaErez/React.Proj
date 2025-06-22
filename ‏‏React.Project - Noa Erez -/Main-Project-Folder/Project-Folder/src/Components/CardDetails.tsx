import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const [card, setCard] = useState<any>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
        );
        setCard(response.data);
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  if (!card) {
    return (
      <div className="py-8 text-center text-lg text-pink-600">
       Loading selected BizCard...
      </div>
    );
  }

    const addressQuery = encodeURIComponent(
    `${card.address?.street}, ${card.address?.city}`
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="mb-6 text-3xl font-bold text-pink-800">BizCard Info</h1>

      <img
        src={card.image?.url}
        alt={card.image?.alt || card.title}
        className="mb-6 h-auto w-64 rounded-lg shadow-md"
      />

      <h2 className="text-2xl font-semibold text-pink-800">{card.title}</h2>
      <h4 className="mb-4 text-lg text-pink-600">{card.subtitle}</h4>

      <p className="mb-2 text-pink-600">{card.description}</p>
      <p className="mb-1 text-pink-600">
        <strong className="text-pink-800">Phone:</strong> {card.phone}
      </p>
      <p className="mb-2 text-pink-600">
        <strong className="text-pink-800">Email:</strong> {card.email}
      </p>
      <p className="mb-1 text-pink-600">
        <strong className="text-pink-800">WebSite:</strong>{" "}
        <a
          href={card.web}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-pink-800"
        >
          {card.web}
        </a>
      </p>
      <p className=" mt-2 text-pink-600">
        <strong className="text-pink-800">Address:</strong>{" "}
        {card.address?.street}, {card.address?.city}
      </p>

      <div className="mb-20 mt-5 h-64 w-full max-w-2xl overflow-hidden rounded-lg shadow-md">
        <iframe
          title="Google Map"
          className="size-full"
          src={`https://www.google.com/maps?q=${addressQuery}&output=embed`}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default CardDetails;
