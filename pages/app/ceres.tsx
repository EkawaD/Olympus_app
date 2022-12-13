import { LoadingOverlay, Select } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGroup from "../../hooks/useGroup";
import useSession from "../../hooks/useSession";


export default function Ceres() {

    const { groups, currentGroup, setCurrentGroup, setGroupName } = useGroup()


    const [recipes, setRecipes] = useState()
    const addRecipe = () => {

    }

    if (!groups || !currentGroup) return <LoadingOverlay visible />
    return (
        <>
            <h1>Meal Plan</h1>

            <div className="group">
                <Select data={groups.map((g) => g.name)} value={currentGroup.name} onChange={setGroupName}></Select>
            </div>


            <h1>En construction :</h1>
            <p>Recipe</p>
            <p>Product</p>
            <p>Frigo : Product[]</p>
            <p>Courses: Product[]</p>

            <h1>General</h1>
            <ul>
                <li>Ceres Back + Front</li>
                <li>CSS GLOBAL</li>
                <li>Optimisation Hermes</li>
                <li>Hermes = Dashboard</li>
                <li> Profil,  Anon,  Group</li>
                <li>Signal a bug & Messages</li>

            </ul>



        </>
    );

}