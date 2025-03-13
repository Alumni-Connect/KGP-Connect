interface EventGalleryProps {
  name: string;
  array: Array< string >;
}
const EventGallery = (props:EventGalleryProps) => {
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{props.name}</h2>
      <hr className="mb-6 border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {props.array.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={img}
              alt={index.toString()}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGallery;
