import { useState } from "react";
import { API } from "../api/api";

export default function LoginPage({ onNavigate, onLogin }) {
  const [data, setData] = useState({ email:"", password:"" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const user = await API.login(data.email, data.password);
      onLogin(user);
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="centered">
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-blue-700 mb-5 text-center font-bold text-3xl">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input className="w-full p-3 border rounded-lg mb-3" placeholder="email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input className="w-full p-3 border rounded-lg mb-3" type="password" placeholder="password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button className="bg-blue-600 text-white rounded-lg w-full py-3 hover:bg-blue-700" onClick={submit}>Login</button>

      <p className="text-center mt-4">
                    No account?{' '}
                    <button
                        onClick={() => onNavigate('signup')}
                        className="text-purple-600 font-semibold">
                        Sign Up
                    </button>
                    </p>
      </div>
      </div>
    </div>
  );
}
