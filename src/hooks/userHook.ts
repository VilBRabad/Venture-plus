import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import * as Keychain from "react-native-keychain";


const fetchUserFromServer = async () => {
    const accessToken = await Keychain.getGenericPassword();
    const res = await axios.get("http://192.168.43.37:8000/api/v1/user/get-current-user", {
        headers: {
            Authorization: accessToken ? accessToken.password : undefined
        }
    })

    // console.log(res.data.data);
    return res.data.data;
}

export const useGetUserQuery = (): UseQueryResult<{ user: IUser, userProfile: IUserProfile | null }> => (
    useQuery<{ user: IUser, userProfile: IUserProfile | null }>({
        queryKey: ['get-user'],
        queryFn: fetchUserFromServer
    })
)