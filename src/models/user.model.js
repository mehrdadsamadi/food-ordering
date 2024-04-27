import bcrypt from 'bcrypt';
import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: {type: String},
    image: {type: String},
    email: { type: String, required: true, unique: true },
    admin: {type: Boolean, default: false},
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (pass) {
                if (!pass.length || pass.length < 5) {
                    return false
                } else {
                    return true
                }
            },
            message: "کلمه عبور باید حداقل 5 کاراکتر باشد"
        }
    }
}, { timestamps: true,versionKey: false })

userSchema.post("validate", (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
})

const User = models?.user || model("user", userSchema)

export default User;