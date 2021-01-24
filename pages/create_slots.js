import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react';
import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
import TimePicker from 'react-bootstrap-time-picker';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
function create_slots() {
    const [show, setShow] = useState(false);
    
    const handleClose =async () => {
        const data = {
            name:user,
            date:Day,
            starttime:start,
            endtime:end
        }
        const body = JSON.stringify(data)
        const resp = await fetch('slots/addslot',{
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body
        })
        const result = await resp.json()
        setMessage(result.message)
        console.log(Day < new Date())
        if(result.message=="Slot is booked"||message=="Sorry Quota is over"){
        setShow(false)
        }
    };
    
    const handleShow = () => setShow(true);
    const [Day, setDay] = useState(new Date());
    const [user,setuser] = useState("")
    const [start,setStart] = useState(36000)
    const [end,setEnd] = useState(39600)
    const [message,setMessage] =useState("")
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
        <div className = "container mt-5" value={user}>
           <input type="text" placeholder="Name" className="m-2" onChange = {(e)=>setuser(e.target.value)} required/>
            <p className = "container text-success">{message}</p>
           <Button variant="primary" size="sm" onClick={handleShow} disabled = {user==""} >
                Create Slots
            </Button> 
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" >Book Your Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body className = "ml-auto mr-auto">
                    <div>
                    <DayPicker  active={Day} onDayClick={(day) => setDay(day)}/>
                   
                    Start:
                    <TimePicker start="10:00" end="17:30" step={30} className="mt-2" value={start} onChange={(time)=>setStart(time)} />
                    End:
                    <TimePicker start="10:30" end="18:00" step={30} className="mt-2" value={end} onChange={(time)=>setEnd(time)}/>
                    </div>
                    <p>{show?message:""}</p>
                    {end-start>1800?"Can not book a slot for more than one hour":""}
                    {end<start?"Timings provided are incorrect...Please Check":!show?"Booked slots information can be found in slots":""}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} className = "ml-0" disabled = {end<=start ||end-start>1800 }>
                        Book
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
}

export default create_slots;