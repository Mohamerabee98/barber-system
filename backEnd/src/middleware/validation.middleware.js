import { Types } from "mongoose"

export const isValid = (schema)=>{

    return (req,res,next)=>{
            // valid
            const data = {...req.body ,...req.params ,...req.query}
            const result = schema.validate(data , {abortEarly : false})
            // case fail 
            
            if(result.error){
                let messages = result.error.details.map((obj)=> obj.message)
                // global error handling
                return next(new Error(messages , {cause :400}))
            }
            // case success
            return next()
    }
}
export const isValidId = (value ,helpers)=>{
            if(!Types.ObjectId.isValid(value))
                return helpers.message("invalid Id")
            return true

        }