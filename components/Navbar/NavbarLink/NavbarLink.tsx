import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    href: string;
    imgSrc: string;
}

export const NavbarLink = ({ href, imgSrc }: Props) => {
    return (
        <Link href={`/${href}`} passHref>
            <div className="flex justify-center items-center mx-1 pb-2 pt-4 border-b border-gray-600">
                <Image src={imgSrc} alt="app-icon" width={40} height={40} />
            </div>
        </Link>
    );
};
