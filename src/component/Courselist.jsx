import React from 'react';
import "./Courselist.css";
import Courses from './courses';
import { useState } from 'react';
import { Container,Grid, Pagination,Select,InputLabel,MenuItem,FormControl } from '@mui/material';
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux';


export default function Courselist(coursename){
    const courselist= useSelector(state=>state.courselist)
    const [dataName, setDataName]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [cardsPerPage,setCardsPerPage]=useState(6);
    const [flag, setflag]=useState(false)
    const [options,setOptions] =useState({
        chart: {
          type: 'bar'
        },
        
        xaxis: {
          categories: []
        },
      })
      const [series, setSeries]=useState([{
          name: dataName,
          data: []
        }])
    let createlist=[]
    let parentSubject=[]
    let universityName=[]
    let parentValue=[]
    let universityValue=[]
    

    function createCards(props){ 
        return(
            <Grid item xs={12} sm={6} md={4} >    
            <Courses 
                key={props["Course Id"]} 
                id={props["Course Id"]}
                courseName={props["Course Name"]} 
                provider={props["Provider"]}
                university={props["Universities/Institutions"]}
                parentSubject={props["Parent Subject"]} 
                childSubject={props["Child Subject"]}
                url={props["Url"]}
                nextdate={props["Next Session Date"]}
            />
            </Grid>
        )
    }
    function bargraphData(psubject,university){
        let indexPsubject=Number(parentSubject.findIndex(element=>element===psubject))
        let indexUniversity=Number(universityName.findIndex(element=>element===university))
        if(indexPsubject===-1){
            psubject===''?parentSubject.push("Name Not Available"):parentSubject.push(psubject)
            parentValue.push(1)
        }
        else{
            parentValue[indexPsubject]=Number(parentValue[indexPsubject])+1
            }    
        if(indexUniversity===-1){
            university===''?universityName.push("Name Not Available"):universityName.push(university)
            universityValue.push(1)
        }
        else{
            universityValue[indexUniversity]=Number(universityValue[indexUniversity])+1
        }   
    }
    function filterthecards(){
            createlist=(((courselist.filter(element=>(element["Course Name"]).toLowerCase().includes(coursename.course))).filter(element=>(element["Child Subject"]).toLowerCase().includes(coursename.childSubject))).filter(element=>(element["Next Session Date"]).includes(coursename.selfpaced)));
            if(coursename.searchdate!==null){
                createlist=(((courselist.filter(element=>(element["Course Name"]).toLowerCase().includes(coursename.course))).filter(element=>(element["Child Subject"]).toLowerCase().includes(coursename.childSubject))).filter(element=>(element["Next Session Date"]).includes(coursename.selfpaced))).filter(element=>(element["Next Session Date"]).includes(coursename.searchdate))
            }
            if(createlist.length===0){
                return(<h2>No course found</h2>)
            }
            else{
                const indexofLastPost = currentPage*cardsPerPage;
                const indexofFirstPost= indexofLastPost-cardsPerPage;
                const currentposts=createlist.slice(indexofFirstPost,indexofLastPost)
                currentposts.map(element=>bargraphData(element["Parent Subject"],element["Universities/Institutions"]))
                return(currentposts.map(element=>createCards(element)))
            }
        
    }
    const pageHandler = (event, value) => {
        setCurrentPage(value)
        setflag(true)
        window.scrollTo(0, 0)
     }
     function handleDropdownChange(value){
         setDataName(value)
         console.log("here")
        if(value===1){
            setOptions({
                chart: {
                  type: 'bar'
                },
                xaxis: {
                  categories: parentSubject
                }
              })
              setSeries([{
                name: "Parent Course Count",
                data: parentValue
              }])
       }else if(value===2){
        setOptions({
            chart: {
              type: 'bar'
            },
            legend: {
                show: true
            },
            xaxis: {
              categories: universityName
            }
          })
          setSeries([{
            name: "University Count",
            data: universityValue
          }])
       } 
        setflag(false)
     }

     function bargraph(){
        return(
           <div className="BarGraphMenu">
           <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
             <InputLabel>Bar Graph</InputLabel>
             <Select
               value={dataName}
               onChange={(e)=>handleDropdownChange(e.target.value)}
               label="bargraphlabel"
             >  <MenuItem value={0}>None</MenuItem>
               <MenuItem value={1}>Parent Subject</MenuItem>
               <MenuItem value={2}>University</MenuItem>
               </Select>
           </FormControl>
           </div>
        )
    }
    return(
        <div>
    <div className="bodyContainer">
        <Container sx={{margin: '250px auto 0 auto'}}>
            <Grid container spacing={3}>
                {filterthecards()}
            </Grid>    
        </Container>
        <label className="counter">Course Found: {createlist.length}</label>
        <div className="pagination">
            <Pagination className="gg" count={Math.ceil(createlist.length/cardsPerPage)} size="small" onChange={pageHandler}/>
        </div>
        
    </div>
    <div className="barGraphContainer">
            {bargraph()}
            <div className="barGraph">
            {flag?handleDropdownChange(dataName):null}
            <Chart options={options} series={series} type="bar" width="80%" height="300px"/>
            </div>
            
        </div>
    </div>
    );
}