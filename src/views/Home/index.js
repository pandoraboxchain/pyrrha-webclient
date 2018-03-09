import React, { Component } from 'react';

import KernelsTable from '../../containers/KernelsTable'
import DatasetsTable from '../../containers/DatasetsTable'

export default class Home extends Component {

    render() {
        return (
            <div>
                <h3>Kernels</h3>
                <KernelsTable />

                <h3>Datasets</h3>
                <DatasetsTable />
                
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
