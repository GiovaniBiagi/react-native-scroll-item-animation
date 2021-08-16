import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import faker from "faker";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const BG_IMG =
  "https://images.unsplash.com/photo-1575791025398-aa8bfb647f98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80";

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.8),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: SPACING,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                opacity: opacity,
                transform: [{ scale }],
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.6 }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 14, color: "#40A9FF" }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
      <StatusBar hidden />
    </View>
  );
};
