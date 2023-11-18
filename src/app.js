import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { render } from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";

import "./style.scss";
import { Button } from "@mui/material";

// this is a theme that we can use to make our app dark
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

// this is the main component of our app
function App() {
    // this is a state variable that we can change
	const [test, setTest] = React.useState("test");

    useEffect(() => {
        console.log("This happens when this component renders!")
    }, [])

    useEffect(() => {
        console.log("This happens when test changes!")
    }, [test])

    // this is the HTML that will be rendered
    // all JS code must be inside curly braces!
	return (
		<ThemeProvider theme={darkTheme}>
            <CssBaseline />
			<div className="flex-page">
				<h1>Goodbye World</h1>

				<TextField
					label="Test"
					value={test}
					onChange={(e) => setTest(e.target.value)}
				/>

                <br/>

				<p>{test}</p>

                <br/>

                <Button variant="contained" color="primary">Click Me!</Button>
			</div>
		</ThemeProvider>
	);
}

// this is the code that renders the HTML
render(<App />, document.getElementById("root"));
