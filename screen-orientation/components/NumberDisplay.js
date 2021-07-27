import React from "react";
import Colors from "../constants/colors";

import { View, Text, StyleSheet } from "react-native";

const NumberDisplay = (props) => {
	return (
		<View {...props} style={{ ...styles?.container, ...props?.style }}>
			<Text style={{ ...styles?.number, ...props?.textStyle }}>{props?.children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// borderWidth: 2,
		// borderColor: Colors.COLOR_BUTTON_SECONDARY,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	number: {
		color: Colors.COLOR_PRIMARY,
		fontSize: 22,
	},
});

export default NumberDisplay;
