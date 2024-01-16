import mongoose from "mongoose"

const BrugerSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
})

export const BrugerModel = mongoose.model('Bruger', BrugerSchema)

export const getUsers = () => BrugerModel.find()
export const getBrugerByEmail = (email: string) => BrugerModel.findOne({ email })
export const getBrugerBySessionToken = (sessionToken: string) => BrugerModel.findOne({
    'authentication.sessionToken': sessionToken,
})
export const getBrugerById = (id: string) => BrugerModel.findById(id)
export const createBruger = (values: Record<string, any>) => new BrugerModel(values).save().then((bruger) => bruger.toObject())
export const deleteBrugerById = (id: string) => BrugerModel.findOneAndDelete({ _id: id })
export const updateBrugerById = (id: string, values: Record<string, any>) => BrugerModel.findByIdAndUpdate(id, values)