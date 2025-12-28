export default function MasonryGrid({ images, onImageClick }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {images.map(img => (
        <img
          key={img.id}
          src={img.imageData}
          alt={img.title}
          onClick={() => onImageClick(img)}
          className="mb-4 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition"
        />
      ))}
    </div>
  );
}
