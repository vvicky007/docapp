import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import DayPicker from 'react-daypicker';
view_slots.propTypes = {
    
};
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
function view_slots() {
    const [data,setData] = useState()
    const [Day,setday] = useState(new Date())
    useEffect(async ()=>{
       
        const data = {
            date:formatDate(Day)
        }
        const body = JSON.stringify(data)
        const res = await fetch('slots/getslots',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body
        })
        const result = await res.json()
        console.log(result)
        setData(result.data)
    },[Day])
    return (
        <>
        <div className="container">
         <Breadcrumb>
            <Breadcrumb.Item href="/create_slots">Create Slots</Breadcrumb.Item>
            <Breadcrumb.Item href="/view_slots">
                View Slots
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
        </div>
        <div className="container">
        <DayPicker active={Day} onDayClick={(day) => setday(day)}/>
        <p>Total Booked Slots:{data?data.length:"0"}</p>
        <table className="table mt-0 container">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Day</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data?
                           data.map((slot)=>{
                               return (
                                   <tr>
                                       <td>
                                           {slot.name}
                                       </td>
                                       <td>
                                           {new Date(slot.starttime * 1000).toISOString().substr(11, 5)}
                                       </td>
                                       <td>
                                            {new Date(slot.endtime * 1000).toISOString().substr(11, 5)}
                                       </td>
                                       <td>
                                           {(slot.starttime/3600)>12?"Noon":"Morning"}
                                       </td>
                                   </tr>
                               )
                           }):""
                        }
                    </tbody>
               </table>
            
        </div>
        </>
    );
}

export default view_slots;