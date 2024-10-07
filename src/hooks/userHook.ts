import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import * as Keychain from "react-native-keychain";


const fetchUserFromServer = async (): Promise<{ user: IUser, userProfile: IUserProfile | null }> => {
    const accessToken = await Keychain.getGenericPassword();
    // console.log()
    // console.log("checkpoint 3");
    const res = await axios.get("http://192.168.43.37:8000/api/v1/user/get-current-user", {
        headers: {
            Authorization: accessToken ? accessToken.password : undefined
        }
    })

    // console.log("checkpoint 4");
    // console.log("hook data: ", res.data.data);
    await AsyncStorage.setItem("username", res.data.data.user.name);
    return res.data.data;
}

export const useGetUserQuery = (): UseQueryResult<{ user: IUser, userProfile: IUserProfile | null }> => (
    useQuery<{ user: IUser, userProfile: IUserProfile | null }>({
        queryKey: ['get-user'],
        queryFn: fetchUserFromServer
    })
)