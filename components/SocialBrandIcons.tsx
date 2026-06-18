type IconProps = {
  className?: string;
};

export function InstagramBrandIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-gradient)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
    </svg>
  );
}

export function TikTokBrandIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#010101" />
      <path
        d="M15.5 7.2v1.6c-.9-.1-1.8.1-2.6.6v5.9a3.4 3.4 0 1 1-3-3.35v1.7a1.7 1.7 0 1 0 1.2 1.63V7.2h2.4Z"
        fill="#25F4EE"
      />
      <path
        d="M15.5 8.1v1.5c-.8-.2-1.7-.1-2.5.3v5.1a3.4 3.4 0 1 1-3-3.35v.9a2.5 2.5 0 1 0 2.2 2.48V8.1h3.3Z"
        fill="#FE2C55"
      />
      <path
        d="M15.5 7.2v1.6c-.9-.1-1.8.1-2.6.6v5.9a3.4 3.4 0 1 1-3-3.35v1.7a1.7 1.7 0 1 0 1.2 1.63V7.2h2.4Z"
        fill="#fff"
      />
    </svg>
  );
}

export function GoogleBrandIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21.6 12.23c0-.68-.06-1.34-.17-1.97H12v3.73h5.4a4.65 4.65 0 0 1-2.02 3.05v2.53h3.27c1.92-1.77 3.03-4.38 3.03-7.34Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.97-.89 6.62-2.42l-3.27-2.53c-.9.6-2.05.96-3.35.96-2.58 0-4.76-1.74-5.54-4.09H3.1v2.61A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.46 13.92A5.98 5.98 0 0 1 6.12 12c0-.67.12-1.32.34-1.92V7.47H3.1A10 10 0 0 0 2 12c0 1.62.39 3.15 1.1 4.53l3.36-2.61Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.47 0 2.78.5 3.81 1.49l2.85-2.85C16.96 2.59 14.7 1.75 12 1.75 8.09 1.75 4.74 4.04 3.1 7.47l3.36 2.61C7.24 7.12 9.42 5.38 12 5.38Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function FacebookBrandIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2" />
      <path
        d="M14.2 12.5h2.4l.5-2.8H14.2V8.4c0-.8.2-1.3 1.4-1.3h1.5V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v1.9H8.8v2.8h2.4V19h2.9v-6.5Z"
        fill="#fff"
      />
    </svg>
  );
}
