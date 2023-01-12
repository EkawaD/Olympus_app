import { Burger, Header, MediaQuery } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

import { GiGreekTemple } from "react-icons/gi";
import ThemeToogle from "../../ThemeToogle";

import styles from "../Appshell.module.css"

type HeaderProps = {
    opened: boolean,
    setOpened: Dispatch<SetStateAction<boolean>>,
}

export default function OlympusHeader({ opened, setOpened }: HeaderProps) {

    return (
        <>
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
                    <GiGreekTemple size={30} className={styles.logo} />
                    <h1>OLYMPUS</h1>
                    <ThemeToogle className={styles.themeToogle} />
                </div>
            </Header>



        </>
    )
}
