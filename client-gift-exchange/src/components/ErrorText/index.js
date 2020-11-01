import React from 'react';
import { Alert, AlertTitle } from "@material-ui/lab";

const ErrorText = (props) => {
    return (
        <div style={{
            position: "relative",
            width: "90%",
            height: "auto",
            margin: "0 auto",
            paddingTop: "10px"
        }}>
            <Alert severity="error">
                <AlertTitle>{props.text}</AlertTitle>
            </Alert>
        </div>
    )
}

export default ErrorText;