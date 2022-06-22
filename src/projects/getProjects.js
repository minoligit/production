import React from 'react';
import { List, Datagrid, SimpleForm, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
import { Edit, Create, TextInput } from 'react-admin';
import { CreateButton, ExportButton,FilterButton, FilterForm } from 'react-admin';
import { Stack } from '@mui/material';
import Notes from '@mui/icons-material/Notes';
import ProjectColumns from './columns';
import {getRole,ListPagination} from '../utils/common';
import '../App.css';
export const ProjectsIcon = Notes;
const permissions  = getRole();

export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={5}>
            <FilterForm filters={filterProjects} />
            <div>
                <FilterButton filters={filterProjects} />
                {(permissions === 'PM'||permissions === 'AIP') &&
                    <div style={{display:"inline"}}>
                        <CreateButton/>
                        <ExportButton/>
                    </div>
                }
            </div>
        </Stack>
    )
};
export const ProjectsList = () => {
    return(
        <List actions={<ListToolbar />} pagination={<ListPagination />}>
            <Datagrid rowClick="show">
                {ProjectColumns().map((data,key) => (
                    <TextField key={key} source={data.name} label={data.label}/>
                ))}
                {(permissions === 'PM'||permissions === 'AIP') &&
                    <div style={{display:"inline"}}>
                        <EditButton basePath="/getUsers" label=''/>
                        <DeleteWithConfirmButton label=""
                        confirmContent="You will not be able to recover this record. Are you sure?"/> 
                    </div>
                }   
            </Datagrid>
        </List>
    );
};
export const EditProjects = (props) => {
    return(
        <Edit {...props}>
            <SimpleForm warnWhenUnsavedChanges className="popmodal">
                {ProjectColumns().map((data,key) => (
                    <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                        disabled={data.edit_disabled} required={data.required}/>
                ))}
            </SimpleForm>
        </Edit>
    )
};
export const CreateProjects = () => (
    <Create title=''>
        <SimpleForm warnWhenUnsavedChanges className="popmodal">
            <h4>Add New Project</h4>
            {ProjectColumns().map((data,key) => (
                <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                    disabled={data.create_disabled} required={data.required}/>
            ))}
        </SimpleForm>
    </Create>
);
const filterProjects = [
    <TextInput label="Project Name" source="pro_name" defaultValue="" />,
    <TextInput label="SVR Alias" source="svr_alias" defaultValue="" />,
    <TextInput label="technology" source="tech_name" defaultValue="" />,
    <TextInput label="Status" source="status" defaultValue="" />
];