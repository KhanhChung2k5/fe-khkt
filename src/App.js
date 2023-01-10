import Main from "Main";
import React from "react";
import { AppStore } from "stores";

const App = () => {
  return (
    <div>
      <AppStore.Provider>
        <Main></Main>
      </AppStore.Provider>
    </div>
  );
};

export default App;
