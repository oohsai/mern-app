import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setloading(false);
      if (data.success == false) {
        seterror(true);
        return;
      }
      // seterror(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  };
  return (
    <div className="p-3 max-w-lg max-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="UserName"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500"> Sign in</span>
        </Link>
      </div>
      <p className="text-red-800 mt-5">{error && "Spmething went wrong!"}</p>
    </div>
  );
}
