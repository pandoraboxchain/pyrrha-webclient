import React, { PureComponent } from 'react';

import JobConstructorForm from '../../containers/JobConstructorForm';

export default class JobConstructor extends PureComponent {

    render() {

        return (
            <div>
                <h2>Cognitive Job Constructor</h2>                
                <JobConstructorForm />
            </div>
        );
    }
}
