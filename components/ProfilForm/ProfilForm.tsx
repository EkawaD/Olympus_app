
import { useForm } from "@mantine/form"
import { showNotification } from '@mantine/notifications';

import styles from "./ProfilForm.module.css"
import Form from "../Crud/Form"
import CrudTable from "../Crud/CrudTable"
import Input from "../Crud/Form/Input"
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { supabase } from "../../middleware/supabase";


export default function ProfilForm({ data, baseURL }: { data: Profil, baseURL: string }) {


    const profil = data


    const handleFile = async (thefile: any) => {
        const name = thefile.get("theFiles").name
        const { data, error } = await supabase.storage
            .from('olympus')
            .upload(name, thefile)
    }

    const handleSubmit = async (p: Profil) => {
        try {
            const res = await fetch(`${baseURL}/profils/${profil.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...p, userId: profil.id })
            });
            showNotification({
                title: 'Great success 😎 !',
                message: "Vos informations ont bien étés mises à jour !",
                color: "green"
            })
        } catch (error: any) {
            console.log(error)
            showNotification({
                title: 'Unexpected error :/',
                message: error.message,
                color: "red"
            })

        }
    }



    const experienceSchema = {
        entreprise: { type: "text", label: "Entreprise" },
        poste: { type: "long", label: "Poste" },
        place: { type: "text", label: "Lieu" },
        startDate: { type: "date", label: "Date de début" },
        endDate: { type: "date", label: "Date de fin" },
        description: { type: "textarea", label: "Description" },
    }
    const diplomeSchema = {
        title: { type: "long", label: "Intitulé" },
        diplomaDate: { type: "date", label: "Année d'obtention" },
        school: { type: "text", label: "École" },
        place: { type: "text", label: "Lieu" },
        description: { type: "textarea", label: "Description" }
    }
    const skillSchema = {
        skill: { type: "text", label: "Compétence" },
        tech: { type: "checkbox", label: "Technique ?" },
    }
    const hobbySchema = {
        name: { type: "text", label: "Hobby" },
    }
    const lettreSchema = {
        title: { type: "text", label: "Tittle" },
        objet: { type: "long", label: "Objet" },
        content: { type: "content", label: "Contenu" },
    }
    const refSchema = {
        file: { type: "file", label: "Choisir un fichier", handler: handleFile },
    }
    const projectSchema = {
        image: { type: "image", label: "Choisir un fichier", handler: handleFile },
        title: { type: "text", label: "Titre" },
        github: { type: "text", label: "Github" },
        demo: { type: "text", label: "Demo" },
        description: { type: "textarea", label: "Description" },
    }


    const form = useForm({
        initialValues:
        {
            avatar: profil?.avatar || "",
            color: profil?.color || "",
            name: profil?.name || "",
            firstname: profil?.firstname || "",
            tel: profil?.tel || "",
            mail: profil?.mail || "",
            linkedin: profil?.linkedin || "",
            github: profil?.github || "",
            website: profil?.website || "",
            intro: profil?.intro || "",
        }
    })
    return (
        <>
            <div className={styles.container}>

                <div className={styles.forms}>
                    <Form form={form} handler={handleSubmit} className={styles.profil}>
                        <Input name="avatar" form={form} type='image' handler={handleFile} >Changer photo de profil</Input>
                        <Input name="color" form={form} type='color'>Couleur</Input>
                        <Input name="name" form={form} type='text'>Nom</Input>
                        <Input name="firstname" form={form} type='text'>Prénom</Input>
                        <Input name="tel" form={form} type='text'>Téléphone</Input>
                        <Input name="mail" form={form} type='text'>Email</Input>
                        <Input name="linkedin" form={form} type='text'>LinkedIn</Input>
                        <Input name="github" form={form} type='text'>GitHub</Input>
                        <Input name="website" form={form} type='text'>Website</Input>
                        <Input name="intro" form={form} type='textarea' >Intro</Input>
                    </Form>
                    <CrudTable<Experience>
                        title={"Expériences"}
                        items={profil.experiences as Experience[]}
                        schema={experienceSchema}
                        baseURL={`${baseURL}/profils/cv/experience`}
                        addValue={{ profilId: profil.id }}
                    />
                    <CrudTable<Diplome>
                        title={"Diplômes"}
                        items={profil.diplomes as Diplome[]}
                        schema={diplomeSchema}
                        baseURL={`${baseURL}/profils/cv/diplome`}
                        addValue={{ profilId: profil.id }}
                    />
                    <CrudTable<Skill>
                        title={"Compétences"}
                        items={profil.skills as Skill[]}
                        schema={skillSchema}
                        baseURL={`${baseURL}/profils/cv/skill`}
                        addValue={{ profilId: profil.id }}
                    />
                    <CrudTable<Hobby>
                        title={"Hobby"}
                        items={profil.hobbies as Hobby[]}
                        schema={hobbySchema}
                        baseURL={`${baseURL}/profils/cv/hobby`}
                        addValue={{ profilId: profil.id }}
                    />
                    <CrudTable<Lettre>
                        title={"Lettres de motivation"}
                        items={profil.lettres as Lettre[]}
                        schema={lettreSchema}
                        baseURL={`${baseURL}/profils/cv/lettre`}
                        addValue={{ profilId: profil.id }}
                    />
                    <CrudTable<Ref>
                        title={"Références PDF"}
                        items={profil.refs as Ref[]}
                        schema={refSchema}
                        baseURL={`${baseURL}/profils/cv/ref`}
                        addValue={{ profilId: profil.id }}
                    />
                    <CrudTable<Project>
                        title={"Projets"}
                        items={profil.projects as Project[]}
                        schema={projectSchema}
                        baseURL={`${baseURL}/profils/cv/project`}
                        addValue={{ profilId: profil.id }}
                    />
                </div>


            </div>
        </>
    );

}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


