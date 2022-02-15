import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import {
    usePopupState,
    bindTrigger,
    bindMenu, bindPopover,
} from 'material-ui-popup-state/hooks'

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
//
//https://github.com/jcoreio/material-ui-popup-state
//


const index = (props) => {

  const {set_signin} = props;

  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

  return (
    <div>
       <Button
          {...bindTrigger(popupState)}
          size="small"
          variant="contained"
          color="secondary">
          Cadastre-se
       </Button>
       <Popover {...bindPopover(popupState)} style={{marginTop:35}}>
          <Paper>
          <Menu {...bindMenu(popupState)} style={{marginTop:35}}>
              <Link href={"/new_project"}>
                 <MenuItem>
                    Criar Projeto
                 </MenuItem>
              </Link>
            <Divider/>
            <Divider/>
              <Link href={"/business"}>
                 <MenuItem>
                    Falar com um Freelancer agora
                 </MenuItem>
              </Link>
            <Divider/>
            <Divider/>
            <MenuItem onClick={()=>set_signin("SIGNIN","FREELA")}>
                    Trabalhar como Freelancer
            </MenuItem>
          </Menu>
          </Paper>
       </Popover>
    </div>
  )
}

export default index
