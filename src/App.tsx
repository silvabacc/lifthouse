import React from "react";
import { View } from "react-native";
import Home from "./pages/Home/Home";
import { pageStyle } from "./style/House.style";

const App: React.FC = () => {
  return (
    <>
      <View style={pageStyle.body}>
        <Home />
      </View>
    </>
  );
};

export default App;
