import { NavLink } from '@mantine/core';
import React from 'react';






export default function Appshell({ title, icon, href, active = false }: { title: string, icon: React.ReactNode, href: string, active?: boolean }) {

    // const color = useMantineTheme().colorScheme === "dark" ? "000000" : "null"
    // const src = icon.replace("000000", color)


    return (
        <>
            <NavLink
                label={title}
                icon={icon}
                component="a"
                href={href}
                active={active}
                color="violet"
                variant="subtle"
                styles={{ label: { fontSize: 15 } }}
            />

        </>
    )
}
