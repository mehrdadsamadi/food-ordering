import mongoose from "mongoose"
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import User from "@/models/user.model"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/libs/mongoConnect";

export const options = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "ایمیل", type: "email", placeholder: "email" },
                password: { label: "کلمه عبور", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials
                
                await mongoose.connect(process.env.MONGO_URL)
                const user = await User.findOne({ email })
                const passwordOk = user && bcrypt.compareSync(password, user.password)
                
                if (passwordOk) {
                    return user
                }

                return null
            }
        })
    ]
}