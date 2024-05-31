

module.exports = (error,req,res,next)=>{
    const statusCode = error.code || 500
    res.status(statusCode).json({
        success: false,
      status: "error",
      code: statusCode,
      data: {
        msg: error.message,
        stack: process.env.NODE_ENV =='development'?error.stack:null,
        value: error.details?.value,
        path: error.details?.path,
        field: error.details?.field,
      }
    })
}