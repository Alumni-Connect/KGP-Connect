import { createTransport } from "nodemailer";

type Params = {
  identifier: string;
  otp: string;
};

const provider = {
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
};

export async function sendOTPVerificationEmail(params: Params) {
  const { identifier, otp } = params;

  try {
    console.log("sending otp");

    const transport = createTransport(provider.server);

    const result = await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Change your password for kgp connect`,
      text: "Change it quick",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KGP Connect - Email Verification</title>
    <style>
        body{
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: 'Arial', sans-serif;
        }
        
        .container {
            width: 100%;
            max-width: 600px;
            margin: 40px auto;
            background-color: #cedaf2;
            border-radius: 12px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
        }

        .header {
            background-color: #3f51b5;
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }

        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
        }

        .content {
            padding: 30px;
            text-align: center;
        }

        .content h2 {
            color: #1f2937;
            font-size: 22px;
            margin-bottom: 20px;
        }

        .content p {
            color: #4b5563;
            font-size: 16px;
            margin-bottom: 30px;
        }

        .btn {
            display: inline-block;
            background-color: #4f46e5; 
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5); 
        }

        /* Footer */
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
        }

        .footer a {
            color: #4f46e5;
            text-decoration: none;
            font-weight: bold;
        }

        /* Responsive Design */
        @media (max-width: 600px) {
            .container {
                width: 100%;
                padding: 20px;
            }

            .header h1 {
                font-size: 22px;
            }

            .content h2 {
                font-size: 20px;
            }

            .content p {
                font-size: 14px;
            }

            .btn {
                padding: 12px 25px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>KGP Connect</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Let's get you signed in</h2>
            <p>To complete your registration, click the button below to verify your email address.</p>
            <p class="btn">"${otp}"</a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>If you didn't request this email, you can safely ignore it.</p>
            <p>If you're experiencing issues, please contact <a href="mailto:support@kgpconnect.com">KGP Connect Support</a>.</p>
        </div>
    </div>
</body>
</html>
`,
    });
    const failed = result.rejected.filter(Boolean);
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }

    return;
  } catch (e) {
    console.log("Error occurred", e);
    throw new Error("failed at sending the mail");
  }
}
