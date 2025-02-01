import {object,string} from 'zod'

export const SignInSchema=object({
    email: string({required_error:"email must be provided"})
    .min(1,"Email must be 8 digits long minimum")
    .email(),
    password: string({required_error:"must be provided"})
    .min(6,"minimum of 6 digits")
    .max(12,"your password cannot exceed after 12")
             
})