import { Dispatch, SetStateAction } from "react";
import Image from 'next/image';
import router from "next/router";
import { BiLogOut } from "react-icons/bi";
import { Navbar, Text } from "@mantine/core";
import { GiLibertyWing, GiDiamondHard, GiPayMoney, GiShinyApple } from "react-icons/gi";

import styles from "../Appshell.module.css"
import Link from "../Link";
import Contacts from "../../Contacts";

type HeaderProps = {
    anon: Anon
    opened: boolean,
    setOpened: Dispatch<SetStateAction<boolean>>,
}

export default function OlympusNavbar({ anon, opened, setOpened }: HeaderProps) {

    const logout = () => {
        sessionStorage.removeItem("jwt")
    }

    return (
        <>
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 250 }}>
                <Navbar.Section className={styles.anon} component="a" href="/home">
                    <Image
                        priority
                        className={styles.avatar}
                        src={anon.avatar}
                        alt="avatar"
                        width={50} height={50}
                    />
                    <p>{anon.pseudo}</p>
                    <div id="logout" onClick={() => logout()}>
                        <Link title={'Déconnexion'}
                            href="/"
                            icon={<BiLogOut size={20} color="red" />}

                        />
                    </div>
                </Navbar.Section>
                <Navbar.Section grow mt="md">
                    <Link title={'Hermes'}
                        href="/app/hermes"
                        icon={<GiLibertyWing size={20} className={styles.icon} />}
                        active={router.pathname === "/app/hermes"} />
                    <Link title={'Héraclès '}
                        href="/app/heracles "
                        icon={<GiDiamondHard size={20} className={styles.icon} />}
                        active={router.pathname === "/app/heracles"} />
                    <Link title={'Midas'}
                        href="/app/midas"
                        icon={<GiPayMoney size={20} className={styles.icon} />}
                        active={router.pathname === "/app/midas"} />
                    {/* <Link title={'Ceres'}
                        href="/app/ceres"
                        icon={<GiShinyApple size={20} className={styles.icon} />}
                        active={router.pathname === "/app/ceres"} /> */}
                    {/* <Link title={'Dyonisos'}
                                href="/app/dyonisos"
                                icon={<GiPartyPopper size={20} className={styles.icon} />}
                                active={router.pathname === "/app/dyonisos"} /> */}
                </Navbar.Section>
                <Navbar.Section>
                    <Contacts className='contacts' />
                    <Text mt={20} size="xs">© Copyright 2022.</Text>
                    <Text size="xs">Made by Ederhy Bastien</Text>
                </Navbar.Section>
            </Navbar>



        </>
    )
}
