import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const Header = (props) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		height: 90,
		borderWidth: 1,
		backgroundColor: Colors.COLOR_PRIMARY,
	},
	headerTitle: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "700",
		fontFamily: "open-sans-bold",
	},
});

export default Header;
