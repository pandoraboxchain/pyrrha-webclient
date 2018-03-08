import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';
import KernelsTable from '../../containers/KernelsTable'

export default class Home extends Component {

    render() {
        return (
            <div>
                <Grid columns={3}>
                    <Grid.Column>
                        <h3>Kernels</h3>
                        <KernelsTable />
                    </Grid.Column>
                    <Grid.Column>
                        
                    </Grid.Column>
                    <Grid.Column>
                        
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export const route = {
    path: '/',
    exact: true,
    label: 'Home',
    component: Home
};
