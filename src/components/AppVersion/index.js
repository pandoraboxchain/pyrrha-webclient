import React from 'react';
import './AppVersion.scss';

import pack from '../../../package.json';
const repo = `https://github.com/pandoraboxchain/pyrrha-webclient/tree/v${pack.version}`;

const AppVersion = () => (
    <div className="pn-app-version">
        <a href={repo}>v{pack.version}</a>      
    </div>
);

export default AppVersion;
