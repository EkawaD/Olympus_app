import { useRef, useState } from "react";
import { Button, Modal, MultiSelect, Select } from "@mantine/core";
import { supabase } from "../../../middleware/supabase";
import { Document, Page } from "react-pdf";
import ReactToPrint from "react-to-print";
import CV from "../CV";
import LettreM from "../LM";

import styles from "./PrintCV.module.css"
// import ClassicCV from '../components/pages/profil/CV/ClassicCV';

export default function PrintCV({ profil }: { profil: Profil }) {


    const [opened, setOpened] = useState(false)
    const [lm, setLm] = useState<Lettre>()
    const [refs, setRefs] = useState([""])
    const [template, setTemplate] = useState()

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

    const openModal = () => {
        try {
            setTemplate(templates[templateSelect.current?.value as keyof typeof template])
            const lettre = profil.lettres?.find((l: Lettre) => l.title === refSelect.current?.value)
            setLm(lettre)
            setOpened(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <>
            <div className={styles.preview}>
                <Select ref={templateSelect} data={Object.keys(templates)} label="Template CV" />
                <Select ref={refSelect} data={profil.lettres ? profil.lettres.map((l: Lettre) => l.title) : [""]} label="Lettre de motivation" />
                <MultiSelect value={refs} onChange={setRefs} data={profil.refs ? profil.refs.map((r) => r.file) : [""]} label="Références" />
                <Button color="orange" className="preview" onClick={() => openModal()}>Preview</Button>
            </div>

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



        </>
    )

}




