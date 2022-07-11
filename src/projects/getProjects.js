import React from 'react';
import { List, Datagrid, Form, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
import { Edit, Create, TextInput } from 'react-admin';
import { CreateButton, ExportButton,FilterButton, FilterForm,SaveButton } from 'react-admin';
import { Stack,Grid } from '@mui/material';
import Notes from '@mui/icons-material/Notes';
import {ListPagination,RoleAccess} from '../utils/common';
import { ListStyle } from '../components/layout';
import '../App.css';
export const ProjectsIcon = Notes;

export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={2}>
            <FilterForm filters={filterProjects} />
            <div>
                {RoleAccess("projects","filter").length===0? null: <FilterButton filters={filterProjects}/>}
                {RoleAccess("projects","create").length===0? null: <CreateButton />}
                {RoleAccess("projects","export").length===0? null: <ExportButton />}
            </div>
        </Stack>
    )
};

export const ProjectsList = () => {
    return(
        <List actions={<ListToolbar />} pagination={<ListPagination />} style={{margin:'3%'}}>
            <Datagrid rowClick="show" sx={ListStyle}>
                {RoleAccess("projects","list").map((data,key) => (
                    <TextField key={key} source={data.field} label={data.title}/>
                ))}
                {RoleAccess("projects","edit").length===0? null: <EditButton label=''/>}
                {RoleAccess("projects","delete").length===0? null: <DeleteWithConfirmButton label=""
                    confirmContent="You will not be able to recover this record. Are you sure?"/>}  
            </Datagrid>
        </List>
    );
};

export const CreateProjects = () => (
    <Create title=''>
        <Form warnWhenUnsavedChanges className="popmodal">
            <h4>Add New Project</h4>
            <Grid container>
                <Grid item xs={12}>
                    {RoleAccess("projects","create").map((data,key) => (
                        <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                            required={data.required}/>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <SaveButton/>
                </Grid>
            </Grid>  
        </Form>
    </Create>
);

export const EditProjects = (props) => {
    return(
        <Edit {...props}>
            <Form warnWhenUnsavedChanges className="popmodal">
                <Grid container>
                    <Grid item xs={12}>
                    {RoleAccess("projects","edit").map((data,key) => (
                        <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                            required={data.required}/>
                    ))}
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton />
                    </Grid>
                </Grid>
            </Form>
        </Edit>
    )
};

const filterProjects = [
    <TextInput label="Project Name" source="pro_name" defaultValue="" />,
    <TextInput label="SVR Alias" source="svr_alias" defaultValue="" />,
    <TextInput label="technology" source="tech_name" defaultValue="" />,
    <TextInput label="Status" source="status" defaultValue="" />
];