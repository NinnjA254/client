import axios from '../axiosConfig';

export async function checkLogin(){
    try{
        const response = await axios.get('/checklogin')
        return response.data
    }
    catch(err){
        console.log(err)
    }
    
    
}