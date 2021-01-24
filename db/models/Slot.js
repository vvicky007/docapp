const mongoose = require('../mongoose')

const SlotSchema = mongoose.Schema({
    name:{  
        type:String,
        required:true,
       
    },
    starttime:{
        type:Number,
        required:true,
        
    },
    endtime:{
        type:Number,
        required:true,
    },
    date:{
        type: String,
        required:true,
    },
    
   
})
SlotSchema.statics.findAvailabilty = async (start_time,end_time,date)=>{
    const slots = await Slots.find({date})
    
    const avail = slots.find((slot)=>(slot.starttime>=start_time&&slot.starttime<end_time)||(slot.endtime > start_time&&slot.endtime<end_time))
    console.log("avail is",avail)
    if(avail){
        
        return true
    }
    return false
    
}
SlotSchema.statics.nameExists = async (name)=>{
    const slots = await Slots.find({name})
    console.log("inside pe",slots)
    if(slots.length>0){
        return true
    }
    return false
}
SlotSchema.pre('save',function (next){
    const slot = this
    slot.date = slot.date.slice(0,10)
    next()
})
const Slots = mongoose.model('Slots', SlotSchema)

module.exports = Slots