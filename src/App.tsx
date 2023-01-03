import React from "react";
import { View } from "react-native";
import { Provider } from "react-native-paper";
import Home from "./pages/Home/Home";
import { pageStyle } from "./style/House.style";

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <View style={pageStyle.body}>
          <Home />
        </View>
      </Provider>
    </>
  );
};

export default App;
