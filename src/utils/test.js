// import React,{ useState,useEffect} from 'react';
// import { List, Datagrid, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
// import { Edit, Create, TextInput,FilterButton,FilterForm  } from 'react-admin';
// import { CreateButton,ExportButton,BulkDeleteWithConfirmButton,Button,Form,SaveButton } from 'react-admin';
// import { Stack,Grid } from '@mui/material';
// import MaterialTable from '@material-table/core';
// import { Modal } from 'react-bootstrap';
// import Axios from 'axios';
// import User from '@mui/icons-material/People';
// import { ListPagination,RoleAccess,getRole} from '../utils/common';
// import { ListStyle } from '../components/layout';
// import '../App.css';


// export const UserIcon = User;

// export const ListToolbar = () => {
//     return(
//         <Stack direction="row" justifyContent="space-between" marginTop={2}>
//             <FilterForm filters={filterUsers} />
//             <div>
//                 {RoleAccess("users","filter").length===0? null: <FilterButton filters={filterUsers}/>}
//                 {RoleAccess("users","create").length===0? null: <CreateButton />}
//                 {RoleAccess("users","export").length===0? null: <ExportButton />}
//             </div>
//         </Stack>
//     )
// };

// export const UsersList = ({...props}) => {

//     const [modal, setModal] = useState(false);
//     const [form, setForm] = useState(false);

//     const [ids, setIds] = useState([]);
//     const handleClose = () => { setModal(false);
//                                 localStorage.removeItem('RaStore.users.selectedIds');
//                                 localStorage.removeItem("open");
//                                 window.location.reload(false);
//                             }
//     const handleShow = () => {  setModal(true);
//                                 openModal();
//                             }
//     const [columnList, setColumnList] = useState([]);
//     const [dataList, setDataList] = useState([]);

//     useEffect(() =>{
//     }, []);

//     function BulkToolbar () {
//         return(
//             <div>
//                 {RoleAccess("users","edit").length===0? null: <Button label='Update' {...props}
//                     onClickCapture={openForm} />}
//                 {RoleAccess("users","edit").length===0? null: <Button label='Cell Update' {...props}
//                     onClickCapture={handleShow} />}
//                 {RoleAccess("users","delete").length===0? null: <BulkDeleteWithConfirmButton label="Delete" {...props}
//                     confirmContent="You will not be able to recover the records. Are you sure?"/>}
//             </div>
//         )
//     }
//     function openForm() {
//         setForm(true);
//     }
//     function openModal(){
//         localStorage.setItem("open", true);
//         setIds(JSON.parse(localStorage.getItem('RaStore.users.selectedIds')));
//         {Axios.get(`http://localhost:8080/getEditColumns/${getRole()}/${'users'}`).then((res) => {
//             setColumnList(res.data);
//         });}
//         {Axios.get(`http://localhost:8080/getEditUsers/${getRole()}/${'edit'}/${localStorage.getItem('RaStore.users.selectedIds')}`).then((res) => {
//             setDataList(res.data);
//         });}
//     }
//     function updateCell(id,column,value){
//         Axios.put(`http://localhost:8080/updateCell/${id}/${column}/${value}`).then((res) => {
//             alert("Updated Successfully");         
//         });
//     }

//     return(
//         <div>
//             <List actions={<ListToolbar />} {...props} pagination={<ListPagination />} bulkActionButtons={<BulkToolbar/>} 
//                 style={{margin:'3%'}} aside={form ? <EditBulk/> : null}>
//                 <Datagrid rowClick="show" sx={ListStyle}>
//                     {RoleAccess("users","list").map((data,key) => (
//                         <TextField key={key} source={data.field} label={data.title}/>
//                     ))}
//                     {RoleAccess("users","edit").length===0? null: <EditButton label=''/>}
//                     {RoleAccess("users","delete").length===0? null: <DeleteWithConfirmButton label=""
//                         confirmContent="You will not be able to recover this record. Are you sure?"/>}
//                 </Datagrid>
//             </List>
//             <Modal show={modal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                 <Modal.Title>Edit Users</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                     <MaterialTable
//                         title=''
//                         columns={columnList}
//                         data={dataList}
//                         options={{
//                             tableLayout:"fixed",columnResizable:true,columnsButton:true, search:false,
//                             sorting: true
//                         }}
//                         cellEditable={{
//                             onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
//                               return new Promise((resolve, reject) => {
//                                 // console.log("b",dataList);
//                                 updateCell(rowData.user_id,columnDef.field,newValue);
//                                 dataList[dataList.findIndex(row => row.user_id === rowData.user_id)][columnDef.field] = newValue;
//                                 // setDataList(dataList); 
//                                 console.log("a",dataList);   
//                                 setTimeout(resolve, null);        
//                                 // console.log("ff ", JSON.stringify(dataList));
//                                 // console.log("gg "+dataList.findIndex(row => row.ldap_id === rowData.ldap_id))
//                                 // dataList[dataList.findIndex(row => row.ldap_id === rowData.ldap_id)].user_id = newValue;
//                                 // console.log("ff ", JSON.stringify(dataList));
//                               });
//                             }
//                         }}
//                     />
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// };

// export const CreateUsers = () => {

//     return (
//         <Create title=''>
//             <Form warnWhenUnsavedChanges className="popmodal" >
//                 <h4>Add New User</h4>
//                 <Grid container>
//                     <Grid item xs={12}>
//                     {RoleAccess("users","create").map((data,key) => (
//                         <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
//                             required={data.required}/>
//                     ))}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <SaveButton />
//                     </Grid>
//                 </Grid>
//             </Form>
//         </Create>
//     )
// };

// export const EditUsers = ({...props}) => {
//     return(
//         <Edit {...props} mutationMode="pessimistic" aside={<Aside />}>
//             <Form warnWhenUnsavedChanges className="popmodal">
//                 <Grid container>
//                     <Grid item xs={12}>
//                     {RoleAccess("users","edit").map((data,key) => (
//                         <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
//                             required={data.required}/>
//                     ))}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <SaveButton />
//                     </Grid>
//                 </Grid>
//             </Form>
//         </Edit>
//     )
// };

// export const EditBulk = ({...props}) => {
//     let [dataList, setDataList] = useState([]);

//     function setArray(key,value){
//         let newArr = [...dataList];
//         newArr[key] = value;
//         dataList = newArr;
//     }
//     function updateAll(){
//         const ids = localStorage.getItem('RaStore.users.selectedIds');
//         {Axios.put(`http://localhost:8080/editUsers/${getRole()}/${ids}`,dataList).then((res) => {
//             alert("User Updated.");
//             localStorage.removeItem('RaStore.users.selectedIds');
//             window.location.reload(false);
//          }).catch(error => {
//             alert(error);
//         }); ;
//         }
//     }

//     return(
//         <div className="asideForm-small">
//             <Form warnWhenUnsavedChanges className="popmodal">
//                 <Grid container>
//                     <Grid item xs={12}>
//                     {RoleAccess("users","edit").map((data,key) => (
//                         <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
//                             onChange={(e)=>{setArray(key,e.target.value)}}/>
//                     ))}
//                     </Grid>
//                     <Grid item xs={12}>
//                         <SaveButton onClick={updateAll}/>
//                     </Grid>
//                 </Grid>
//             </Form>
//         </div>
//     )
// };

// export const Aside = () => { 
//     return(
//         <div className='asideForm-large'>
//             <UsersList/>
//         </div>
//     )
// };

// const filterUsers = [
//     <TextInput label="Role" source="role_alias" defaultValue=""/>,
//     <TextInput label="State" source="state" defaultValue="" />,
// ];
