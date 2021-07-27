// This also works using with the same import
// export default {
// 	COLOR_HEADER: "#8D87f5",
// 	COLOR_BUTTON_PRIMARY: "#8D87f5",
// 	COLOR_BUTTON_SECONDARY: "red",
// 	COLOR_SHADOW: "black",
// 	COLOR_BACKGROUND: "#FFFFFF",
// };

const Colors = {
	COLOR_PRIMARY: "#25AAC5",
	COLOR_SECONDARY: "#F02250",
	COLOR_SHADOW: "black",
	COLOR_BACKGROUND: "#FFFFFF",
};

Colors.COLOR_BUTTON_PRIMARY = Colors.COLOR_PRIMARY;
Colors.COLOR_BUTTON_SECONDARY = Colors.COLOR_SECONDARY;

export default Colors;
