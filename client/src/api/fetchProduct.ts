import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("/marketplace/products");
            return res.data;
        },
    });
};
