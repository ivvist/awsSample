import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

export default function Chat(props) {
const { uname } = props;
return (
      <div className="App">
          <div>
		Welcome - {uname}
	  </div>
          <AmplifySignOut />
      </div>
);
}

