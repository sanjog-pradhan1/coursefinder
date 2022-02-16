import React from 'react';
import Card from '@mui/material/Card';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';



export default function courses(props){
    return(
        <Grid item xs={12} sm={6} md={4} >
            <Card >
                <CardContent 
                sx={{'&:hover': {
                backgroundColor: '#E5DCC3',
                },
            //whiteSpace: "noWrap",
            width: "380px",
            minHeight:"250px",
            }}>
            <Grid container justifyContent="space-around">
                <Grid item>
                    <Typography sx={{fontFamily: "Source Code Pro, monospace"}}>{props["Course Id"]}</Typography>
                </Grid>
                <Grid item >
                    <Typography float="right">{<CalendarTodayIcon/>}{props["Next Session Date"]}</Typography>
                </Grid>
                </Grid>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: "grey"
                        }}
                    >
                        Provider
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "black",
                            fontWeight: "bold"
                        }}
                    >
                        {props["Provider"]}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: "grey"
                        }}
                    >
                        Course Name
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "red",
                            fontWeight: "bold"
                        }}
                    >
                        {props["Course Name"]}
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: "grey"
                        }}
                    >
                        Universities/Institutions
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                        }}
                    >
                        {props["Universities/Institutions"]}
                    </Typography>
                    {/* <Grid container justifyContent="space-between"> */}
                    <Grid item>
                        <Typography
                            variant='subtitle1'
                            sx={{
                                color: "grey"
                            }}
                        >
                        Parent Subject
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "black",
                                fontWeight: "bold"
                            }}
                        >
                        {props["Parent Subject"]}
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography
                            variant='subtitle1'
                            sx={{
                                color: "grey"
                            }}
                        >
                        Child Subject
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            noWrap
                            sx={{
                                color: "black",
                                fontWeight: "bold",
                            }}
                            >
                            {props["Child Subject"]}
                            </Typography>
                    </Grid>
                </CardContent>
                    
            </Card>
            </Grid>
    );
}

