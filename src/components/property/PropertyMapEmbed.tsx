interface PropertyMapEmbedProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}

export default function PropertyMapEmbed({ coordinates, address }: PropertyMapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  if (!apiKey) {
    const query = encodeURIComponent(`${coordinates.lat},${coordinates.lng}`);
    return (
      <div className="flex h-full items-center justify-center bg-gray-100 p-6 text-center">
        <div>
          <p className="mb-3 text-sm text-gray-600">
            Kart krever at `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` er satt.
          </p>
          <a
            className="text-sm font-medium text-lokka-primary underline"
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Åpne {address} i Google Maps
          </a>
        </div>
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
