import React from 'react';
import Layout from './hoc/Layout/Layout.js';
import Battleship from './containers/Battleship/Battleship';

const App = () => {
  return (
    <div>
      <Layout>
        <Battleship />
      </Layout>
    </div>
  );
};

export default App;
