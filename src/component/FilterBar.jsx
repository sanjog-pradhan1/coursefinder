import './FilterBar.css';
import React from 'react';
import { TextField,Checkbox,FormControlLabel} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SubjectIcon from '@mui/icons-material/Subject';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {useSelector,useDispatch} from 'react-redux';
import { FETCH_COURSEDATA_SUCCESS } from '../redux/course/courseActionconst';



function FilterBar(){
        const courselist= useSelector(state=>state.courselist)
        const dispatch=useDispatch()
        const [course,setCourse]=React.useState('')
        const [childSubject,setChildSubject]=React.useState('')
        const [fetchDate, setfetchDate] = React.useState(null);
        const [searchDate,setSearchDate]=React.useState(null);
        const [ischecked,setischecked]=React.useState(false);
        const [selfpaced,setSelfpaced]=React.useState('');
        const months=["Jan,","Feb,","Mar,","Apr,","May,","Jun,","Jul,","Aug,","Sep,","Oct,","Nov,","Dec,"]

        function convert(str) {
            var date = new Date(str),
              month = (months[date.getMonth()]).slice(-4),
              day = ((date.getDate()<4)?date.getDate()===3?date.getDate()+"rd":date.getDate()===2?date.getDate()+"nd":date.getDate()+"st":date.getDate()+"th").slice(-4);
              setSearchDate([day,month,date.getFullYear()].join(" "))
          }
        function filterData(e){
            e.preventDefault()
                dispatch(FETCH_COURSEDATA_SUCCESS(
                    (((courselist.filter(element=>(element["Course Name"]).toLowerCase().includes(course))).filter(element=>(element["Child Subject"]).toLowerCase().includes(childSubject))).filter(element=>(element["Next Session Date"]).includes(selfpaced))).filter(element=>(element["Next Session Date"]).includes(searchDate))
                ))
                
        }
        function resetParameters(){
                setCourse('');
                setChildSubject('');
                setischecked(false);
                setSelfpaced('');
                setSearchDate(null);
                setfetchDate(null);
        }
        return(
            <div>
            <form onSubmit={filterData}>
                <div className="filterContainer" >
                    <Grid container spacing={2} justifyContent='center' alignItems='center' sx={{marginTop:'0'}}>
                        <Grid item >
                            {<MenuBookIcon color="primary" sx={{mr: 1, my: 0.5}}/>}
                            <TextField 
                            id="pcourse" 
                            placeholder="Course" 
                            variant="standard" 
                            onBlur={(e)=>{
                                setCourse(e.target.value.toString().toLowerCase())
                            }}
                            >

                            </TextField>
                        </Grid>
                        <Grid item >
                            {<SubjectIcon color="primary" sx={{mr: 1, my: 0.5}}/>}
                            <TextField 
                            id="ccourse" 
                            placeholder="Child Subject" 
                            variant="standard"
                            onBlur={(e)=>{
                                setChildSubject(e.target.value.toString().toLowerCase())
                            }}
                            >

                            </TextField>
                        </Grid>
                    <Grid item >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={fetchDate}
                                onChange={(newValue) => {
                                setfetchDate(newValue);
                                convert(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                    </Grid>
                        <Grid item >
                        <FormControlLabel 
                            control={<Checkbox checked={ischecked} 
                            onChange={(e)=>{
                                                setischecked(e.target.checked); 
                                                if(ischecked){
                                                    setSelfpaced("Self paced")
                                                }
                                                else{
                                                    setSelfpaced("")
                                                }
                                            }
                                        }/>} 
                            label="Self Paced" />
                        </Grid>
                        <Grid item >
                            <Button type="reset" data-testid="resetbtn" bt onClick={resetParameters}variant='contained' endIcon={<ReplayIcon/>} sx={{'&:hover': {
                        backgroundColor: 'white',
                        color: 'blue',
                    },}} >Reset</Button>
                        </Grid>
                        <Grid item >
                            <Button  type="submit" data-testid="searchbtn" variant='contained'sx={{'&:hover': {
                        backgroundColor: 'white',
                        color: 'blue',
                    },
                    }} >Search</Button>
                        </Grid>
                        </Grid>

                </div>
                </form>
            </div>
        );
    }

export default FilterBar;
