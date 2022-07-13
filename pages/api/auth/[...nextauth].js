import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            sessions: {
                jwt: true,
                maxAge: 30*24*60*60
            }
        }),
    ],
    secret: "secret token",
}

export default (req, res) => NextAuth(req, res, options)