export type GalleryImageItem = {
  type: "image";
  src: string;
};

export type GalleryVideoItem = {
  type: "video";
  src: string;
  poster: string;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  { type: "image", src: "/images/Gallerie_photo9.jpg" },
  { type: "image", src: "/images/Gallerie_image2.jpg" },
  { type: "image", src: "/images/Gallerie_photo3.jpg" },
  { type: "image", src: "/images/Gallerie_photo4.jpg" },
  { type: "image", src: "/images/Gallerie_photo5.jpg" },
  { type: "image", src: "/images/Gallerie_photo6.jpg" },
  { type: "image", src: "/images/Gallerie_photo7.jpg" },
  { type: "image", src: "/images/Gallerie_photo8.jpg" },
  {
    type: "video",
    src: "/videos/pizza-galerie.mp4",
    poster: "/images/Pizza-Grille1-poster.jpg",
  },
];

/** Première image (carte aperçu de la grille). */
export const GALLERY_COVER =
  GALLERY_ITEMS.find((item): item is GalleryImageItem => item.type === "image")
    ?.src ?? "/images/Gallerie_photo9.jpg";
