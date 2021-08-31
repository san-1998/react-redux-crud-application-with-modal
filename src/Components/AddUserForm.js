import React, { useState} from 'react'
import {
    Typography, Box, makeStyles,FormControl,InputLabel,Select,MenuItem,Input,
    Grid, Button,
    TextField,Paper,Modal,
} from '@material-ui/core'

import { Link } from 'react-router-dom' 
import UserList from './UserList'
import { Home } from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nameRegx = new RegExp('/^[a-zA-Z].*$')
const emailRegx = new RegExp('/^[a-zA-Z0-9].*@[a-zA-Z].*[.][a-zA-Z]$')
const phoneRegx = new RegExp('/^91[0-9]{10}$')

const useStyles = makeStyles({
    headingColor: {
        backgroundColor: "#455a64",
        color: "white"
    },
    addStuColor: {
        backgroundColor: "#00796b",
        color: "white"
    }
})


const AddUserForm = () => {
    const classes = useStyles();

    const [isError,setIsError] = useState({
        formError:{name: "", phone:"" , email:""},
        nameError:"",
        phoneError:"",
        emailError:""

    })


    const [user, setUser] = useState({
     name: "",
     email: "", 
     phone: "",
     userType:[]
     })

     
    const userName=[
        "Admin",
       " SuperAdmin",
        "Guest",
       " Member"
    ];


    const validator=(fields,value)=>{
     let fieldValidate=isError.formError;
     let nameValidate=isError.nameError;
     let emailValidate=isError.emailError;
     let phoneValidate=isError.phoneError;
    
     switch(fields){
         case "name":
             nameValidate=value.match(/^[A-Za-z]+$/);
             fieldValidate.name=nameValidate ? "" : "name is not valid";
            break;
         case "email":
             emailValidate=value.match();
             fieldValidate.email=emailValidate ? "" : "Phone is not valid";
             break;
         case "phone":
             phoneValidate=value.match(/^[0-9]{10}$/);
             fieldValidate.phone=phoneValidate ? ""  : "phone is not valid";
             break;
         default:
           break;
     }

     setIsError(
         {
            formError:fieldValidate,
            nameError:nameValidate,
            emailError:emailValidate,
            phoneEmail:emailValidate

         }
     )
}


    const selectionHandler=(e)=>{
       console.log("multiple selection",e);
       setUser({...user,
        userType:e.target.value});
    };

    


    const handleSubmit=(e)=>{
         e.preventDefault()
    if(user.name && user.email && user.phone && user.userType.length !==0 )
    {
        const body={
             name:user.name,
             email:user.email,
             phone:user.phone,
             userType:user.userType
         }
        var localdata = JSON.parse(localStorage.getItem('userdata'))
        localdata = localdata ? localdata : []
        localdata.push(body)
        localStorage.setItem('userdata', JSON.stringify(localdata))
  
      setUser({
            ...user,
            name:"",
            email:"",
            phone:"",
            userType:[]
        })

        toast.success('Form has been submited successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }
    else{
        toast.error('Shi Sai Form Bhar', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });

    }
}


    console.log("local storage data", user)

    return (
        <>
            <Box textAlign="center" className={classes.headingColor} p={1} mb={2}>
                <Typography variant="h5">User Form</Typography>
            </Box>
            
            <Grid container justify="center" spacing={4}>
             <Grid item md={6} xs={12}>
             
                  <Paper>
                    <Box textAlign="center" className={classes.addStuColor} p={1} mb={2}>
                        <Typography variant="h6">Add User</Typography>
                    </Box>

                    <Box m={3} textAlign="center">
                    <Link to='/list'><Button type="submit" variant="outlined" color="primary"
                    style={{float:"right"}}>User Detail</Button></Link>
                    </Box>
                    
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoComplete="name"
                                    name="name" variant="outlined"
                                    id="name" label="Name"
                                    value={user.name}
                                    onChange={(e) =>
                                        setUser({ ...user, name: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField autoComplete="email"
                                    name="email" variant="outlined"
                                    id="email" label="Email Address"
                                    value={user.email}
                                    onChange={(e) => setUser({
                                        ...user,
                                        email: e.target.value
                                    })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField autoComplete="phone"
                                    name="phone" variant="outlined"
                                    id="phone" label="Phone Number"
                                    value={user.phone}
                                    onChange={(e) => setUser({
                                        ...user,
                                        phone: e.target.value
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid item xs={12}>
                        <FormControl>
                        <Box>
                            <InputLabel fullWidth id="demo-multiple-name-label">
                                Select
                            </InputLabel> 
                        </Box>
                            <Select
                            multiple={true}
                            value = {user.userType}
                            onChange={selectionHandler}
                            // onChange={(e)=>setUser({...user,
                            // userType:e.target.value})}
                            input={<Input/>}
                            displayEmpty
                            >
                            {
                             userName.map((name)=>(
                                 <MenuItem key={name} value={name}>
                                       {name}
                                    </MenuItem>
                             ))
                            }
                            </Select>
                        </FormControl>
                        </Grid>
                       
                        <Box m={3} textAlign="center">
                        <Button type="submit" variant="outlined" color="primary">submit</Button>
                        </Box>
                        
                        <br></br>
                    </form>
                    </Paper>
                    
                </Grid>
            </Grid>
        <ToastContainer/>
        </>
    )
}

export default AddUserForm
