const express = require('express');
const slotRouter = express.Router();
const Slot = require('../db/models/Slot')
function router(){
    slotRouter.route('/addslot').post(async (req,res)=>{
        console.log(req.body)
        const {name,date,starttime,endtime} = req.body
        const slot = new Slot({name,date,starttime,endtime})
        const slotsbooked = await Slot.findAvailabilty(starttime,endtime,date.slice(0,10))
        if(slotsbooked){
            res.json({message:"Slots are not available....Please book for another slot"})
        }
        else{
        const isperson = await Slot.nameExists(name)
        console.log(isperson)
        if(!isperson){
        await slot.save()
        res.json({message:"Slot is booked"})
        }else{
        res.json({message:"Sorry Quota is over"});}
        }
    })
    slotRouter.route('/getslots').post(async (req,res)=>{
        const {date} = req.body
        console.log(req.body)
        try{
        const data = await Slot.find({date})

        res.json({data,message:'success'})
        }
        catch(e){
            res.json({data:e,message:'error'})
        }
        
    })
    return slotRouter
}
module.exports = router