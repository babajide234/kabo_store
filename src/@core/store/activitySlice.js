
import { create } from 'zustand';
import { ativityLog } from '../hooks/service';


export const ActivityStore = create(
    ( set , get )=>({
        activities: null,
        getActivities: async (data)=>{
            const response =  await ativityLog(data);
            
            if(response.data.status == "success"){
                set( state => ({ ...state, activities: response.data.data}));
            }

            return response;
        },
        
    })
)