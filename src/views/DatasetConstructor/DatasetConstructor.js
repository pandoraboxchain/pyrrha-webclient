import React, { PureComponent } from 'react';

import DatasetConstructorForm from '../../containers/DatasetConstructorForm';
import WrongNet from '../../containers/WrongNet';

export default class KernelConstructor extends PureComponent {

    render() {

        return (
            <div>
                <WrongNet />
                <h2>Dataset Constructor</h2>                
                <DatasetConstructorForm />
            </div>
        );
    }
}
