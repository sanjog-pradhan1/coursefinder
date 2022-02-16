import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import courses from './courses'
import { Container,Grid} from '@mui/material';

export default function Body(){
    const [currentPage,setCurrentPage]=useState(1);
    const [cardsPerPage,setCardsPerPage]=useState(6);

    const courselist= useSelector(state=>state.courselist)
    const indexofLastPost = currentPage*cardsPerPage;
    const indexofFirstPost= indexofLastPost-cardsPerPage;
    const currentRenderList=courselist.slice(indexofFirstPost,indexofLastPost)
    //currentRenderList.map(element=>bargraphData(element["Parent Subject"],element["Universities/Institutions"]))
    return(
        <Container sx={{margin: '250px auto 0 auto'}}>
            <Grid container spacing={3}>
                {currentRenderList.map(element=>courses(element))}
            </Grid>    
        </Container>
        )

}