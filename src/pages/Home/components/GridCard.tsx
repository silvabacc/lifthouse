import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import style, { cardStyle } from "./GridCard.style";
import UpperIntensityImage from "../../../assets/cardImages/upper_intensity.png";
import UpperVolumeImage from "../../../assets/cardImages/upper_volume.png";
import LowerIntensityImage from "../../../assets/cardImages/lower_intensity.png";
import LowerVolumeImage from "../../../assets/cardImages/lower_volume.png";
import { cardColors } from "../../../style/colors";

const GridCard: React.FC = () => {
  const workoutCardColors = cardColors.slice(1, 5);

  return (
    <>
      <View style={style.container}>
        {[
          { title: "Upper Intensity", image: UpperIntensityImage },
          { title: "Upper Volume", image: UpperVolumeImage },
          { title: "Lower Intensity", image: LowerIntensityImage },
          { title: "Lower Volume", image: LowerVolumeImage },
        ].map((card, index) => (
          <Card
            key={`card-${index}`}
            style={[cardStyle(workoutCardColors[index]).card]}
          >
            <Card.Title
              title={card.title}
              titleStyle={cardStyle().card_title}
            />
            <Card.Cover style={cardStyle().card_icon} source={card.image} />
          </Card>
        ))}
      </View>
    </>
  );
};

export default GridCard;
