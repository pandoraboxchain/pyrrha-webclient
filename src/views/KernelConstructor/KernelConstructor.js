import React, { PureComponent } from 'react';

import KernelConstructorForm from '../../containers/KernelConstructorForm';

export default class KernelConstructor extends PureComponent {

    render() {

        return (
            <div>
                <h2>Kernel Constructor</h2>                
                <KernelConstructorForm />
            </div>
        );
    }
}
