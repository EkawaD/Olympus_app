import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSession from "./useSession";

const useGroup = () => {
    const jwt = useSession("jwt")
    const baseURL = useSession("baseURL")
    const router = useRouter()
    const [groups, setGroups] = useState<Group[]>([])
    const [currentGroup, setCurrentGroup] = useState<Group>(groups[0])
    const [firstRender, setFirstRender] = useState<boolean>(true)


    const setGroupName = async (value: string | null) => {
        const res = await fetch(`${baseURL}/users/group/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const data = await res.json()
        const group = data.find((g: Group) => g.name === value) as Group
        setCurrentGroup(group)
    }

    useEffect(() => {

        const getGroup = async () => {
            const res = await fetch(`${baseURL}/users/group/me`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            const groups = await res.json()
            if (groups.statusCode) router.push("/")
            else {
                setGroups(groups)
                setCurrentGroup(groups[0])
                setFirstRender(false)
            }

        }
        if (baseURL && jwt && firstRender) getGroup()

    }, [baseURL, jwt, currentGroup, router, firstRender])

    return { groups, currentGroup, setCurrentGroup, setGroupName };
}

export default useGroup