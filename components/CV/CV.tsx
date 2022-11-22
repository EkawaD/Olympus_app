import styles from './CV.module.css';
import { Skill, experienceByDate, diplomeByDate, skillbyId, formatDate } from "./index"
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai"

import { BsTelephoneFill } from "react-icons/bs"
import { GrMail } from "react-icons/gr"
import { TbWorld } from "react-icons/tb"
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../../middleware/supabase';






export default function CV({ data }: { data: Profil }) {

    const profil = data
    const experiences = data.experiences?.sort((a: Experience, b: Experience) => experienceByDate(a, b))
    const diplomes = data.diplomes?.sort((a: Diplome, b: Diplome) => diplomeByDate(a, b))
    const techSkills = data.skills?.sort((a: Skill, b: Skill) => skillbyId(a, b)).filter((skill: Skill) => skill.tech)
    const skills = data.skills?.sort((a: Skill, b: Skill) => skillbyId(a, b)).filter((skill: Skill) => !skill.tech)
    const myProjects = ["Hermes", "Héphaïstos", "Bees"]
    const projects = data.projects?.filter((p) => myProjects.includes(p.title))
    useEffect(() => {
        const main = document.querySelector("#main_cv") as HTMLElement
        main.style.setProperty('--primary', profil.color);
    }, [profil.color])

    const getFile = (objectURL: string) => {
        const obj = supabase.storage.from('olympus').getPublicUrl(objectURL)
        return obj.data.publicUrl
    }

    if (!data) return <div>Loading...</div>
    return (
        <>


            <main className={styles.main} id="main_cv">
                <div className={styles.intro}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div >
                        <Image src={getFile(profil.avatar)} width={250} height={250} className={styles.pp} alt="profil_picture" />
                    </div>
                    <ul>
                        <li><BsTelephoneFill className={styles.icon} /> {profil.tel} </li>
                        <li><a href={`mailto:${profil.mail}`} target="_blank" rel="noopener noreferrer"><GrMail className={styles.icon} />  {profil.mail} </a></li>
                        <li><a href={profil.linkedin} target="_blank" rel="noopener noreferrer"><AiFillLinkedin className={styles.icon} /> /in/{profil.linkedin.split("/")[4]} </a></li>
                        <li><a href={profil.github} target="_blank" rel="noopener noreferrer"><AiFillGithub className={styles.icon} /> /{profil.github?.split("/")[3]} </a></li>
                        <li><a href={profil.website} target="_blank" rel="noopener noreferrer"><TbWorld className={styles.icon} /> {profil.website} </a></li>
                    </ul>
                    <div className={styles.about}>
                        <h1> {profil.firstname} <span>{profil.name.toUpperCase()}</span></h1>
                        <p>{profil.intro}</p>
                    </div>
                </div>
                <div className={styles.skills}>
                    <div className={styles.techskill}>
                        <h1>TECH - SKILLS</h1>
                        <ul className={styles.tags}>
                            {techSkills?.map((skill: Skill, key) =>
                                <li key={key}><Skill className={styles.icon} skill={skill.skill} /></li>
                            )}
                        </ul>
                    </div>
                    <div className={styles.softskill}>
                        <h1>SOFT - SKILLS</h1>
                        <ul className={styles.tags}>
                            {skills?.map((skill: Skill, key) =>
                                <li key={key}>{skill.skill}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className={styles.experiences}>
                    <h1>EXPÉRIENCES <span>PROFESSIONNELLES</span></h1>
                    {experiences?.map((exp: Experience, key) =>
                        <div className={styles.job} key={key}>
                            <div>
                                <h2>{exp.entreprise.toUpperCase()}</h2>
                                <h3>{exp.poste}</h3>
                            </div>
                            <div className={styles.jobInfo}>
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                <br />
                                <span>{exp.place.toUpperCase()}</span>
                            </div>
                            <div>
                                <p>{exp.description}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.diplomes}>
                    <h1>DIPLÔMES & <span>FORMATIONS</span></h1>
                    {diplomes?.map((dip: Diplome, key) =>
                        <div className={styles.job} key={key}>
                            <div>
                                <h2>{dip.title}</h2>
                                <h3>{dip.school}</h3>
                            </div>
                            <div className={styles.jobInfo}>
                                {formatDate(dip.diplomaDate)}
                                <br />
                                <span>{dip.place.toUpperCase()}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.footer}>
                    <h1>PROJETS & CENTRES D&apos;INTÉRÊT </h1>
                    <div className={styles.projects_hobbies}>
                        <ul className={styles.project}>
                            {projects?.map((p: Project, key) =>
                                <li key={key}><AiFillGithub className={styles.icon} /> <span>{p.title}</span>, {p.description.slice(0, 44)}</li>
                            )}
                        </ul>

                        <ul className={styles.hobby}>
                            {data.hobbies?.map((hobby: Hobby, key) =>
                                <li key={key}><Skill className={styles.icon} skill={hobby.name} /></li>
                            )}
                        </ul>
                    </div>

                </div>

            </main>


        </>
    )
}
