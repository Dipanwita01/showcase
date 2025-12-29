import { X } from "lucide-react";

export default function ImageModal({ image, onClose, username }) {
  if (!image) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div onClick={e => e.stopPropagation()} className="bg-white p-6 rounded-lg max-w-3xl">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>
        <img src={image.imageData} className="max-h-[70vh] mx-auto" />
        <h2 className="text-xl font-bold mt-4">{image.title}</h2>
        {username && <p className="text-gray-500">@{username}</p>}
        <p className="mt-2">{image.description}</p>
      </div>
    </div>
  );
}
