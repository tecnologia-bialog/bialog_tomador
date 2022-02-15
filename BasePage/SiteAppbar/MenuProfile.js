import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import React from "react";
import Divider from '@material-ui/core/Divider';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function index(props){

    const {authenticated,
           currentUser,
           set_global_page_action,
           user_type,
           logout,
           status,
           id,
           anchorEl,
           open,
           onClose} = props;


    return (
        <React.Fragment>
        {!authenticated &&
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={id}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={onClose}>
            <div style={{padding:5}}>
                <Link href={"#"} onClick={()=>set_global_page_action("LOGIN")}>
                    <MenuItem>
                        Entrar
                    </MenuItem>
                </Link>
            <div style={{padding:5}}>
                <Link href={"#"} onClick={()=>set_global_page_action("SIGNIN")}>
                    <MenuItem>
                        Criar Conta
                    </MenuItem>
                </Link>
            </div>
            </div>
        </Menu>
        }
        {authenticated &&
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={id}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={onClose}>
          {user_type === 'FREELA' &&
            <div>
                <Typography noWrap
                             align="center"
                             style={{fontSize:8}}
                             component="p">
                 status do perfil
                </Typography>
                <Typography noWrap
                            align="center"
                            style={{fontSize: 10, color: status.color}}
                            component="p">
                    {status.label}
                </Typography>
                 <Divider/>
            </div>
            }
            <Link href={"#"} onClick={()=>set_global_page_action("DASHBOARD")}>
                <MenuItem>
                    Dashboard
                </MenuItem>
            </Link>
             <Link href={"#"} onClick={()=>set_global_page_action("PROFILE")}>
                <MenuItem>
                    Perfil
                </MenuItem>
            </Link>
            <Link href={"#"} onClick={()=>set_global_page_action("ACCOUNT")}>
                <MenuItem>
                    Sua Conta
                </MenuItem>
            </Link>
            <div>
            <Divider/>
            <MenuItem onClick={() => logout()}>
                Sair
            </MenuItem>
            </div>
        </Menu>
        }
        </React.Fragment>
    )
}
