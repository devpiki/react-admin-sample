import Logo from './images/logo.svg';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Drawer,
    IconButton,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Close as CloseIcon, Menu as MenuIcon} from '@material-ui/icons';
import LeftMenu from "./LeftMenu";
import {List1, Home, NoMatchError} from "./pages";
import LogoutButton from './style/LogoutButton';
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        flexGrow: 1,
    },
    title: {
        margin: '0 0 2px 0',
        color: '#4f5964'
    },
    displayName: {
        margin: '0 10px 0 10px',
        fontWeight: 'bold',
    },
    displayId: {
        marginRight: '10px'
    }
}))

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const [tabList, setTabList] = React.useState([{
        key: 'home',
        name: 'Home',
        obj: getCom('home')
    }]);
    const [value, setValue] = React.useState(0);

    function getCom(_key) {
        const components = {
            list1: List1,
            home: Home,
            404: NoMatchError
        };
        const SpecificCom = components[_key] || components[404];
        return <SpecificCom/>;
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    const clickMenu = (e, key, name) => {
        let lst = [...tabList];
        let _stat = true;
        let _key_cnt = lst.length;
        for (let i = 0; i < lst.length; i++) {
            if (lst[i].key === key) {
                _stat = false;
                _key_cnt = i;
            }
        }
        if (_stat) {
            lst.push({
                key: key,
                name: name,
                obj: getCom(key)
            });
        }
        setTabList(lst);
        handleChange(null, _key_cnt);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const doLogout = (e) => {
        alert("로그아웃 되었습니다.");
    };

    const closeTab = (idx) => (e) => {
        let lst = [...tabList];
        let val = value;
        lst.splice(idx, 1);
        setTabList(lst);

        if (val < idx) {

        } else if (val > idx) {
            val = val - 1;
            handleChange(null, val);
        } else {
            handleChange(null, 0);
        }
        e.stopPropagation();
    };

    React.useEffect(() => {
        const aa = document.getElementById('logo');
        aa.src = Logo;
    }, []);


    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Left</Button>
            <Drawer open={state} onClose={toggleDrawer(false)}>
                <div
                    style={{width: '250px'}}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                    <LeftMenu clickMenu={clickMenu}/>
                </div>
            </Drawer>
            <CssBaseline/>
            <AppBar position="absolute" color="inherit">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={toggleDrawer(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.logo}>
                        <img id="logo" style={{marginTop: '7px', height : '40px'}}/>
                    </Typography>
                    <LogoutButton variant="contained" color="inherit" onClick={doLogout}>LOGOUT</LogoutButton>
                    <span id="displayName" className={classes.displayName}></span>
                    <span id="displayId" className={classes.displayId}></span>
                    <h2 className={classes.title}>Admin Page</h2>
                </Toolbar>
                <Tabs value={value} onChange={handleChange} variant="scrollable"
                      scrollButtons="auto" indicatorColor="primary"
                      style={{height: '44px', minHeight: '44px', backgroundColor: '#4f5964', color: '#fff'}}>
                    {tabList.map((item, idx) => (
                        <Tab key={item.key}
                             label={<div style={{width: '100%'}}>{item.name}
                                 {
                                     (idx > 0) ? (<div style={{float: 'right'}} onClick={closeTab(idx)}>
                                         <CloseIcon style={{fontSize: '10px', verticalAlign: 'middle'}}/></div>) : ''
                                 }
                             </div>}
                             {...a11yProps(item.key)}/>
                    ))}
                </Tabs>
            </AppBar>
            <Container style={{marginTop: '90px', marginBottom: '30px'}}>
                <Box my={2}>
                    {
                        tabList.map((item, idx) => (
                            <div key={item.key}
                                 role="tabpanel"
                                 hidden={value !== idx}
                                 id={`simple-tabpanel-${item.key}`}
                                 aria-labelledby={`simple-tab-${item.key}`}
                                 value={idx}>
                                {item.obj}
                            </div>
                        ))
                    }
                </Box>
            </Container>
            <Footer/>
        </div>
    );
}

export default App;
