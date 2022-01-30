import React from 'react';
import ClusterIcon from '../../assets/app-icon.svg';
import { NavbarLink } from './NavbarLink/NavbarLink';

const navItems = [
    { href: '', imgSrc: ClusterIcon },
    { href: 'linegraph', imgSrc: ClusterIcon },
];

export const Navbar = () => {
    return (
        <nav className="bg-header-gray h-full w-16">
            {navItems.map((item) => (
                <NavbarLink {...item} key={item.href} />
            ))}
        </nav>
    );
};
