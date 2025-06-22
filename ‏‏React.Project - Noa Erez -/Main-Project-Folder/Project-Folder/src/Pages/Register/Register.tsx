import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    phone: "",
    email: "",
    password: "",
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

    const payload = {
      name: {
        first: formData.first,
        last: formData.last,
      },
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      address: {
        country: formData.country,
        city: formData.city,
        street: formData.street,
        houseNumber: +formData.houseNumber,
        zip: +formData.zip,
      },
    };

    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/register",
        payload
      );
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("failed \n" + (error.response?.data || error.message));
    }
  };

  return (
    <div className="mx-auto mb-12 mt-8 min-h-screen max-w-xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-3xl font-bold text-pink-800">Register</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-pink-600">
        <input name="first" placeholder="First Name" value={formData.first} onChange={handleChange} required className="rounded border p-2" />
        <input name="last" placeholder="Last Name" value={formData.last} onChange={handleChange} required className="rounded border p-2" />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="rounded border p-2" />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required className="rounded border p-2" />
        <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required className="rounded border p-2" />
        <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="rounded border p-2" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="rounded border p-2" />
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required className="rounded border p-2" />
        <input name="houseNumber" placeholder="House Number" value={formData.houseNumber} onChange={handleChange} required className="rounded border p-2" />
        <input name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="rounded border p-2" />

        <button type="submit" className="mb-2 rounded bg-pink-600 py-2 text-white hover:bg-pink-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
