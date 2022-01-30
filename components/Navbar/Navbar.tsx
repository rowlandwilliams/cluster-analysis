import { useRouter } from 'next/router';
import React from 'react';
import ClusterIcon from '../../assets/trifector/trifector.svg';
import ClustorIconBw from '../../assets/trifector/trifector-bw.svg';
import LineGraphIcon from '../../assets/line-graph/line-graph.svg';
import LineGraphIconBw from '../../assets/line-graph/line-graph-bw.svg';
import { NavbarLink } from './NavbarLink/NavbarLink';

const navItems = [
    { href: '', activeImgSrc: ClusterIcon, inactiveImgSrc: ClustorIconBw },
    { href: 'linegraph', activeImgSrc: LineGraphIcon, inactiveImgSrc: LineGraphIconBw },
];

export const Navbar = () => {
    const router = useRouter();
    const { pathname } = router;
    return (
        <nav className="bg-header-gray h-full w-16">
            {navItems.map((item) => (
                <NavbarLink {...item} key={item.href} pathname={pathname} />
            ))}
        </nav>
    );
};
