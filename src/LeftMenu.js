import React from 'react';
import {
    AccessTime as AccessTimeIcon,
    Build as BuildIcon,
    Code as CodeIcon,
    Comment as CommentIcon,
    Computer as ComputerIcon,
    EmojiTransportation as EmojiTransportationIcon,
    Group as GroupIcon,
    Home as HomeIcon,
    LocationOn as LocationOnIcon,
    People as PeopleIcon
} from "@material-ui/icons";

import {Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

export default function LeftMenu(props){
    const menu_lst = [
        {
            name : 'home',
            key : 'home',
            icon : <HomeIcon/>
        },{
            name : '기본리스트',
            key : 'list1',
            icon : <GroupIcon/>
        },{
            name : '데이터수정',
            key : 'list2',
            icon : <BuildIcon/>
        },{
            name : '메뉴3',
            key : 'menu3',
            icon : <AccessTimeIcon/>
        },{
            name : '메뉴4',
            key : 'menu4',
            icon : <CommentIcon/>
        },{
            name : '메뉴5',
            key : 'menu5',
            icon : <LocationOnIcon/>
        },{
            name : '메뉴6',
            key : 'menu6',
            icon : <ComputerIcon/>
        }
    ];

    /*React.useEffect(()=>{
        return ()=>{
        };
    }, []);*/
    const handleListItemClick = (e, key, name)=>{
        props.clickMenu(e, key, name);
    };

    return (
        <List>
            {
                menu_lst.map((item)=>(
                    <ListItem button key={item.key} onClick={(event) => handleListItemClick(event, item.key, item.name)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))
            }
        </List>
    );
}

