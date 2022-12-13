import { LoadingOverlay } from '@mantine/core';
import useProfil from '../../hooks/useProfil';
import CVForm from '../../components/hermes/CVForm';
import PrintCV from '../../components/hermes/PrintCV';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';


export default function Profil({ baseURL, jwt }: { baseURL: string, jwt: string }) {

    useEffect(() => {
        if (jwt) sessionStorage.setItem("jwt", jwt)
        sessionStorage.setItem("baseURL", baseURL)
    }, [baseURL, jwt])
    const profil = useProfil()

    if (!profil) return <LoadingOverlay visible />

    return (

        <>

            <PrintCV profil={profil} />

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


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            baseURL: process.env.API_URL,
            jwt: ctx.query.accessToken || null,
        }
    }

}


