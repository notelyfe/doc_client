import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../../Hooks/useRefreshToken"
import Context from "../../Context/Context";

const PersistLogin = () => {
    const { accessToken, persist } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error)
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false

    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin