import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import useAnon from '../../../hooks/useAnon';
import ThemeToogle from '../ThemeToogle';
import styles from "./Appshell.module.css"
import Link from './Link';
import { GiChickenOven, GiDiamondHard, GiGreekTemple, GiLibertyWing, GiPartyPopper, GiPayMoney, } from "react-icons/gi"
import { BiLogOut } from "react-icons/bi"

export default function Appshell({ children }: { children: React.ReactNode }) {


    const router = useRouter()
    const theme = useMantineTheme()
    const color = theme.colorScheme === "dark" ? theme.colors.gold[0] : theme.colors.goldBlue[2]
    const [opened, setOpened] = useState(false);
    const anon = useAnon()

    const logout = () => {
        sessionStorage.removeItem("jwt")
    }


    if (!anon) return <div>{children}</div>
    return (
        <>

            <AppShell
                hidden={router.pathname === "/"}
                navbarOffsetBreakpoint="sm"
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 250 }}>
                        <Navbar.Section className={styles.anon} component="a" href="/home" style={{ color: theme.primaryColor }}>
                            <Image
                                className={styles.avatar}
                                src={anon.avatar}
                                width={40}
                                height={40}
                                alt="avatar"
                            />
                            <p>{anon.pseudo}</p>
                        </Navbar.Section>
                        <Navbar.Section grow mt="md">
                            <Link title={'Hermes'}
                                href="/app/hermes"
                                icon={<GiLibertyWing size={20} color={color} />}
                                active={router.pathname === "/app/hermes"} />
                            <Link title={'Héraclès '}
                                href="/app/heracles "
                                icon={<GiDiamondHard size={20} color={color} />}
                                active={router.pathname === "/app/heracles"} />
                            <Link title={'Midas'}
                                href="/app/midas"
                                icon={<GiPayMoney size={20} color={color} />}
                                active={router.pathname === "/app/midas"} />
                            <Link title={'Ceres'}
                                href="/app/ceres"
                                icon={<GiChickenOven size={20} color={color} />}
                                active={router.pathname === "/app/ceres"} />
                            {/* <Link title={'Dyonisos'}
                                href="/app/dyonisos"
                                icon={<GiPartyPopper size={20} color={color} />}
                                active={router.pathname === "/app/dyonisos"} /> */}
                        </Navbar.Section>
                        <Navbar.Section>
                            <div id="logout" onClick={() => logout()}>
                                <Link title={'Déconnexion'}
                                    href="/"
                                    icon={<BiLogOut size={20} color="red" />}

                                />
                            </div>
                            <Text size="xs">© Copyright 2022.</Text>
                            <Text size="xs">Made by Ederhy Bastien</Text>
                        </Navbar.Section>
                    </Navbar>
                }
                header={
                    <Header height={{ base: 50, md: 70 }} p="md">
                        <div className={styles.header} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    mr="xl"
                                />
                            </MediaQuery>

                            <GiGreekTemple size={30} color={color} className={styles.logo} />
                            <h1>OLYMPUS</h1>


                            <ThemeToogle className={styles.themeToogle} />

                        </div>
                    </Header>
                }
            >
                {children}
            </AppShell >




        </>
    )
}
