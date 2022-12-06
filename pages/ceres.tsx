import useSessionStorage from "../hooks/useSession";


export default function Ceres() {

    const jwt = useSessionStorage("jwt")

    return (
        <>
            Ceres
            {jwt}
        </>
    );

}