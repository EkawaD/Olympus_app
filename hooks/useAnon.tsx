import { useState, useEffect } from "react";
import useSessionStorage from "./useSession";

const useProfil = () => {
    const [value, setValue] = useState<Anon>()
    const jwt = useSessionStorage('jwt')
    const baseURL = useSessionStorage('baseURL')

    useEffect(() => {
        const getProfil = async () => {
            if (baseURL) {
                const res = await fetch(`${baseURL}/hermes/anon/me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                const data = await res.json();
                setValue(data);
            }
        };

        getProfil();
    }, [baseURL, jwt])

    return value as Anon;
}

export default useProfil