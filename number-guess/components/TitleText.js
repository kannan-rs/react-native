import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleText = (props) => {
	return <Text style={styles.titleText}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	titleText: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
	},
});
export default TitleText;
