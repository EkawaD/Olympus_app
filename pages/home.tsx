import { LoadingOverlay, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import CVForm from "../components/hermes/CVForm";
import useAnon from "../hooks/useAnon";
import useProfil from "../hooks/useProfil";




export default function Home() {

    const anon = useAnon()
    const profil = useProfil()


    if (!anon || !profil) return <LoadingOverlay visible />

    return (
        <>
            <div className="home">
                <CVForm profil={profil} />
            </div>
        </>
    );

}




