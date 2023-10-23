import { View } from "react-native";

const RowView = ({ children, style }) => {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      {children}
    </View>
  );
};

export default RowView;
