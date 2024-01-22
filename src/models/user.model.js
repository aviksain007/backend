import mongoose, {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'
import { Jwt } from 'jsonwebtoken'

const userSchema = new Schema({
    username : {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        indexed: true,
    },
    email : {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname : {
        type: 'string',
        required: true,
        lowercase: true,
        trim: true
    },
    avtar: {
        type: 'string',
        required: true
    },
    coverImage : {
        type: 'string'
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: 'string',
        required: [true,"Password is required"]
    },
    refreshToken: {
        type: 'string'
    }

},{timestamps: true})

userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
} 

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)