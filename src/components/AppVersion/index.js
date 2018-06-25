import React from 'react';
import './AppVersion.scss';

import pack from '../../../package.json';


const AppVersion = () => (
    <div className="pn-app-version">
        v{pack.version}      
    </div>
);

export default AppVersion;
