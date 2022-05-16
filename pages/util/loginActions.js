import axios from "axios";
import {addingCookie} from './auth'

export const login = async (data) => {
    try{
        const loggingUser = await axios.post('http://localhost:3000/api/v1/auth/login',data)  
        if(loggingUser) {
            addingCookie(loggingUser.data.token)
        }    
    }catch(err) {
        console.log(err,'error in login function')
    }

}

export const signup = async (data) => {

    try{
        const createUser = await axios.post('http://localhost:3000/api/v1/auth/register',data);
        // if(!createUser) throw 'user was not created'
        if(createUser){
            addingCookie(createUser.data.token)
        }
    }catch(err){
        console.log(err,'happend in signup function')
    }
    
}

