
export const usernameByUserId = async (userid) => {
    const data = { "user_id": 1234 };
    const response = await APIService.getUsers(data)
    const result = (await response.json());
    
    for(var i=0;i<result.data.length;i++) {
        if(result.data[i].id == userid){
            return result.data.name
        }
    }
    return ""
   
  };