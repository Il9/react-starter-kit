import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// Props Type
export type LinkProps = {
  children?: React.ReactNode;
} & NextLinkProps;

// Component
export default function Link({ children, ...props }: LinkProps) {
  return (
    <NextLink {...props}>
      <a>{children}</a>
    </NextLink>
  );
}

// Initial Props
Link.defaultProps = {
  passHref: true
};
