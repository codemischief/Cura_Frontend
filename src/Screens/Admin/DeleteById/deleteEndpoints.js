import { APIService } from "../../../services/API";
export const deleteClientInfo = async (id) => {
    const data = {
        "user_id": 1234,
        "id": id
    }
    const response = await APIService.deleteClientInfo(data)
    const res = await response.json()
    // we send these messages back to the server
    
}