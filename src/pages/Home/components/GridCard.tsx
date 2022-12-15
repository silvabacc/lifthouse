import React from "react";
import { ImageSourcePropType, View } from "react-native";
import { Card } from "react-native-paper";
import style, { cardStyle } from "./GridCard.style";
import { cardColors } from "../../../style/colors";

interface CardInfo {
  title: string;
  image: ImageSourcePropType;
}

/**
 * @param cards Title and an image for the card to be displayed
 * @param colorsSlice Takes two index indices and uses colors inbetween these numbers
 *                    from the @cardColors array. First number should be smaller than second
 */
interface GridCardProps {
  cards: CardInfo[];
  colorsSlice?: [number, number];
}

const GridCard: React.FC<GridCardProps> = ({ cards, colorsSlice }) => {
  const colors = colorsSlice
    ? cardColors.slice(colorsSlice[0], colorsSlice[1])
    : cardColors.slice(1, 5);

  return (
    <>
      <View style={style.container}>
        {cards.map((card, index) => (
          <Card key={`card-${index}`} style={[cardStyle(colors[index]).card]}>
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
