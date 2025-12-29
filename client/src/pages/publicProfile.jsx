import { useEffect, useState } from "react";
import { API } from "../api/api";
import MasonryGrid from "../components/masonryGrid";
import ImageModal from "../components/imageModel";

export default function PublicUserPage({ username, onNavigate }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    API.getUserByUsername(username).then(u => {
      if (u) API.getImages(u.id).then(setImages);
    });
  }, []);

  return (
    <>
      <button onClick={() => onNavigate("landing")}>Home</button>
      <MasonryGrid images={images} onImageClick={setSelected} />
      <ImageModal image={selected} onClose={()=>setSelected(null)} username={username}/>
    </>
  );
}
