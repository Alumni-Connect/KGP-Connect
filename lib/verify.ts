import { Resend } from "resend"

type Params= {
    identifier: string;
    url: string;
    expires: Date;
    token: string;
    request: Request;
}

const resend= new Resend(process.env.AUTH_RESEND_KEY)

export async function sendVerificationRequest(params:Params){
    const {identifier,url,expires,token,request}=params
    const {host}=new URL(url)
    try{
        console.log(host,url)
        const {data,error}= await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: [identifier],
            subject: 'Hello world',
            html:`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to KGP Connect</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f4f5;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 40px;
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .logo {
                margin-bottom: 24px;
                color: #4f46e5;
                font-size: 32px;
                font-weight: bold;
            }
            h1 {
                color: #1f2937;
                font-size: 24px;
                margin-bottom: 16px;
            }
            p {
                color: #4b5563;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 24px;
            }
            .button {
                display: inline-block;
                background-color: #4f46e5;
                color: white;
                padding: 12px 24px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 500;
                margin: 16px 0;
            }
            .footer {
                margin-top: 32px;
                font-size: 14px;
                color: #6b7280;
            }
            .support-link {
                color: #4f46e5;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">KGP Connect</div>
            
            <h1>Let's get you signed in</h1>
            
            <p>Sign in with the secure link below</p>
            
            <a href=${url} class="button">Sign in to KGP Connect</a>
            
            <div class="footer">
                <p>If you didn't request this email, you can safely ignore it.</p>
                <p>If you're experiencing issues, please contact <a href="#" class="support-link">KGP Connect Support</a></p>
            </div>
        </div>
    </body>
    </html>`

        }) 
        return 
    }catch(e){
         console.log("Error occurred",e)
         throw new Error("failed at sending the mail")
    }

}