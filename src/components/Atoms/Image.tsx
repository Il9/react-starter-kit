// Props Type
export type ImageProps = {
  fallbackSrc?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
} & React.HTMLProps<HTMLImageElement>;

// Component
export default function Image({ fallbackSrc, onError, ...props }: ImageProps) {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSrc || '/static/images/noimage.png';

    if (onError) {
      onError(event);
    }
  };

  return <img {...props} onError={handleError} />;
}

// Initial Props
Image.defaultProps = {};
