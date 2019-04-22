import { User } from '../models/user'


exports = module.exports = {
    getAllUser: ()  =>{User.findAll()},
    addUser: async(reqBody)=> {
        if(!reqBody.username) {
            throw new Error ("Cant create user without name")
        }

        User.findOne({
            where: {
                username:reqBody.username
            }
        }).then((user) => {
            if(user != null) {
                throw new Error("Username already exist")
            }
            else {
                return User.create({
                    username:reqBody.username,
                    password:reqBody.password,
                    role:reqBody.role
                })
            }
        })

    }
}