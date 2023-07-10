import UploadData from '../uploadData/uploadData'
import Events from '../Events/Events'
import "./Home.css"
const Home = ()=>{
    return (
        <div className='home-container'>
            <UploadData/>
            <Events/>
        </div>
    )
}
export default Home