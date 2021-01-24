
import Breadcrumb from 'react-bootstrap/Breadcrumb'
const Index = () => (
    <div className = "container">
     <Breadcrumb>
        <Breadcrumb.Item href="/create_slots">Create Slots</Breadcrumb.Item>
        <Breadcrumb.Item href="/view_slots">
            View Slots
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
    <div className = "mt-5">
        Hello Doctor
    </div>
    </div>
  )
  export default Index