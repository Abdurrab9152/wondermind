"use client";

interface Props {
  itinerary: string;
  isLoading: boolean;
  className?: string; 
}

export default function ItineraryPreview({ itinerary, isLoading, className }: Props) {
  if (isLoading) return null;

  return (
    <div className={`itinerary-card ${className || ""}`}>
      {itinerary.split("\n").map((line, idx) => (
        <p key={idx} className="text-gray-700 leading-relaxed mb-2">
          {line}
        </p>
      ))}
    </div>
  );
}
