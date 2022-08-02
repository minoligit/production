import React,{useState,useEffect} from "react";
import { List, SimpleList,TextInput,FilterButton,FilterForm,ExportButton } from 'react-admin';
import { Show,SimpleShowLayout,TextField,RichTextField } from 'react-admin';
import { Stack,Badge } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import Axios from 'axios';
import * as FiIcons from "react-icons/fi";
import '../App.css';
import './ntf.css';
import { getToken } from "../utils/common";

export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={2}>
            <FilterForm filters={filterNotifications} />
            <div>
                <FilterButton filters={filterNotifications}/>
                <ExportButton />
            </div>
        </Stack>
    )
};

export const Icon = () => {

    const [count, setCount] = useState();

    useEffect(() =>{
        Axios.get(`http://localhost:8080/getUnreadCount/${getToken()}`).then((res) => {
            setCount(res.data[0].count);
        });
    }, []);

    return(
        <Badge badgeContent={count} color="warning">
            <FiIcons.FiBell color="action" />
        </Badge>
    )
}

export const Notifications = ({...props}) => {

    // const [show, setShow] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() =>{
    }, []);

    function archieveNtf(ntfId){
        // console.log(ntfId);
    }
    function changeStatus(ntfId,newStatus){
        // console.log(ntfId,newStatus);
    }
    function deleteNtf(ntfId){
        // console.log(ntfId);
    }

    return(
        <div>
            <List style={{margin:'3%'}} resource="notifications" actions={<ListToolbar />}
                filterDefaultValues={{emp_no: getToken()}} /*aside={show?<ShowNotifications/>:null}*/>
                <SimpleList
                    leftIcon={record => record.status === 0 ? <FiIcons.FiBell className="ntfBtn-unread"/> : 
                                                            <FiIcons.FiMessageSquare className="ntfBtn-read"/>}
                    // rightIcon={record => 
                    //             <div>
                    //                 <FiIcons.FiMoreVertical type="button" className="dropdown-toggle moreBtn" data-bs-toggle="dropdown"/>
                    //                 <div className="dropdown-menu">
                    //                     <div>{record.archieve === 0 ? 'Archieve' : null}</div>
                    //                     <div>Delete</div>
                    //                 </div>
                    //             </div>
                    //     }

                    rightIcon={record=> 
                        <Dropdown
                            // onMouseLeave={() => setShowDropdown(false)}
                            // onMouseOver={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            onMouseOver={() => setShowDropdown(true)}
                            style={{ backgroundColor: 'transparent' }}
                            >
                            <Dropdown
                                // style={{backgroundColor:"transparent",border:"none",color:"#585858"}}
                                id="dropdown-basic"
                            >
                                <FiIcons.FiMoreVertical className="moreBtn"/>
                            </Dropdown>
                            <Dropdown.Menu show={showDropdown}>
                                <Dropdown.Item>
                                    <button className="moreListBtn" onClickCapture={archieveNtf(record.id)}>Archieve</button>
                                </Dropdown.Item>
                                <Dropdown.Item>{record.status===0?
                                    <button className="moreListBtn" onClickCapture={changeStatus(record.id,1)}>Mark as read</button>:
                                    <button className="moreListBtn" onClickCapture={changeStatus(record.id,0)}>Mark as unread</button>
                                        } 
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <button className="moreListBtn" onClickCapture={deleteNtf(record.id)}>Delete</button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    primaryText={record => record.title}
                    secondaryText={record => <div className="content">{record.content}</div>}
                    tertiaryText={record => new Date(record.dateTime).toLocaleString()}
                    rowStyle={record => (
                        { color: record.status === 0 ? 'black' : '#585858' }
                    )}
                    linkType="show"
                />
            </List>
        </div>
    );
}

export const ShowNotifications = ({...props}) => {
    return(
        <Show {...props}>
            <SimpleShowLayout>
                <TextField label="Title" source="title" /><br/>
                <RichTextField label="Content" source="content" /><br/>
                <TextField label="Date" source="dateTime" />
            </SimpleShowLayout>
        </Show>
    )
};

const filterNotifications = [
    <TextInput label="Title" source="title" defaultValue=""/>,
    <TextInput label="Date Time" source="dateTime" defaultValue="" />,
];
