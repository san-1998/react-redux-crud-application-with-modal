import React, { useEffect, useState } from 'react'
import {
    Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableRow, TableHead,
    Paper, IconButton, Tooltip, TextField, Grid, Button
} from '@material-ui/core'
import Modal from 'react-modal'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../redux/action/Action';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { spacing } from '@material-ui/system';


const useStyles = makeStyles({

    stuListColor: {
        backgroundColor: "#00796b",
        color: "white"
    },
    tableHeadCell: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    },
})



const UserList = () => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [handleId, setHandleId] = useState();

     let [data, setData] = useState();
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchItem, setSearchItem] = useState("")


    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "",
        userType:[]
    });

    data = JSON.parse(localStorage.getItem('userdata'))
    // data is coming from local storage in data 

    // for search item from list 
    



    const reduxData = useSelector(state => state.userDetails.userDetail)
    const updateId = useSelector(state => state.userDetails.handleId)



    useEffect(() => {
        if (reduxData !== undefined) {
            setState({
                name: reduxData.name,
                email: reduxData.email,
                phone: reduxData.phone,
                userType:reduxData.userType
                
            })
        }
    }, [reduxData])




    const handleUpdate = (event) => {
        event.preventDefault();
        console.log("update data from handleUpdate", handleId);
        setEditModal(false)
        setState({
            name: state.name,
            email: state.email,
            phone: state.phone,
            userType:state.userType
        })
        console.log("this is updated data", state);
        const updatedData = JSON.parse(localStorage.getItem('userdata'))
        console.log("909090", updatedData);
        updatedData[handleId] = state;//updating detail on perticular index
        console.log("i am updating array", updatedData);
        localStorage.setItem('userdata', JSON.stringify(updatedData));
        toast.success('1 Row Updated-Successfully', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }


    const handleDeleteHandler = (e) => {
        e.preventDefault();
        let deleteData = JSON.parse(localStorage.getItem('userdata'));
        console.log('delete item', deleteData);
        if (deleteData.length === 1) {
            console.log('last data in the table');
            localStorage.removeItem('userdata');
            setHandleId('');
            setDeleteModal(false)
        }
        else {
            deleteData.splice(handleId, 1)
            localStorage.setItem('userdata', JSON.stringify(deleteData))
            setHandleId('')
            setDeleteModal(false);
        }
        toast.error('1 row data deleted', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }



    const editHandler = (e, id) => {
        e.preventDefault();
        console.log("i am edit", id)
        setEditModal(true);
        dispatch(editUser(id));
        setHandleId(id);
    }


    const deleteHandler = (e, id) => {
        e.preventDefault();
        setHandleId(id);
        console.log("delete handler Id", id);
        setDeleteModal(true)
    }

    return (
        <>
        {console.log("this is search",searchItem)}
            <Box textAlign="center" p={1} className={classes.stuListColor}>
                <Typography variant="h5">ALL USER LIST</Typography>
            </Box>

            <Box m={3} textAlign="center">
                <Link to='/'><Button type="submit" variant="contained" color="primary"
                   style={{ float: "left",marginTop:"8px"}}>Back to Home</Button></Link>

             <TextField 
              autoComplete="name" name="searchItem" variant="outlined" 
              id="name" label="Search name..." 
              type="text" style={{ float: "right" }}
              value={searchItem} 
              onChange={(e) => setSearchItem(e.target.value)} />
               
              {/* { 
                  data.map((data)=>{
                    return <h5>{data.name}</h5>
               })
              }    */}
              
            </Box>

            <Paper>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundcolor: "#00796b" }}>
                                <TableCell align="center" className={classes.tableHeadCell}>No.</TableCell>
                                <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                                <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                                <TableCell align="center" className={classes.tableHeadCell}>Phone</TableCell>
                                <TableCell align="center" className={classes.tableHeadCell}>User_Type</TableCell>
                                <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                data && data.length > 0 ? (
                                    data.filter((serach)=> {
                                        if(searchItem===""){
                                            return serach;
                                        }else if(serach.name.toLowerCase().includes(searchItem.toLowerCase())){
                                            return serach;
                                        }
                                    }).map((item, index) => {
                                        let id = index;
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{item.name}</TableCell>
                                                <TableCell align="center">{item.email}</TableCell>
                                                <TableCell align="center">{item.phone}</TableCell>
                                                <TableCell align="center">{item.userType.map((select)=> {
                                                    return (
                                                        <p>{select}</p>
                                                )
                                                })}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={(e) => editHandler(e, id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={(e) => deleteHandler(e, id)} >
                                                            <DeleteIcon color="secondary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            component="th"
                                            scope="row"
                                            align="center">
                                            No Record Found
                                        </TableCell>
                                    </TableRow>
                                )

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


            <Modal isOpen={editModal}
                disableBackdropClick
                style={{
                    overlay: {
                        position: 'fixed',
                        backgroundColor: 'rgba(0,0,0, 0.7)'
                    },
                    content: {
                        textAlign:'center',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '422px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        // overflow: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '20px'
                    }
                }} className="center">

                <Box textAlign="center" className={classes.addStuColor} p={1} mb={2}>
                    <Typography variant="h6">Edit User Detail</Typography>
                </Box>
                <Paper>
                    <form onSubmit={handleUpdate}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    value={state.name}
                                    onChange={(e) => setState({
                                        ...state,
                                        name: e.target.value
                                    })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    id="email"
                                    label="Email Address"
                                    value={state.email}
                                    onChange={(e) => setState({
                                        ...state,
                                        email: e.target.value
                                    })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="phone"
                                    name="phone"
                                    variant="outlined"
                                    id="phone"
                                    label="Phone Number"
                                    value={state.phone}
                                    onChange={(e) => setState({
                                        ...state,
                                        phone: e.target.value
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Box m={3} textAlign="center">

                            <Button type="submit" variant="outlined" style={{ color: "green" }}>Update</Button><span></span>
                            <Button type="button" variant="outlined" style={{ margin: "20px" }} onClick={() => setEditModal(false)} color="primary">Cancel</Button>

                        </Box>
                        <br></br>
                    </form>
                </Paper>
            </Modal>


            <Modal isOpen={deleteModal}
                disableBackdropClick
                style={{
                    overlay: {
                        position: 'fixed',
                        backgroundColor: 'rgba(0,0,0, 0.7)'
                    },
                    content: {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '535px',
                        height: '130px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        // overflow: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '20px'
                    }
                }} className="center"
            >
                <Typography variant="h6">Are you sure weather you want to delete Record or not?</Typography>
                <Box m={3} textAlign="center">
                    <Button type="button" variant="outlined" onClick={(e) => handleDeleteHandler(e)}
                        color="secondary">Delete</Button>

                    <Button type="button" variant="outlined" color="secondary" onClick={() => setDeleteModal(false)}
                        color="primary" style={{ margin: "20px" }}>Cancel</Button>
                </Box>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default UserList
