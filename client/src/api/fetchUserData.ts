import axios from "../utils/axios";
import type { UserType } from "../Index.types";

export const fetchUserData = async (): Promise<UserType[]> => {
    const response = await axios.get("/users")
    console.log("Full Axios Response:", response.data);
    return response.data
}