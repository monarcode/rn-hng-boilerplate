import { useQuery } from "@tanstack/react-query";
import { http } from "~/libs/ky";
import { ProductService } from "~/services/product";


export const useProducts=(orgId:string|undefined)=>{
    const {data,isError,isLoading}=useQuery(
        {
            queryKey:['product'],
            queryFn:()=>ProductService.fetchProducts(orgId)
        }
    )
    return {data,isError,isLoading}
}