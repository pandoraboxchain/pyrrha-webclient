import React, { PureComponent } from 'react';

import JobConstructorForm from '../../containers/JobConstructorForm';
import WrongNet from '../../containers/WrongNet';

export default class JobConstructor extends PureComponent {

    render() {

        return (
            <div>
                <WrongNet />
                <h2>Cognitive Job Constructor</h2>                
                <JobConstructorForm />
            </div>
        );
    }
}
