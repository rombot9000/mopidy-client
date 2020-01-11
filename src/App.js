import React from 'react';
import { Button } from '@rmwc/button';
//import { GridList } from '@rmwc/grid-list';
import MopidyHandler from './MopidyHandler';

function App() {

  const handler = new MopidyHandler();

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => {}}>Connect</Button>
        <Button onClick={() => handler.getAlbums()}>Library</Button>
      </header>
    </div>
  );

}

export default App;
