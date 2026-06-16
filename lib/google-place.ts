import { unstable_cache } from "next/cache";

export type GooglePlaceData = {
  rating: number;
  reviewCount: number;
  mapsUrl: string;
};

function getFallback(): GooglePlaceData {
  const rating = Number(process.env.GOOGLE_RATING_FALLBACK ?? "4.4");

  return {
    rating: Number.isFinite(rating) ? rating : 4.4,
    reviewCount: 0,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=La+F%C3%A9licit%C3%A0+15+rue+du+Stade+67117+Furdenheim",
  };
}

async function fetchGooglePlace(): Promise<GooglePlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const fallback = getFallback();

  if (!apiKey || !placeId) {
    return fallback;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.error("Google Places API error:", response.status);
      return fallback;
    }

    const data = (await response.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
    };

    if (!data.rating) {
      return fallback;
    }

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount ?? 0,
      mapsUrl:
        data.googleMapsUri ??
        `https://search.google.com/local/reviews?placeid=${placeId}`,
    };
  } catch (error) {
    console.error("Google Places fetch failed:", error);
    return fallback;
  }
}

export const getGooglePlaceData = unstable_cache(
  fetchGooglePlace,
  ["google-place-data"],
  { revalidate: 3600 },
);

export function formatGoogleRating(rating: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}
