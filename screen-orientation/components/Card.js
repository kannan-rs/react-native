import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

const Card = (props) => {
	return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.COLOR_BACKGROUND,

		// This shadow only works on IOS
		shadowColor: Colors.COLOR_SHADOW,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.26,
		shadowRadius: 10,

		// Elevation is on Android for addinf Shadow - single property that take Android Meterial Design elevation
		elevation: 5,

		paddingVertical: 20,
		borderRadius: 10,
	},
});

export default Card;
