import React from 'react';
import { Button, useMantineColorScheme } from '@mantine/core';
import { FiMoon, FiSun } from "react-icons/fi"

export default function ThemeToogle({ className }: { className: string }) {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <>
            <Button
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                className={className}
            >
                {dark ? <FiSun /> : <FiMoon />}
            </Button>
        </>
    )
}
