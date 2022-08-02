import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { List, Datagrid, NumberField,DateField, TextField, ReferenceManyField } from 'react-admin';
import { Show, TabbedShowLayout, Tab } from 'react-admin';
import { EditButton,Button } from 'react-admin';
import { RoleAccess} from '../utils/common';

export const ShowServer = ({...props}) => {
    const navigate = useNavigate();

    return(
        <Show {...props}>
            <TabbedShowLayout className='showForm'>
                <Tab label="General" basepath="/">
                    {RoleAccess("servers","list").map((data,key) => (
                        <TextField key={key} source={data.field} label={data.title} disabled={data.edit_disabled}
                            className="formLine"/>
                    ))}
                </Tab>
                <Tab label="Projects" path="projects">
                    <ReferenceManyField label="" source="id" reference="projects" target='id'>
                        <List filterDefaultValues={{role_id:"target"}}>
                            <Datagrid>
                                {RoleAccess("projects","list").map((data,key) => (
                                    <TextField key={key} source={data.field} label={data.title}/>
                                ))}
                            </Datagrid>
                        </List>
                    </ReferenceManyField>               
                </Tab>
                <Button label='X' className='closeBtn' onClick={() => navigate("/servers")}/><br/>
            </TabbedShowLayout>
        </Show>
    )
};