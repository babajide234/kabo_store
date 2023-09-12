import React, { useState, useEffect } from 'react'

import { 
    TabContext,
    TabList,
    TabPanel,
} from "@mui/lab";

import { 
    Box,
    Card,
    Button,
    Grid,
    Typography,CircularProgress
} from "@mui/material";

import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";

import { makeStyles } from '@mui/styles';

// makeStyles

// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
    },
    table: {
      margin: 'auto',
      borderCollapse: 'collapse',
      width: '80%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    tableHeader: {
      fontWeight: 'bold',
      paddingBlock:10,
      textAlign:'left'
    },
    tableCell: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      padding: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    '@media print': {
        root: {
          padding: '0',
          margin: '0',
          border: 'none',
        },
        tableHeader: {
          borderBottom: '1px solid black',
          padding: '8px',
          textAlign: 'left',
          fontWeight: 'bold',
        },
        tableCell: {
          padding: '8px',
          textAlign: 'left',
        },
        button: {
          display: 'none',
        },
    }
}));

const RiderDetails = ({type}) => {

    const classes = useStyles();

    const [value, setValue] = useState('profile')
    
    const token = useUserStore( (state) => state.user )
    const { role } = useUserStore( (state) => state.details )

    const userId = useTeamSlice( (state) => state.userId )
    const editTeam = useTeamSlice( (state) => state.editTeam )
    const setSingleRider = useTeamSlice((state)=> state.setSingleRider)
    const setSingleTeams = useTeamSlice((state)=> state.setSingleTeams)
    const team = useTeamSlice((state)=> state.team)
    const rider = useTeamSlice((state)=> state.rider)

    const details = type == "rider" ? rider[0] : team[0] ; 
    
    console.log(details)

    useEffect(() => {
      
        if(type == 'rider'){
            const data ={
              token,
              email: userId,
              role:type,
              type: role.admin == "Yes" ? "Admin" : "SuperAdmin" 

            }
            setSingleRider(data);
        }
  
        if(type == 'admin'){
            const data ={
              token,
              email: userId,
              role:type,
              type: role.admin == "Yes" ? "Admin" : "SuperAdmin" 
            }
            setSingleTeams(data);
        }
  
    }, [token, setSingleRider,setSingleTeams,userId, type])

    const handleDownload = () => {
        // Implement your download logic here
        console.log('Downloading employee details?...');
      };
    
      const handlePrint = () => {
        // Implement your print logic here
        console.log('Printing employee details?...');
        const content = document.getElementById('employee-details');
        const pri = window.open('', '_blank');
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.print();
      };

    return (
        <>
            {
                details ? (
                    <div className={classes.root} id="employee-details">
                        <Typography variant="h4" align="center" gutterBottom>
                            Employee Details
                        </Typography>
                        <table className={classes.table}>
                            <tbody>
                            <tr>
                                <th className={classes.tableHeader}>Full Name</th>
                                <td className={classes.tableCell}>{details?.fullname}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Email</th>
                                <td className={classes.tableCell}>{details?.email}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Role</th>
                                <td className={classes.tableCell}>{details?.role}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Username</th>
                                <td className={classes.tableCell}>{details?.username}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Phone</th>
                                <td className={classes.tableCell}>{details?.phone}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Active</th>
                                <td className={classes.tableCell}>{details?.active}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Photo</th>
                                <td className={classes.tableCell}>
                                    {details?.photo ? (
                                        <img src={details?.photo} alt="employee" />
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Address</th>
                                <td className={classes.tableCell}>{details?.address}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Gender</th>
                                <td className={classes.tableCell}>{details?.gender}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>NIN</th>
                                <td className={classes.tableCell}>{details?.nin}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>BVN</th>
                                <td className={classes.tableCell}>{details?.bvn}</td>
                            </tr>
                            <tr>
                                <th className={classes.tableHeader}>Next of Kin - Last Name</th>
                                <td className={classes.tableCell}>{details?.next_of_kin.nok_lastname}</td>
                            </tr>
                            <tr>
                            <th className={classes.tableHeader}>Next of Kin - Other Names</th>
                            <td className={classes.tableCell}>{details?.next_of_kin.nok_othernames}</td>
                        </tr>
                        <tr>
                            <th className={classes.tableHeader}>Next of Kin - Address</th>
                            <td className={classes.tableCell}>{details?.next_of_kin.nok_address}</td>
                        </tr>
                        <tr>
                            <th className={classes.tableHeader}>Next of Kin - Phone</th>
                            <td className={classes.tableCell}>{details?.next_of_kin.nok_phone}</td>
                        </tr> 
                        </tbody>
                        </table>
                        <Grid container mt={10} justify="center">
                                <Grid item xs={6}>
            
                                </Grid>
                                <Grid item xs={6}>
            
                                </Grid>
                        </Grid>
                    </div>
                ):(
                    <>
                        <CircularProgress/>
                    </>
                )
            }
        </>     
    );
}

export default RiderDetails;