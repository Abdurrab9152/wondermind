
import axios from "axios"




const apiClient = axios.create({
    baseURL : '/api/v1',
    withCredentials : true,
    timeout : 180000
})



const loginUser = (data: any) => {
    
    return apiClient.post('/auth/login',{identifier: data.identifier, password: data.password})
}


const registerUser = (data: any) => {
    try {
        const formData = new FormData()
    formData.append("fullName", data.fullName)
    formData.append("username",data.username)
    formData.append("email",data.email)
    formData.append("password",data.password)
    if(data?.avatar) formData.append("avatar",data.avatar)

    return apiClient.post('/auth/register',formData)
    } catch (error) {
        console.log(error)
    }
}




const logoutUser = () => {
    return apiClient.post(`/auth/logout`)
}



export {
   
    loginUser,
    logoutUser,
    registerUser,

}