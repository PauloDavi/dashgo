import { ReactElement, cloneElement } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useRouter } from 'next/dist/client/router';
import Link, { LinkProps } from 'next/link';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
      setIsActive(true);
    }

    if (
      !shouldMatchExactHref &&
      (asPath.startsWith(String(rest.href)) ||
        asPath.startsWith(String(rest.as)))
    ) {
      setIsActive(true);
    }
  }, [asPath, rest.as, rest.href, shouldMatchExactHref]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'teal.500' : 'gray.50',
      })}
    </Link>
  );
}
