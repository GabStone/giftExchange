import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import { amber, green } from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
    warning: WarningIcon,
};

const useStyles1 = makeStyles((theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon />
                    {message}
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const SnackbarComponent = (props) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: props.vertical,
                    horizontal: props.horizontal,
                }}
                open={props.open}
                autoHideDuration={6000}
                onClose={props.handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={props.handleClose}
                    variant={props.result}
                    message={props.snackbarText}
                />
            </Snackbar>
        </div>
    );
};

/* Default Prop Values */
SnackbarComponent.defaultProps = {
    vertical: "top",
    horizontal: "center",
};

SnackbarComponent.propTypes = {
    open: PropTypes.bool,
    snackbarText: PropTypes.string,
    result: PropTypes.string,
    handleClose: PropTypes.func,
};

export default SnackbarComponent;
