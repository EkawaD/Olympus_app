import React from 'react';
import useProfil from '../hooks/useProfil';
import CVForm from '../components/hermes/CVForm';
import PrintCV from '../components/hermes/PrintCV';
import { Loader, LoadingOverlay } from '@mantine/core';


export default function Profil() {

    const profil = useProfil()
    if (!profil) return <LoadingOverlay visible />

    return (

        <>

            <PrintCV profil={profil} />
            <CVForm profil={profil} />
            {/* <div className="discord_avatar">
                <Image alt="avatar" width={50} height={50} src={"/" + profil.avatar}></Image>
                <p> {profil.name} </p>

            </div>
            <div className="signout_button" >
                <Button color="dark" variant="outline" size="xs" onClick={() => console.log("signout")}> Se déconnecter </Button>
            </div> */}
        </>
    )

}




