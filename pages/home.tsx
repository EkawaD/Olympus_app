import { LoadingOverlay } from "@mantine/core";
import { GetServerSideProps, } from "next";
import { useEffect } from "react";
import useAnon from "../hooks/useAnon";




export default function Home({ baseURL, jwt }: { baseURL: string, jwt: string }) {

    useEffect(() => {
        if (jwt) sessionStorage.setItem("jwt", jwt)
        sessionStorage.setItem("baseURL", baseURL)
    }, [baseURL, jwt])
    const anon = useAnon()

    if (!anon) return <LoadingOverlay visible />

    return (
        <>
            <div className="home">

                <h1>General</h1>
                <ul>
                    <li>CSS Login</li>
                    <li>RefreshToken</li>
                    <li>Optimisation Hermes</li>
                    <li>Ceres Back + Front</li>
                    <li>CSS GLOBAL</li>
                </ul>


            </div>
        </>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            baseURL: process.env.API_URL,
            jwt: ctx.query.accessToken || null,
        }
    }

}



