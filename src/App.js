import './App.css';
import React from "react";
import Table from './components/Table/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllofCountry from './components/AllofCountry/AllofCountry';
class App extends React.Component { 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
        };
    }
    componentDidMount() {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div className='loading'>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Table items={items} />}>
            </Route>
            <Route path="/:country" element={<AllofCountry data={items}/>}></Route>
          </Routes>
        </BrowserRouter>
    );
}
}

export default App;
