import bcrypt from "bcrypt"

const salt=10
export const hashPassword=async(password:string)=>{
    try{
    const hash=await bcrypt.hash(password,salt)
    return {
        status:true,
       hashedPassword: hash
    }
    }catch(e){
        return {
            status:false
            }
    }
  }

  export const checkPassword=async(password:string,hashedPassword:string)=>{
     try{
        const check=await bcrypt.compare(password,hashedPassword)
        if(!check){
            return false
        }
        return true
     }catch(e){
        console.log(e)
        return false
     }
  }