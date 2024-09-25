'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Route } from '@/enums/route';

const Header = () => {
    const {back} = useRouter();
    const currentPath = usePathname();
    const isHome = currentPath === `${Route.MOBILE}${Route.HOME}`;
    return (
        <>
            {!isHome && (
                <div>Header</div>
            )}
        </>
  )
}

export default Header