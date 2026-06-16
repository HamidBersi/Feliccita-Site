type GoogleStarsProps = {
  rating: number;
};

export default function GoogleStars({ rating }: GoogleStarsProps) {
  return (
    <span
      className="text-[10px] tracking-[0.04em] transition-colors duration-300 group-hover:text-gold/80 sm:text-[14px] sm:tracking-[0.06em]"
      aria-hidden="true"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;

        return (
          <span
            key={star}
            className={
              filled
                ? "text-gold"
                : half
                  ? "text-gold/45"
                  : "text-gold/20"
            }
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
