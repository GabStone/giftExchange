import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const Recipient = (props) => {

    return (
        <React.Fragment>
            <Grid item lg={2} md={12} sm={12} xs={12}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    onClick={() => props.removeRecipient(props.data.id)}>
                    <CloseIcon />
                </IconButton>
            </Grid>
            <Grid item lg={5} md={6} sm={12} xs={12}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    required
                    value={props.data.name}
                    onChange={(e) => props.handleChange(props.data.id, e)}
                    variant="outlined"
                />
            </Grid>
            <Grid item lg={5} md={6} sm={12} xs={12}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    required
                    value={props.data.email}
                    onChange={(e) => props.handleChange(props.data.id, e)}
                    variant="outlined"
                />
            </Grid>
        </React.Fragment>
    )
}

export default Recipient;