import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "~/services/dashboard";


 const useDashboard=(userId:string|undefined)=>{
    const {data,isLoading,isError}=useQuery(
        {
            queryKey:['dashboard'],
            queryFn:()=>fetchDashboard(userId)
        }
    )

    return {data,isError,isLoading}
}

export {useDashboard}