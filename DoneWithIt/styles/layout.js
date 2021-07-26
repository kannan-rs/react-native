import { StyleSheet } from "react-native";

export styles = StyleSheet.create({
	parentView: {
		flexDirection: "row",
		height: 100,
		borderWidth: 2,
		justifyContent: "space-around",
		alignItems: "stretch",
	},

	redView: {
		backgroundColor: "red",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	blueView: {
		backgroundColor: "blue",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	greenView: {
		backgroundColor: "green",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
