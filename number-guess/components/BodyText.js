import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = (props) => {
	return <Text style={{ ...styles.bodyText, ...props?.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	bodyText: {
		fontFamily: "open-sans",
		color: "red",
	},
});
export default BodyText;
