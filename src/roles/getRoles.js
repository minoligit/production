import React,{ useState } from 'react';
import {useNavigate} from "react-router-dom";
import { List, Datagrid, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
import { Edit, Create, TextInput,FilterButton,FilterForm  } from 'react-admin';
import { CreateButton,ExportButton,BulkDeleteWithConfirmButton,Button,Form,SaveButton } from 'react-admin';
import { Stack,Grid } from '@mui/material';
import MaterialTable from '@material-table/core';
import { CloseButton, Modal } from 'react-bootstrap';
import Axios from 'axios';
import User from '@mui/icons-material/People';
import { ListPagination,RoleAccess,getRole } from '../utils/common';
import { ListStyle } from '../components/layout';
import '../App.css';            
import { dataContext } from '../utils/dataprovider';

export const RoleIcon = User;

export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={2}>
            <FilterForm filters={filterRoles} />
            <div>
                {RoleAccess("roles","filter").length===0? null: <FilterButton filters={filterRoles}/>}
                {RoleAccess("roles","create").length===0? null: <CreateButton />}
                {RoleAccess("roles","export").length===0? null: <ExportButton />}
            </div>
        </Stack>
    )
};

export const RolesList = ({...props}) => {

    let [modal, setModal] = useState(false);
    const [form, setForm] = useState(false);

    const [ids, setIds] = useState([]);
    const handleClose = () => { setModal(false);
                                localStorage.removeItem('RaStore.roles.selectedIds');
                                localStorage.removeItem("open");
                                window.location.reload(false);
                            }
    const handleShow = () => {  openModal();
                                setModal(true);
                            }
    const [columnList, setColumnList] = useState([]);
    let [dataList, setDataList] = useState([]);

    function BulkToolbar () {
        return(
            <div>
                {RoleAccess("roles","edit").length===0? null: <Button label='Bulk Update' {...props}
                    onClickCapture={openForm} />}
                {RoleAccess("roles","edit").length===0? null: <Button label='Cell Update' {...props}
                    onClickCapture={handleShow} />}
                {RoleAccess("roles","delete").length===0? null: <BulkDeleteWithConfirmButton label="Delete" {...props}
                    confirmContent="You will not be able to recover the records. Are you sure?"/>}
            </div>
        )
    }
    function openForm() {
        setForm(true);
    }
    function openModal(){
        localStorage.setItem("open", true);
        setIds(JSON.parse(localStorage.getItem('RaStore.roles.selectedIds')));
        Axios.get(`http://localhost:8080/getAccess/${getRole()}/roles/list`).then((res) => {
            setColumnList(res.data);
        });
        setDataList(dataContext.Provider.filter(
            element => (JSON.parse(localStorage.getItem('RaStore.roles.selectedIds'))).includes(element.id)));       
    }
    function updateCell(id,column,value,row){
        Axios.put(`http://localhost:8080/updateCell/${id}/${column}/${value}`).then((res) => {
            if(!res.data){
                alert(`User ${id} ${column} updated to ${value} successfully`); 
                row[column] = value;
                // dataContext.Provider[dataContext.Provider.findIndex(row => row.id === id)][column]=value;  
                // setDataList(dataContext.Provider.filter(
                //     element => (JSON.parse(localStorage.getItem('RaStore.roles.selectedIds'))).includes(element.id)));             
            }
        });
    }


    return(
        <div>
            <List actions={<ListToolbar />} {...props} pagination={<ListPagination />} bulkActionButtons={<BulkToolbar/>} 
                style={{margin:'3%'}} aside={form ? <EditBulk/> : null}>
                <Datagrid rowClick="show" sx={ListStyle}>
                    {RoleAccess("roles","list").map((data,key) => (
                        <TextField key={key} source={data.field} label={data.title}/>
                    ))}
                    {RoleAccess("roles","edit").length===0? null: <EditButton label=''/>}
                    {RoleAccess("roles","delete").length===0? null: <DeleteWithConfirmButton label=""
                        confirmContent="You will not be able to recover this record. Are you sure?"/>}
                </Datagrid>
            </List>
            <Modal show={modal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Roles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <MaterialTable
                        title=''
                        columns={columnList}
                        data={dataList}
                        options={{
                            tableLayout:"fixed",columnResizable:true,columnsButton:true, search:false,
                            sorting: true
                        }}
                        cellEditable={{
                            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                              return new Promise((resolve, reject) => {
                                updateCell(rowData.id,columnDef.field,newValue,rowData);
                                setTimeout(resolve, null);        
                                // console.log("ff ", JSON.stringify(dataList));
                                // console.log("gg "+dataList.findIndex(row => row.ldap_id === rowData.ldap_id))
                                // dataList[dataList.findIndex(row => row.ldap_id === rowData.ldap_id)].user_id = newValue;
                                // console.log("ff ", JSON.stringify(dataList));
                              });
                            }
                        }}
                    />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export const CreateRoles = () => {
    const navigate = useNavigate();

    return (
        <Create title=''>
            <Form warnWhenUnsavedChanges className="popmodal" >
                <h4>Add New Role</h4>
                <Grid container>
                    <Grid item xs={12}>
                    {RoleAccess("roles","create").map((data,key) => (
                        <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                            required={data.required}/>
                    ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button label='<< Back' className='formBtn' onClick={() => navigate(-1)}/>                        
                        <SaveButton />
                    </Grid>
                </Grid>
            </Form>
        </Create>
    )
};

export const EditRoles= ({...props}) => {
    const navigate = useNavigate();

    return(
        <Edit {...props} mutationMode="pessimistic" aside={<Aside />}>
            <Form warnWhenUnsavedChanges className="popmodal">
                <Grid container>
                    <Grid item xs={12}>
                    {RoleAccess("roles","edit").map((data,key) => (
                        <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                            disabled={data.editDisabled} required={data.required}/>
                    ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button label='<< Back' className='formBtn' onClick={() => navigate(-1)}/>
                        <SaveButton />
                    </Grid>
                </Grid>
            </Form>
        </Edit>
    )
};

export const EditBulk = ({...props}) => {
    let [dataList, setDataList] = useState([]);

    function setArray(key,value){
        let newArr = [...dataList];
        newArr[key] = value;
        dataList = newArr;
    }
    function updateAll(){
        const ids = localStorage.getItem('RaStore.roles.selectedIds');
        {Axios.put(`http://localhost:8080/editRoles/${getRole()}/${ids}`,dataList).then((res) => {
            alert("Role Updated.");
            localStorage.removeItem('RaStore.roles.selectedIds');
            window.location.reload(false);
         }).catch(error => {
            alert(error);
        }); ;
        }
    }
    function closeForm(){
        document.getElementById('form1').style.display="none";
    }
    
    return(
        <div className="asideForm-small" id='form1'>
            <Form warnWhenUnsavedChanges className="popmodal">
                <CloseButton onClick={closeForm} classname="closeBtn"/>
                <Grid container>
                    <Grid item xs={12}>
                    {RoleAccess("roles","edit").map((data,key) => (
                        <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                            disabled={data.editDisabled} onChange={(e)=>{setArray(key,e.target.value)}}/>
                    ))}
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton onClick={updateAll}/>
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
};

export const Aside = () => { 
    return(
        <div className='asideForm-large'>
            <RolesList/>
        </div>
    )
};

const filterRoles = [
    <TextInput label="Role Alias" source="role_alias" defaultValue=""/>,
    <TextInput label="Role Name" source="role_name" defaultValue="" />,
    <TextInput label="Is Parent" source="is_parent" defaultValue="" />,
];
