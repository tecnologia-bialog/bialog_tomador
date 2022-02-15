import * as React from 'react';
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import get from "lodash/get";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

//
//https://github.com/jcoreio/material-ui-popup-state
//

const get_first_name = (name="")=>{
    try {
        return name.split(' ').slice(0, 1).join(' ');
    }catch (e) {
        //console.log("error-->",e)
        return name;

    }
}

const index = (props) => {

    const {currentUser,
        set_drawer,
        notifications}          = props;
    let name                    = get(currentUser, 'name', 'Leonardo da Silva Cunha');
    let first_name              = get_first_name(name);
    let image_profile           = get(currentUser, 'image_profile', '');
    let image_profile_exist     = get(currentUser, 'image_profile', false);

    return (
        <Grid container alignItems="center" spacing={1}>
            <Grid item xs={4} onClick={() => set_drawer(true)}>
                <Badge color={"secondary"}
                       anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                       }}
                       invisible={!Boolean(notifications > 0)}
                       overlap="circular"
                       style={{bottom:"29%"}}
                       badgeContent={notifications}>
                <Grid container justifyContent="center" spacing={2} style={{paddingTop:5}}>
                    {image_profile_exist &&
                        <Avatar style={{width: 45, height: 45}} src={image_profile}/>
                    }
                    {!image_profile_exist &&
                        <AccountCircle  style={{width:45,height:45}}/>
                    }
                </Grid>
                </Badge>
            </Grid>
            <Grid item xs={8}>
                <Typography component="p"
                            variant="caption"
                            align="left"
                            color="textPrimary">
                    {first_name}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default index
