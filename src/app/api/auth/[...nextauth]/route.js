import NextAuth, { getServerSession } from "next-auth"
import { options } from "./options"
import User from "@/models/user.model"

export async function isAdmin() {
    const {user : {email}} = await getServerSession(options)
    if(!email) {
        return false
    }

    const userInfo = await User.findOne({email})
    if(!userInfo) {
        return false
    }

    return userInfo.admin
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }