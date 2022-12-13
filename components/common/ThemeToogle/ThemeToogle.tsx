import React from 'react';
import { Button, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { FiMoon, FiSun } from "react-icons/fi"

export default function ThemeToogle({ className }: { className?: string }) {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme()
    const dark = colorScheme === 'dark';

    return (
        <>
            <Button
                variant="outline"
                color={dark ? 'yellow' : "dark"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                className={className}
            >
                Météo  {dark ? <FiSun className='icon' /> : <FiMoon className='icon' />}
            </Button>
        </>
    )
}
