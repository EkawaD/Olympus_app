import { NavLink } from '@mantine/core';
import Link from 'next/link';
import React from 'react';






export default function Appshell({ title, icon, href, active = false }: { title: string, icon: React.ReactNode, href: string, active?: boolean }) {

    return (
        <>
            <Link href={href}>
                <NavLink
                    label={title}
                    icon={icon}
                    component="a"
                    active={active}
                    color="violet"
                    variant="subtle"
                    styles={{ label: { fontSize: 15 } }}
                />
            </Link>



        </>
    )
}
