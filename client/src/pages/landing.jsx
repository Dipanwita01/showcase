import { useEffect, useState } from "react";
import { Camera, LogIn, UserPlus } from "lucide-react";
import { API } from "../api/api";
import MasonryGrid from "../components/masonryGrid";

export default function LandingPage({ onNavigate, onImageClick }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null);

   useEffect(() => {
        const fetchImages = async () => {
            try {
                API.getImages().then(imgs => setImages(imgs.sort(() => Math.random() - 0.5)));
            } catch (err) {
                console.error('Failed to fetch images:', err);
                setError('Failed to load images.');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-500">
                    <Camera /> Creative Showcase
                </h1>
                    <div className="flex gap-3">
                        <button
                            onClick={() => onNavigate('login')}
                            className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            <LogIn /> Login
                        </button>

                        <button
                            onClick={() => onNavigate('signup')}
                            className="flex items-center gap-1 bg-purple-500 text-white px-4 py-2 rounded-md"
                        >
                            <UserPlus /> Sign Up
                        </button>
                    </div>
            </nav>

            <div className="p-4">
                {loading && <p className="text-center text-gray-500">Loading images...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <p className="text-center text-gray-600">No images available.</p>
                )}

                {/* Masonry Grid */}
                {!loading && (
                    <MasonryGrid images={images} onImageClick={setSelectedImage} />
                )}
            </div>
        </div>
    </>
  );
}
