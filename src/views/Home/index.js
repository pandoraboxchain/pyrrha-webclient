import React, { Component } from 'react';

import KernelsTable from '../../containers/KernelsTable';
import DatasetsTable from '../../containers/DatasetsTable';
import { Grid } from 'semantic-ui-react';

import WrongNet from '../../containers/WrongNet';

export default class Home extends Component {

    render() {
        return (
            <div>
                <WrongNet />
                <Grid container columns={1} stackable>
                    <Grid.Column>
                        <KernelsTable />
                    </Grid.Column>
                    <Grid.Column>
                        <DatasetsTable />
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
