import { Button, Modal, MultiSelect, Select } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Document, Page } from 'react-pdf';
import Image from "next/image"

import CV from '../components/CV';
import ProfilForm from '../components/ProfilForm';
import LettreM from '../components/LM'

// import ClassicCV from '../components/pages/profil/CV/ClassicCV';





export default function Profil({ data, baseURL }: { data: User, baseURL: string }) {




    const [profil, setProfil] = useState<Profil>(data.profil);
    const [opened, setOpened] = useState(false)
    const [lm, setLm] = useState<Lettre>()
    const [refs, setRefs] = useState([""])
    const [template, setTemplate] = useState()
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        setShouldRender(false)
    }, [shouldRender])

    const updateData = async () => {
        try {
            const res = await fetch(`${baseURL}/profils/${profil.id}`)
            const d = await res.json()
            setProfil(d)
            const templates = {
                dev: <CV data={d} />,
                // classic: <ClassicCV />
            }
            setTemplate(templates[templateSelect.current?.value as keyof typeof template])
            const lettre = profil.lettres?.find((l: Lettre) => l.title === refSelect.current?.value)
            setLm(lettre)
            setOpened(true)
            setShouldRender(true)
        } catch (error) {
            console.log(error)
        }
    }
    const componentRef = useRef<HTMLInputElement>(null);
    const refSelect = useRef<HTMLInputElement>(null)
    const templateSelect = useRef<HTMLInputElement>(null)
    const templates = {
        dev: <CV data={profil} />,
        // classic: <ClassicCV />
    }

    const getFile = (ref: string) => {
        const obj = supabase.storage.from('olympus').getPublicUrl(ref)
        return obj.data.publicUrl
    }

    const discord = async () => {
        const data = await fetch(`http://localhost:3000/auth/discord`, {
            method: "GET",
            // redirect: "follow"
        })
        // const data = await res.json()// your fetch function here
        console.log(data)

    }
    if (!profil) return <div>Loading ...</div>
    return (

        <>
            <button onClick={() => discord()}> HERE </button>
            <div className="cvForm">
                <Select ref={templateSelect} data={Object.keys(templates)} label="Template CV" />
                <Select ref={refSelect} data={profil.lettres ? profil.lettres.map((l: Lettre) => l.title) : [""]} label="Lettre de motivation" />
                <MultiSelect value={refs} onChange={setRefs} data={profil.refs ? profil.refs.map((r) => r.file) : [""]} label="Références" />
                <Button color="dark" className="preview" onClick={() => updateData()}>Preview</Button>
            </div>

            <div className="discord_avatar">
                {/* <Image alt="avatar" width={50} height={50} src={user.image}></Image> */}
                <p> {data.pseudo} </p>

            </div>
            <div className="signout_button" >
                <Button color="dark" variant="outline" size="xs" onClick={() => console.log("signout")}> Se déconnecter </Button>
            </div>

            <div className="profil" >


                <ProfilForm profil={profil} baseURL={baseURL} />

                <Modal opened={opened} onClose={() => setOpened(false)} size={"clamp('50vw', '90vw')"}>
                    <ReactToPrint
                        trigger={() => <Button color="dark" className="print">Télécharger le .pdf !</Button>}
                        content={() => componentRef.current}
                    />
                    <div ref={componentRef}>
                        <>
                            {template}
                            {lm && <LettreM profil={profil} lm={lm} dev={true} />}
                            {refs.map((ref, key) =>
                                ref &&
                                <Document key={key} file={getFile(ref)}>
                                    <Page pageNumber={1} width={950} />
                                </Document>
                            )}
                        </>
                    </div>
                </Modal>
            </div >


        </>
    )

}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { supabase } from '../middleware/supabase';
import { getCookie } from 'cookies-next';
import { Cookies } from 'next/dist/server/web/spec-extension/cookies';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const accessToken = ctx
    // const jwt = getCookie("jwt", ctx)
    // console.log(jwt);


    const baseURL = process.env.API_URL
    const res = await fetch(`${baseURL}/users/3`)
    const data = await res.json()// your fetch function here
    console.log(data)

    // const data = await fetch("http://localhost:3000/auth/test", {
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${jwt}`
    //     },
    // })



    // console.log(await data.json())




    return {
        props: {
            data: JSON.parse(JSON.stringify("data")),
            baseURL: process.env.API_URL
        }
    }
}

