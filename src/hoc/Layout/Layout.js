import React from 'react';
import Aux from '../aux/aux';

const layout = (props) => {
  return (
    <Aux>
      {/* toolbar */}
      <main>{props.children}</main>
    </Aux>
  );
};

export default layout;
