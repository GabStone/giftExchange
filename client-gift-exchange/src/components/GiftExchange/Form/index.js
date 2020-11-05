import React, {useState} from 'react';
import {
    Box, Button,
    Card, CardContent, CardHeader,
    Container, Divider,
    Grid, makeStyles
} from '@material-ui/core';
import Recipient from "../Recipient";
import axios from 'axios';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { v4 as uuidv4 } from 'uuid';
import SnackbarComponent from "../../Snackbar";
import ErrorText from "../../ErrorText";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Account = () => {
    const classes = useStyles();
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({
        error: false,
        text: ''
    });
    const [snackbarData, setSnackbarData] = React.useState({
        open: false,
        text: '',
        result: '',
    });
    const [data, setData] = useState({
        recipients: [
            {
                id: 1,
                name: '',
                email: ''
            },
            {
                id: 2,
                name: '',
                email: ''
            },
            {
                id: 3,
                name: '',
                email: ''
            },
            {
                id: 4,
                name: '',
                email: ''
            }
        ]
    });

    const addRecipient = () => {
        setError({...error, error:false});
        setData({
            recipients: [...data.recipients, {id: uuidv4(), name: '', email: ''}]
        });
    }

    const handleChange = (id, event) => {
        setError({...error, error:false});
        setData({
            recipients: data.recipients.map((recipient) => {
                if (recipient.id === id) {
                    recipient[event.target.name] = event.target.value;
                }
                return recipient;
            })
        });
    }

    const sendEmail = () => {
        setError({...error, error:false});

        // Validation
        if (data.recipients.length < 4) {
            setError({error: true, errorText: 'Error - Minimum 4 participants are needed for a secret gift exchange'});
            return;
        }

        for (let i = 0; i < data.recipients.length; i++) {
            if (data.recipients[i].name === '' || data.recipients[i].email === '') {
                setError({error: true, errorText: 'Error - Recipient information missing'});
                return;
            } else if (!emailRegexp.test(data.recipients[i].email)) {
                setError({error: true, errorText: 'Error - Email invalid for recipient ' + data.recipients[i].name});
                return;
            }
        }

        setLoading(true);
        axios.post('/api/exchange', data.recipients).then((res) => {
            setLoading(false);
            if (res.data.status === 0 && res.data.result === 'Success') {
                setSnackbarData({open: true, result: 'success', text: 'Success! All participants should receive an email in the next few minutes'});
                setData({
                    recipients: [
                        {
                            id: 1,
                            name: '',
                            email: ''
                        },
                        {
                            id: 2,
                            name: '',
                            email: ''
                        },
                        {
                            id: 3,
                            name: '',
                            email: ''
                        },
                        {
                            id: 4,
                            name: '',
                            email: ''
                        }
                    ]
                });
            } else {
                setSnackbarData({open: true, result: 'error', text: 'Error! Please try again later'});
            }
        });
    }

    const removeRecipient = (id) => {
        let recipients = data.recipients;
        for (let i = 0; i < recipients.length; i++) {
            if (recipients[i].id === id) {
                // Remove Recipient
                recipients.splice(i, 1);
            }
        }
        setData({recipients: recipients});
    }

    const closeSnackbar = () => {
        setSnackbarData({...snackbarData, open: false});
    }

    return (
        <div className={classes.root}
             title="gift-exchange-form">
            <SnackbarComponent
                handleClose={closeSnackbar}
                open={snackbarData.open}
                result={snackbarData.result}
                snackbarText={snackbarData.text}
            />
            <Container maxWidth="lg">

                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                <form autoComplete="off"
                      noValidate>
                    <Card>
                        <CardHeader subheader="Enter recipient name and email address"
                                    title="Recipients" />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}>
                                {data.recipients.map((recipient) => (
                                    <Recipient key={recipient.id} data={recipient} handleChange={handleChange} removeRecipient={removeRecipient}/>
                                ))}
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            p={2} >
                            <Button
                                color="secondary"
                                onClick={addRecipient}>
                                Add recipient
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={sendEmail}>
                                Send Email
                            </Button>
                        </Box>
                    </Card>

                    {error.error && (
                        <ErrorText text={error.errorText}/>
                    )}
                </form>
            </Container>
        </div>
    );
};

export default Account;
