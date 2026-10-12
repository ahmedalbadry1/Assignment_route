import { User } from "../../DB/model/index.js"

export let createUser =async (data)=>{

    let {name ,email,password,role} =data
    let existing = await User.findOne({ where: { email } })
    if(existing)
    {
       let err = new Error("email already exists")
        err.status = 409
      throw err 

    }
    let user = User.build({ name, email, password,role }) 
    await user.save()                                 

    return user
}

export let createOrUpdateUser = async (id, data) => {
  let { name, email, password, role } = data
  await User.upsert({ id, name, email, password, role }, { validate: false })
}

export let FindUserByEmail = async(email)=>{
  let user = await User.findOne({ where: { email } })

  return user
}

export let FindUserById = async (id) => {
  let user = await User.findByPk(id, { attributes: { exclude: ["role"] } })
  return user
}