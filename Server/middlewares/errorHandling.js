function errorHandler(error,req,res,next){
    let status = 500
    let message = "Internal Server Error"

    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
        status = 400
        message = error.errors[0].message

    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError" ){
        status = 401
        message = "Invalid Token"
    } else if (error.name === "EmailRequired"){
        status = 400
        message ="Email is Required"

    } else if (error.name === "PasswordRequired"){
        status = 400
        message = "Password is Required"

    } else if (error.name === "Unauthenticated"){
        status = 401
        message = "Email or Password is wrong"
        
    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError" ){
        status = 401
        message = "Invalid Token"

    } else if (error.name === "Forbidden"){
        status = 403
        message = "You are not authorized"
        
    } else if(error.name === "NotFound"){
        status = 404
        message = "Recipe Not Found"
       
    } 






    res.status(status).json({
        message
    })
}
module.exports = errorHandler