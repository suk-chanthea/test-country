import { useState } from "react";
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';
import down from '../../img/sort-down.png';
import up from '../../img/sort-up.png';
import './Table.css';
const Table = ({items})=>{
    const [data,setData]=useState(items
        .sort((a,b)=>a.name.official.toLowerCase() > b.name.official.toLowerCase() ? 1 : -1));
    const [order,setOrder]=useState("DESC");
    const [query,setQuery]=useState("");
    const search =(data)=>{
        return data.filter((item)=>item.name.official.toLowerCase().includes(query));
    };
    const sorting = ()=>{
        if(order==="ASC"){
            const sorted = [...data].sort((a,b)=>a.name.official.toLowerCase() > b.name.official.toLowerCase() ? 1 : -1);
            setData(sorted);
            setOrder("DESC");
        }
        if(order==="DESC"){
            const sorted = [...data].sort((a,b)=>a.name.official.toLowerCase() < b.name.official.toLowerCase() ? 1 : -1);
            setData(sorted);
            setOrder("ASC");
        }
    

    };
    const [pageNumber,setPageNumber] = useState(0);
    const dataPerPage =25;
    const pagesVisited = pageNumber *dataPerPage;
    const pageCount = Math.ceil(search(data).length/dataPerPage);
    const changePage=({selected})=>{
        setPageNumber(selected);
    };
    return(
        <>
            <input type="text" placeholder="search country" className="search" onChange={(e)=>setQuery(e.target.value)} />
            <table className="customerTable">
                <tr>
                    <th>Flag Country</th>
                    <th className="sort" onClick={()=>{sorting();}}>Country Name<img src={(order==="ASC")?up:down} alt="icon"></img></th>
                    <th>2 Character Country Code</th>
                    <th>3 Character country Code</th>
                    <th>Native Country Name</th>
                    <th>Country Calling Code</th>
                </tr>
                {search(data).slice(pagesVisited,pagesVisited+dataPerPage).map((item)=>(
                    <tr>
                        <td><img className="flag" src={item.flags.png} alt="flag" /></td>
                        <td><Link to={`/${item.name.official}`}>{item.name.official}</Link> </td> 
                        <td>{item.cca2}</td>
                        <td>{item.cca3}</td>
                        <td>{item.translations.zho?.official??item.name.nativeName.zho.official}</td>
                        <td>{item.altSpellings}</td>
                    </tr>
                ))}
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageCount={pageCount}
          containerClassName={'paginationBttns'}
          onPageChange={changePage}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
        </>

    );
}

export default Table;