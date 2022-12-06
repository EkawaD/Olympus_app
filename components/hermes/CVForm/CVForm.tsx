import { useForm } from "@mantine/form"
import { showNotification } from '@mantine/notifications';

import { supabase } from "../../../middleware/supabase";
import useSessionStorage from "../../../hooks/useSession";

import Form from "../../common/Crud/Form"
import CrudTable from "../../common/Crud/CrudTable"
import Input from "../../common/Crud/Form/Input"
import styles from "./CVForm.module.css"


export default function CVForm({ profil }: { profil: Profil }) {

    const baseURL = useSessionStorage("baseURL") as string
    const jwt = useSessionStorage("jwt") as string

    const handleFile = async (thefile: any) => {
        const name = thefile.get("theFiles").name
        const { data, error } = await supabase.storage
            .from('olympus')
            .upload(name, thefile)
    }
    const handleSubmit = async (p: Profil) => {
        try {

            const res = await fetch(`${baseURL}/hermes/cv/me`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(p)
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
                        baseURL={`${baseURL}/hermes/cv/experience`}
                        jwt={jwt}
                    />
                    <CrudTable<Diplome>
                        title={"Diplômes"}
                        items={profil.diplomes as Diplome[]}
                        schema={diplomeSchema}
                        baseURL={`${baseURL}/hermes/cv/diplome`}
                        jwt={jwt}
                    />
                    <CrudTable<Skill>
                        title={"Compétences"}
                        items={profil.skills as Skill[]}
                        schema={skillSchema}
                        baseURL={`${baseURL}/hermes/cv/skill`}
                        jwt={jwt}
                    />
                    <CrudTable<Hobby>
                        title={"Hobby"}
                        items={profil.hobbies as Hobby[]}
                        schema={hobbySchema}
                        baseURL={`${baseURL}/hermes/cv/hobby`}
                        jwt={jwt}
                    />
                    <CrudTable<Lettre>
                        title={"Lettres de motivation"}
                        items={profil.lettres as Lettre[]}
                        schema={lettreSchema}
                        baseURL={`${baseURL}/hermes/cv/lettre`}
                        jwt={jwt}
                    />
                    <CrudTable<Ref>
                        title={"Références PDF"}
                        items={profil.refs as Ref[]}
                        schema={refSchema}
                        baseURL={`${baseURL}/hermes/cv/ref`}
                        jwt={jwt}
                    />
                    <CrudTable<Project>
                        title={"Projets"}
                        items={profil.projects as Project[]}
                        schema={projectSchema}
                        baseURL={`${baseURL}/hermes/cv/project`}
                        jwt={jwt}
                    />
                </div>


            </div>
        </>
    );

}
