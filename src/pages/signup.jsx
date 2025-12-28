import { useState } from "react";
import { API } from "../api/api";

export default function SignUpPage({ onNavigate, onSignUp }) {
  const [data, setData] = useState({ username:"", email:"", password:"", confirm:"" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e?.preventDefault();
    if (data.password !== data.confirm) return setError("Passwords do not match");
    try {
      const user = await API.register(data.username, data.email, data.password);
      onSignUp(user);
    } catch (e) { setError(e.message); }
  };

  return (
    <div className="centered">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-blue-700 mb-5 text-center font-bold text-3xl">Create Account</h2>
      {error && <p className="text-red-500">{error}</p>}
      {["username","email","password","confirm"].map(f => (
        <input className="w-full p-3 border rounded-lg mb-3" key={f} type={f.includes("password") ? "password":"text"}
          placeholder={f}
          onChange={e => setData({...data,[f]:e.target.value})}/>
      ))}
      <button className="bg-blue-600 text-white rounded-lg w-full py-3 hover:bg-blue-700" onClick={submit}>Sign Up</button>
      <p className="text-center mt-4">
                    Already have account?{' '}
                    <button
                        onClick={() => onNavigate('login')}
                        className="text-purple-600 font-semibold">
                        Login
                    </button>
                    </p>
    </div>
    </div>
    </div>
  );
}
