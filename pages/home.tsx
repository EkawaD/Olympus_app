import { LoadingOverlay } from "@mantine/core";
import { GetServerSideProps, } from "next";
import { createContext, ReactNode, useEffect } from "react";
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
                    <li>Route Guard  https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated </li>
                    <li>Demo </li>
                    <li>Optimisation Perf</li>
                </ul>
                <h1>Hermes</h1>
                <ul>
                    <li>CSS </li>
                    <li>Nouveau CV</li>
                    <li>Optimisation Perf</li>
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



