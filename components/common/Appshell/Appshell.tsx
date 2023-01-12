import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell, } from '@mantine/core';

import styles from "./Appshell.module.css"
import useAnon from '../../../hooks/useAnon';
import Header from './Header';
import Navbar from './Navbar';

export default function Appshell({ children }: { children: ReactNode }) {


    const router = useRouter()
    const [opened, setOpened] = useState(false);
    const anon = useAnon()


    if (!anon) return <div>{children}</div>
    return (
        <>

            <AppShell
                hidden={router.pathname === "/"}
                navbarOffsetBreakpoint="sm"
                navbar={<Navbar anon={anon} opened={opened} setOpened={setOpened} />}
                header={<Header opened={opened} setOpened={setOpened} />}
            >
                <div className={styles.main}>
                    {children}
                </div>
            </AppShell >




        </>
    )
}
