import styles from './LettreM.module.css';
import React, { useEffect } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { GrMail } from 'react-icons/gr';
import { TbWorld } from 'react-icons/tb';
import { MdPlace } from 'react-icons/md';


const formatDate = (dateString: string | number) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options as any)
}


export default function LettreM({ profil, lm, dev }: { profil: Profil, lm: Lettre, dev: boolean }) {


    const color = profil.color
    useEffect(() => {
        const main = document.querySelector("#main_lm") as HTMLElement
        main.style.setProperty('--primary', color);
    }, [color])


    if (!profil) return <div>Loading...</div>
    return (
        <>


            <main className={styles.main} id="main_lm">
                <div className={styles.contact}>
                    <p>{profil.firstname} <span> {profil.name}</span></p>
                    <ul>
                        <li><BsTelephoneFill className={styles.icon} /> {profil.tel} </li>
                        <li><a href={`mailto:${profil.mail}`} target="_blank" rel="noopener noreferrer"><GrMail className={styles.icon} />  {profil.mail} </a></li>
                        <li><a href={profil.linkedin} target="_blank" rel="noopener noreferrer"><AiFillLinkedin className={styles.icon} /> /in/{profil.linkedin.split("/")[4]} </a></li>
                        {dev ?
                            <>
                                <li><a href={profil.github} target="_blank" rel="noopener noreferrer"><AiFillGithub className={styles.icon} /> /{profil.github?.split("/")[3]} </a></li>
                                <li><a href={profil.website} target="_blank" rel="noopener noreferrer"><TbWorld className={styles.icon} /> {profil.website} </a></li>
                            </>
                            :
                            <li><MdPlace className={styles.icon} /> {profil.address} </li>
                        }
                    </ul>
                </div>
                <div className={styles.dest}>
                    <p>Le: {formatDate(Date.now())}</p>
                    <p>A l&apos;attention des Ressources Humaines et manager d&apos;équipe</p>
                    <p style={{ fontWeight: "600" }}>Objet: {lm.objet}</p>
                </div>
                <div className={styles.lm}>
                    <p style={{ marginLeft: "4rem" }}>
                        Madame, Monsieur,
                    </p>
                    <p>
                        {lm.content.split(/\r?\n/).map((l, key) => <span key={key}><br />&emsp;&emsp;{l}</span>)}
                    </p>
                    <p>
                        &emsp;&emsp;Je vous remercie vivement de l’attention que vous porterez à cette lettre et me tiens à votre disposition pour vous
                        rencontrer et ainsi échanger avec vous sur ce que je peux apporter à votre structure. Dans la perspective de notre prochaine
                        rencontre, je vous prie de recevoir, Madame, Monsieur, mes salutations les plus respectueuses.
                    </p>
                </div>
                <div className={styles.eof}>
                    <p> Cordialement,
                    </p>
                    <p className={styles.signature}> {profil.name} {profil.firstname}</p>
                </div>
            </main>


        </>
    )
}
