import React from 'react';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

const Home = () => {

    const history = useHistory();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.push('/gift')}>
                Create Gift Exchange
            </Button>
        </div>
    )
}

export default Home;
