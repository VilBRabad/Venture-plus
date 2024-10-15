import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import Config from 'react-native-config';
import * as Keychain from "react-native-keychain";


const fetchUserFromServer = async (): Promise<{ user: IUser, userProfile: IUserProfile | null }> => {
    const accessToken = await Keychain.getGenericPassword();
    // console.log()
    // console.log("checkpoint 3");
    const res = await axios.get(`${Config.BASE_URL}/api/v1/user/get-current-user`, {
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


const saveToList = async (company: string) => {
    const accessToken = await Keychain.getGenericPassword();
    const res = await axios.post(`${Config.BASE_URL}/api/v1/user/save-to-list?company=${company}`, {}, {
        headers: {
            Authorization: accessToken ? accessToken.password : undefined
        }
    });

    return res.data;
}


const removeFromSaveList = async (company: string) => {
    const accessToken = await Keychain.getGenericPassword();
    const res = await axios.post(`${Config.BASE_URL}/api/v1/user/remove-from-list`, { id: company }, {
        headers: {
            Authorization: accessToken ? accessToken.password : undefined
        }
    });

    return res.data;
}


export const useAddToSaveList = (CompanyId: string) => {
    return useMutation({
        mutationFn: () => saveToList(CompanyId)
    })
}

export const useRemoveFromSaveList = (CompanyId: string) => {
    return useMutation({
        mutationFn: () => removeFromSaveList(CompanyId)
    })
}