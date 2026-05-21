interface PropertyMapEmbedProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}

export default function PropertyMapEmbed({ coordinates, address }: PropertyMapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const query = encodeURIComponent(`${coordinates.lat},${coordinates.lng}`);

  if (!apiKey) {
    const bbox = [
      coordinates.lng - 0.003,
      coordinates.lat - 0.0018,
      coordinates.lng + 0.003,
      coordinates.lat + 0.0018,
    ].join(',');

    return (
      <div className="relative h-full w-full bg-gray-100">
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${query}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`OpenStreetMap - ${address}`}
        />
        <a
          className="absolute bottom-3 right-3 rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-medium text-lokka-primary shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white"
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Maps
        </a>
      </div>
    );
  }

  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${coordinates.lat},${coordinates.lng}&zoom=18&maptype=satellite`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={`Google Maps - ${address}`}
    />
  );
}
