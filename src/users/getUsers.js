import React,{Fragment} from 'react';
import { List, Datagrid, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
import { Edit, Create, SimpleForm, TextInput,FilterButton,FilterForm  } from 'react-admin';
import { CreateButton,ExportButton,BulkUpdateButton,BulkDeleteWithConfirmButton } from 'react-admin';
import { Stack } from '@mui/material';
import User from '@mui/icons-material/People';
import { getRole,ListPagination} from '../utils/common';
import UserColumns from './columns';
import '../App.css';

export const UserIcon = User;
const permissions  = getRole();


export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={5}>
            <FilterForm filters={filterUsers} />
            <div>
                <FilterButton filters={filterUsers} />
                {(permissions === 'HRM'||permissions === 'AIP') &&
                    <div style={{display:"inline"}}>
                        <CreateButton/>
                    </div>
                }
                <ExportButton/>
            </div>
        </Stack>
    )
};
export const BulkUsers = ({...props}) => {
    return(
        <Fragment>
            <BulkUpdateButton name='editbulk' {...props}/>
            <BulkDeleteWithConfirmButton label="Delete" {...props}
                confirmContent="You will not be able to recover this record. Are you sure?"/>
        </Fragment>
    );
}
export const UsersList = ({...props}) => {
    return(
        <List actions={<ListToolbar />} {...props} pagination={<ListPagination />} bulkActionButtons={<BulkUsers />}>
            <Datagrid rowClick="show">
                {UserColumns().map((data,key) => (
                    <TextField key={key} source={data.name} label={data.label}/>
                ))}
                <EditButton label=''/>
                {(permissions === 'HRM'||permissions === 'AIP') &&
                    <div style={{display:"inline"}}>
                        <DeleteWithConfirmButton label=""
                        confirmContent="You will not be able to recover this record. Are you sure?"/>                     </div>
                }                 
            </Datagrid>
        </List>
    );
};
export const EditUsers = ({...props}) => {    
    return(
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm warnWhenUnsavedChanges className="popmodal">
                {UserColumns().map((data,key) => (
                    <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                        disabled={data.edit_disabled} required={data.required}/>
                ))}
            </SimpleForm>
        </Edit>
    )
};
export const CreateUsers = () => {

    return (
        <Create title=''>
            <SimpleForm warnWhenUnsavedChanges className="popmodal" >
                <h4>Add New User</h4>
                {UserColumns().map((data,key) => (
                    <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                        disabled={data.create_disabled} required={data.required}/>
                ))}
            </SimpleForm>
        </Create>
    )
};
export const EditBulk = ( {...props}) => {    
    return(
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm warnWhenUnsavedChanges className="popmodal">
                <TextInput source='id' label='User Id'/>
                {/* {UserColumns().map((data,key) => (
                    <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                        disabled={data.edit_disabled}/>
                ))} */}
            </SimpleForm>
        </Edit>
    )
};
const filterUsers = [
    // <TextInput label="Search" source="emp_no" alwaysOn />,
    <TextInput label="Role" source="role_alias" defaultValue=""/>,
    <TextInput label="State" source="state" defaultValue="" />,
];