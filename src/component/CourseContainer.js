import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import { fetchCourseList } from '../redux/course/courseAction'
import Body from './Body'

function CourseContainer() {
    const courselist=useSelector(state => state.courselist)
    const loading=useSelector(state=>state.loading)
    const error=useSelector(state=>state.error)
    
    const dispatch =  useDispatch()
    useEffect(()=>{
        dispatch(fetchCourseList())
    },[])
    return loading?<h2>Loading...</h2>:error?<h2>{error}</h2>:<Body/>
    
}

export default CourseContainer
