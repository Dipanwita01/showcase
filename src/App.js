import { useState } from "react";
import './index.css';
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import UserProfile from "./pages/userProfile";
import PublicUserPage from "./pages/publicProfile";
import ImageModal from "./components/imageModel";

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [publicUser, setPublicUser] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <>
      {page === "landing" && <LandingPage onNavigate={setPage} onImageClick={setSelected} />}
      {page === "login" && <LoginPage onNavigate={setPage} onLogin={u=>{setUser(u);setPage("profile")}} />}
      {page === "signup" && <SignUpPage onNavigate={setPage} onSignUp={u=>{setUser(u);setPage("profile")}} />}
      {page === "profile" && <UserProfile user={user} onNavigate={setPage} onLogout={()=>{setUser(null);setPage("landing")}} />}
      {page === "public" && <PublicUserPage username={publicUser} onNavigate={setPage} />}
      {selected && <ImageModal image={selected} onClose={()=>setSelected(null)} />}
    </>
  );
}
