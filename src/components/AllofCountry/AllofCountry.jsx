import {useParams} from 'react-router-dom';
import './AllofCountry.css';

function AllofCountry({data}){
    const {country} =useParams();
    return(
        <div>
            {data.map((item) =>((item.name.official.toString()===country.toString())? <p>{JSON.stringify(item)}</p>:""))}
        </div>
    );
}

export default AllofCountry;