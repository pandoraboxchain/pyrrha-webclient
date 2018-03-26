import React, { PureComponent } from 'react';

import KernelConstructorForm from '../../containers/KernelConstructorForm';
import WrongNet from '../../containers/WrongNet';

export default class KernelConstructor extends PureComponent {

    render() {

        return (
            <div>
                <WrongNet />
                <h2>Kernel Constructor</h2>                
                <KernelConstructorForm />
            </div>
        );
    }
}
