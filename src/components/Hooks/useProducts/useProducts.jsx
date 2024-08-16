import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublix";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: products = [], isPending: loading, } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        }
    })

    return [products, refetch, loading]
};

export default useProducts;