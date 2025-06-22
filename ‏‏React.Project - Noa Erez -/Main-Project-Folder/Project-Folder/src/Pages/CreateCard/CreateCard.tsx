import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQyNGFlOWE4ZDFlYWUxMmQzMWUzNjAiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjk4ODQzNDQyfQ.znXbzyxMKeNrKf3dA8jXQ5CFptM8-iXjeFtqx3XfHD0";

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      phone: formData.phone,
      email: formData.email,
      web: formData.web,
      image: {
        url: formData.imageUrl,
        alt: formData.imageAlt,
      },
      address: {
        state: formData.state,
        country: formData.country,
        city: formData.city,
        street: formData.street,
        houseNumber: Number(formData.houseNumber),
        zip: Number(formData.zip),
      },
    };

    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("BizCard Created!");
      navigate("/");
    } catch (error: any) {
      console.error("Error in creating BizCard", error.response?.data || error.message);
      alert("Cannot create BizCard 😢");
    }
  };

  return (
    <div className="mx-auto mb-12 mt-8 min-h-screen max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-pink-800">Create BizCard</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-pink-600">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="rounded border p-2" required />
        <input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className="rounded border p-2" required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="rounded border p-2" required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="rounded border p-2" required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="rounded border p-2" required />
        <input name="web" placeholder="Website" value={formData.web} onChange={handleChange} className="rounded border p-2" />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="rounded border p-2" required />
        <input name="imageAlt" placeholder="Image Alt Text" value={formData.imageAlt} onChange={handleChange} className="rounded border p-2" />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="rounded border p-2" />
        <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="rounded border p-2" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="rounded border p-2" required />
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="rounded border p-2" required />
        <input name="houseNumber" placeholder="House Number" value={formData.houseNumber} onChange={handleChange} className="rounded border p-2" required />
        <input name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="rounded border p-2" required />

        <button type="submit" className="mb-4 rounded bg-pink-600 py-2 text-white hover:bg-pink-700">
          Create BizCard!
        </button>
      </form>
    </div>
  );
};

export default CreateCard;
