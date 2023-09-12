import { useState,useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Typography,
  CardHeader,
  Card,
  CardContent,
  TextField,
  Modal
} from "@mui/material";

import { makeStyles } from '@mui/styles'
import useSWR from 'swr'

import { walletStore } from "src/@core/store/walletSlice";
import { useUserStore } from "src/@core/store/userStore";
import TransactionsTable from "src/views/wallet/TransactionsTable";
import { LoadingButton } from "@mui/lab";


const useStyles = makeStyles((theme) => ({

    root: {
        minWidth: 275,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        margin: '16px',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      balance: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: '16px',
        marginBottom: '32px',
      },
      info: {
        fontSize: 16,
        marginBottom: '8px',
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '8px',
        minWidth: '500px',
        padding:'50px 70px'
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      },
    }));
  
const Wallet = () => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);

    // const [generate, setGenerate] = useState(false);
    
    const getTransactions = walletStore( (state)=> state.getTransactions)
    const getDetails = walletStore( (state)=> state.getDetails)
    const details = walletStore( (state)=> state.details)
    const add = walletStore( (state)=> state.add)
    const generate = walletStore( (state)=> state.generate)
    const setAdd = walletStore( (state)=> state.setAdd)
    const setGenerate = walletStore( (state)=> state.setGenerate)
    const generateAccount = walletStore( (state)=> state.generateAccount);
    const withdraw = walletStore( (state)=> state.withdraw);
    const loading = walletStore( (state)=> state.loading);
    const token = useUserStore( (state)=> state.user);
    const user = useUserStore( (state)=> state.details);



    const trxn = useSWR( details ? '/api/transaction' : null, () =>
        getTransactions({
            token,
            wallet_id: details.wallet_id,
            orderBy: "",
            from: "",
            to: "",
            status: "",
            type: "",
            reference_code: "",
            account: "store"
        })
    );


    useEffect(()=>{
        
        const det ={
            token: token,
            wallet_id: "",
            account: "panel", 
            store_id: "",
            orderBy: "", 
            active: "" 
        }

        getDetails(det)
    },[getDetails, token])

    const [formValues, setFormValues] = useState({
        bvn: '',
        dob: '',
        lastname: '',
        firstname: '',
    });
 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const [transferValues, settransferValues] = useState({
        amount: '',
    });
 
    const handleTransferChange = (event) => {
        const { name, value } = event.target;
        settransferValues({
          ...transferValues,
          [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        generateAccount({
            token: token,
            wallet_id: details?.wallet_id,
            bvn: formValues.bvn,
            dob: formValues.dob, 
            lastname: formValues.lastname, 
            firstname: formValues.firstname
        });
    };

    const handleWitdrwal = (event) => {
        event.preventDefault();
        withdraw({
            token: token,
            wallet_id: details?.wallet_id,
            amount: transferValues.amount
        })
    }  


    return (
        <>
            <Grid container spacing={6} >
                <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
                    <Typography variant='h5'>
                        Wallet
                    </Typography>
                    <Button variant="contained" onClick={ ()=> setAdd(!add) }>Withdraw</Button>
                </Grid>
                <Grid item xs={12} sx={{ display:"flex", justifyContent: "space-between"}}>
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Available Balance
                                </Typography>
                                <Typography className={classes.balance} color="textPrimary" gutterBottom>
                                &#8358; { details?.available_balance || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Ledger Balance
                                </Typography>
                                <Typography className={classes.balance} color="textPrimary" gutterBottom>
                                &#8358; { details?.ledger_balance || 0}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.root}>
                            <CardContent sx={{ textAlign: "left"}}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Bank Details
                                </Typography>
                                {
                                    details?.virtual_account?.virtual_account_bank_name  && (
                                        <>
                                            <Typography className={classes.info} color="textSecondary" gutterBottom>
                                                Bank Name: {details?.virtual_account.virtual_account_bank_name}
                                            </Typography>
                                            <Typography className={classes.info} color="textSecondary" gutterBottom>
                                                Account Name: {details?.virtual_account.virtual_account_name}
                                            </Typography>
                                            <Typography className={classes.info} color="textSecondary" gutterBottom>
                                                Account No: {details?.virtual_account.virtual_account_no}
                                            </Typography>
                                        </>
                                    )
                                }
                                {
                                    !details?.virtual_account?.virtual_account_bank_name  && (
                                        <>
                                            <Button variant="contained" onClick={ ()=> setGenerate(!generate) }>Generate Account</Button>
                                        </>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardHeader title='Transactions Table' titleTypographyProps={{ variant: 'h6' }} />
                        <TransactionsTable/>     
                    </Card>
                </Grid>
            </Grid>

            <Modal
                open={generate}
                onClose={()=> setGenerate(!generate)}
                className={classes.modal}

            >
                <div className={classes.paper}>
                    <form className={classes.form}  onSubmit={handleSubmit}>
                        
                    
                        <TextField
                            label="BVN"
                            name="bvn"
                            value={formValues.bvn}
                            onChange={handleInputChange}
                        />
                        {/* <TextField
                            label="Phone Number"
                            name="lastname"
                            value={formValues.lastname}
                            onChange={handleInputChange}
                            helperText="Phone Number must be the same with the one attached to your Bvn"
                        /> */}
                        <TextField
                            type="date"
                            label="Date of Birth"
                            name="dob"
                            value={formValues.dob}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText="Date of Birth must correspond with BVN"
                        />

                        <TextField
                            type="text"
                            label="Last Name"
                            name="lastname"
                            value={formValues.lastname}
                            onChange={handleInputChange}
                            helperText="Last Name must correspond with BVN record"
                        />

                        <TextField
                            type="text"
                            label="First Name"
                            name="firstname"
                            value={formValues.firstname}
                            onChange={handleInputChange}
                            helperText="First Name must correspond with BVN record"
                        />
                        <LoadingButton loading={loading} type="submit" variant="contained" color="primary">
                            Submit
                        </LoadingButton>
                    </form>
                </div>
            </Modal>

            <Modal
                open={add}
                onClose={()=> setAdd(!add)}
                className={classes.modal}

            >
                <div className={classes.paper}>
                    <form className={classes.form}  onSubmit={handleWitdrwal}>

                        <TextField
                            type="text"
                            label="Amount"
                            name="amount"
                            value={transferValues.amount}
                            onChange={handleTransferChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText="Amount to transfer"
                        />
                        <Typography  color="textSecondary" gutterBottom>
                            Bank Name: {user?.bank_details.bank_name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Bank Account: {user?.bank_details.account_no}
                        </Typography>

                        <LoadingButton loading={loading} type="submit" variant="contained" color="primary" disabled={!details?.virtual_account?.virtual_account_bank_name || !details?.virtual_account?.virtual_account_no}>
                            Withdraw
                        </LoadingButton>
                    </form>
                </div>
            </Modal>
</>
    );
}

export default Wallet;