import { useState, useEffect } from "react";
import useSessionStorage from "./useSession";

const useProfil = () => {
    const [value, setValue] = useState<Profil | null>()
    const jwt = useSessionStorage('jwt')
    const baseURL = useSessionStorage('baseURL')

    useEffect(() => {
        const getProfil = async () => {
            if (baseURL) {
                const res = await fetch(`${baseURL}/hermes/cv/me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                const data = await res.json();
                if (data.statusCode) setValue(null)
                else setValue(data);
            }
        };

        getProfil();
    }, [baseURL, jwt])


    return value;
}

export default useProfil