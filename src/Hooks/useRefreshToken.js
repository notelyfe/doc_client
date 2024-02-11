import { useContext } from "react";
import api from "../Services/api";
import Context from "../Context/Context";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
    const { setAccessToken, accessToken } = useContext(Context)
    const navigate = useNavigate()

    const refreshApi = async () => {
        try {
            const res = await api.get("/api/refresh", {
                withCredentials: true
            })
            setAccessToken(res.data.access_token);
            return res.data.access_token;
        } catch (error) {
            if (error.response.status === 403) {
                navigate("/login")
            }
        }
    }

    const refresh = async () => {

        if (accessToken === null) {
            let res = await refreshApi()
            return res

        } else {
            let decode = jwtDecode(accessToken)
            let isExpire = dayjs.unix(decode.exp).diff(dayjs()) < 1;
            if (!isExpire) {
                return accessToken
            }
            let res = await refreshApi()
            return res
        }

    }
    return refresh;
}

export default useRefreshToken;