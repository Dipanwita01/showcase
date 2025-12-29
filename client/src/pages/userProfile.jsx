import { useEffect, useState } from "react";
import { API } from "../api/api";
import ImageModal from "../components/imageModel";

export default function UserProfile({ user, onNavigate, onLogout }) {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageData: ""
  });

  const upload = async () => {
  if (!form.imageData || !form.title) {
    alert("Title & image required");
    return;
  }

  try {
    await API.uploadImage(
      form.imageData,
      form.title,
      form.description
    );

    setImages(await API.getImages());
    setForm({ title: "", description: "", imageData: "" });
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">
          Creative Showcase
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700">@{user.username}</span>
          <button
            onClick={() => onNavigate("landing")}
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Home
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* UPLOAD CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Upload New Artwork
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Artwork title"
                value={form.title}
                onChange={e =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                placeholder="Description (optional)"
                rows="4"
                value={form.description}
                onChange={e =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () =>
                    setForm({ ...form, imageData: reader.result });
                  reader.readAsDataURL(file);
                }}
                className="w-full text-sm"
              />

              <button
                onClick={upload}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Upload Artwork
              </button>
            </div>

            {/* IMAGE PREVIEW */}
            <div className="flex items-center justify-center">
              {form.imageData ? (
                <img
                  src={form.imageData}
                  alt="Preview"
                  className="max-h-64 rounded-xl shadow-md"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  Image preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            My Artworks ({images.length})
          </h2>

          {images.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              You haven’t uploaded any artworks yet.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {images.map(img => (
                <img
                  key={img.id}
                  src={img.imageData}
                  alt={img.title}
                  onClick={() => setSelected(img)}
                  className="mb-4 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <ImageModal
          image={selected}
          onClose={() => setSelected(null)}
          username={user.username}
        />
      )}
    </div>
  );
}
