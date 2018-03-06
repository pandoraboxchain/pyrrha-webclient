import React, { PureComponent } from 'react';

import DatasetConstructorForm from '../../containers/DatasetConstructorForm';

export default class KernelConstructor extends PureComponent {

    render() {

        return (
            <div>
                <h2>Dataset Constructor</h2>                
                <DatasetConstructorForm />
            </div>
        );
    }
}
