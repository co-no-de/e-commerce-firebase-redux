import { Text } from "react-native";
import { colors, fonts } from "../data";

const HeadingText = ({
  fontSize = 20,
  children,
  style,
  color = colors.black,
  numberOfLines,
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.titleFont,
          fontSize,
          textAlign: "center",
          paddingVertical: 6,
          color,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default HeadingText;
