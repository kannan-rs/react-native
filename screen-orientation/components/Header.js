import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";

const Header = (props) => {
	return (
		<View
			style={{
				...styles.headerContainer,
				...props.style,
				...Platform.select({
					ios: styles.headerContainerIOS,
					android: styles.headerContainerAndroid,
				}),
			}}
		>
			<Text
				style={{
					...styles.headerTitle,
					...Platform.select({ ios: styles.headerTitleIOS, android: styles.headerTitleAndroid }),
				}}
			>
				{props.title}
			</Text>
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
	},
	headerContainerIOS: {
		backgroundColor: Colors.COLOR_PRIMARY,
	},

	headerContainerAndroid: {
		backgroundColor: "#FFFFFF",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "700",
		fontFamily: "open-sans-bold",
	},
	headerTitleIOS: { color: "#FFF" },
	headerTitleAndroid: { color: "#000" },
});

export default Header;
