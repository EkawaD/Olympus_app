import { useState, useEffect } from "react";
import useSessionStorage from "./useSession";

const useAnon = () => {
    const [value, setValue] = useState<Anon | null>()
    const jwt = useSessionStorage('jwt')
    const baseURL = useSessionStorage('baseURL')

    useEffect(() => {
        const getAnon = async () => {
            if (baseURL) {
                const res = await fetch(`${baseURL}/hermes/anon/me`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                const data = await res.json();


                if (data.statusCode) setValue(null)
                else setValue(data);
            }
        };

        getAnon();
    }, [baseURL, jwt])

    return value;
}

export default useAnon