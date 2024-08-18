import { http } from "~/libs/ky";
import { DashboardResponse,DashboardResponseError } from "~/types/dashboard/dashboard";
import { HTTPError } from "ky";


const fetchDashboard=async (userId:string|undefined):Promise<DashboardResponse>=>{
    try{
        const response=await http.get(`Dashboards?userId=${userId}`).json<DashboardResponse>()
        return response
    }
    catch(error){
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<DashboardResponseError>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
}

export {fetchDashboard}