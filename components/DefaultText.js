import { Text } from "react-native";
import { fonts, colors } from "../data";

const DefaultText = ({
  fontSize = 16,
  children,
  style,
  color = colors.black,
  numberOfLines,
}) => {
  return (
    <Text
      style={[{ fontFamily: fonts.textFont, fontSize, color }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default DefaultText;
