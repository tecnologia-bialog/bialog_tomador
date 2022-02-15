import React, { useState, useEffect, useRef } from "react";
import Drawer from '@material-ui/core/Drawer';
import NoSsr from '@material-ui/core/NoSsr';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import get from 'lodash/get';


export default function index(props) {


    const [title,setTitle]  = React.useState("Perfil do Freelancer");

    const {
        LeftContent,
        setLeftOpen,
        LeftPage,
        leftOpen,
        currentUser,
        constants,
        update_projects_action,
        update_proposal_action,
        get_projects_action,
        current_project,
        loading_project,
        screenSize,
        ShowPage,
        is_mobil,
        config
    } = props;


    const onBackButtonEvent = (e) => {
                e.preventDefault();
                try{
                      setLeftOpen(false);
                }catch (e) {
                     console.log("onBackButtonEvent error-->",e);
                }
    }
    //console.log("current_project-->",current_project)

    useEffect(() => {
            window.addEventListener('popstate', onBackButtonEvent);
            return () => {window.removeEventListener('popstate', onBackButtonEvent);}
    }, []);

    useEffect(() => {

        if(LeftPage === "CHAT"){
            setTitle("Mensagens")
        }


    }, [LeftPage]);

    let width = get(screenSize,"width",800);
    let width_ = is_mobil?width:width*0.7;

    return (
        <NoSsr>
        <Drawer anchor="left"
                variant="temporary"
                style={{width:"100%"}}
                escapeKeyDown={()=>setLeftOpen(false)}
                backdropclick={()=>setLeftOpen(false)}
                open={leftOpen}
               >
               <div style={{ backgroundColor:'#fafafa',width:width_}}>
                        <AppBar position="static" style={{backgroundColor:"#fafafa",width:"100%"}}>
                                    <Toolbar style={{minHeight:30}}>
                                        <Typography variant="h6" color="primary" style={{ flexGrow: 1}}>
                                            {title}
                                        </Typography>
                                        <IconButton
                                                    color="primary"
                                                    style={{right:0}}
                                                    aria-label="open drawer"
                                                    edge="end"
                                                    onClick={()=>ShowPage("DASHBOARD",{})}>
                                                    <CloseIcon />
                                        </IconButton>
                                    </Toolbar>
                          </AppBar>

              </div>
     </Drawer>
    </NoSsr>
    )

}
