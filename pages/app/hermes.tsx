import { LoadingOverlay } from '@mantine/core';
import useProfil from '../../hooks/useProfil';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Title from '../../components/common/Title';
import { GiLibertyWing } from 'react-icons/gi';


export default function Profil({ baseURL, jwt }: { baseURL: string, jwt: string }) {

    useEffect(() => {
        if (jwt) sessionStorage.setItem("jwt", jwt)
        sessionStorage.setItem("baseURL", baseURL)
    }, [baseURL, jwt])
    const profil = useProfil()

    if (!profil) return <LoadingOverlay visible />

    return (

        <>

            <Title icon={<GiLibertyWing size={25} />} description={"Home"}>Hermes</Title>

            {/* <PrintCV profil={profil} /> */}

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


