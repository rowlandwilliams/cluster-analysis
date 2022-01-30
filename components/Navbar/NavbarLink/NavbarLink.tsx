import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    href: string;
    activeImgSrc: string;
    inactiveImgSrc: string;
    pathname: string;
}

export const NavbarLink = ({ href, activeImgSrc, inactiveImgSrc, pathname }: Props) => {
    const linkDestination = `/${href}`;
    const isActive = linkDestination === pathname;
    return (
        <Link href={linkDestination} passHref>
            <button
                className={classNames(
                    'flex justify-center items-center p-3 mx-2 border-b border-gray-600',
                    { 'hover:opacity-60': !isActive, 'pointer-events-none': isActive },
                )}
            >
                <Image
                    src={isActive ? activeImgSrc : inactiveImgSrc}
                    alt="app-icon"
                    width={40}
                    height={40}
                />
            </button>
        </Link>
    );
};
