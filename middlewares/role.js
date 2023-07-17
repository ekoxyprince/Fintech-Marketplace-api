
const user = (req,res,next)=>{
    if(!req.user || req.user.role !== 'Subscriber'){
        return res.status(400).json({success:false,info:{message:'Unauthorized request'}})
    }else{
        return next()
    }
}
const admin = (req,res,next)=>{
    if(!req.user || req.user.role !== 'Administrator'){
        return res.status(400).json({success:false,info:{message:'Unauthorized request'}})
    }else{
        return next()
    }
}