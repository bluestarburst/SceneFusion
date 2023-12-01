import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
	TextField,
	Button,
	Slider,
	Input,
	Typography,
	Switch,
	FormControlLabel,
	CircularProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import image from "./Resources/Letter C Profile Picture.jpg";
import fakeGif from "./Resources/sample-17.gif";
import "./style.scss";

// const https = require('https'); // or import https from 'https'
import https from "https";
const agent = new https.Agent({
	rejectUnauthorized: false,
});

const URL = "https://bjv955o44f.execute-api.us-east-2.amazonaws.com/scene";
const IsReadyURL =
	"https://bjv955o44f.execute-api.us-east-2.amazonaws.com/isReady";
// "http://18.116.150.166:80/scene";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

console.log("Hello World!");

const containerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
	padding: "20px",
	backgroundColor: darkTheme.palette.background.default,
};

const formStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "20px",
};

const buttonStyle = {
	marginTop: "20px",
};

var interval = null;
function App() {
	const [prompt, setPrompt] = useState(
		"camera panning right to left, a bird's eye view of a row of buildings in a city with trees in the foreground, masterpiece, best quality"
	);
	const [numSteps, setNumSteps] = useState(25);
	const [negativePrompt, setNegativePrompt] = useState("");
	const [numFrames, setNumFrames] = useState(12.5);
	const [showImage, setShowImage] = useState(false);
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
	const [imageSrc, setImageSrc] = useState("");

	const [loading, setLoading] = useState(false);
	const [requestID, setRequestID] = useState(0);
	const [progress, setProgress] = useState(0);
	const [inQueue, setInQueue] = useState(true);

    useEffect(() => {
        

	const handleSubmit = () => {
		setInQueue(true);
		setLoading(true);
		// randomize request ID between 0 and 1000000
		var num = Math.floor(Math.random() * 1000000);
		setRequestID(num);
		query(
			{
				inputs: {
					prompt: prompt,
					negative_prompt: negativePrompt,
					steps: numSteps,
					guidance_scale: numFrames,
				},
				ip: num,
			},
			false
		)
			.then((r) => {
				interval = setInterval(() => {
					checkResult({ ip: num }, false).then((response) => {
						if (response["ready"] == true) {
							clearInterval(interval);
							setLoading(false);
							console.log(JSON.stringify(response));
							// var thing = JSON.parse(response)
							var base64 = response["result"]["content"];
							var gif = base64ToGif(base64);
							console.log(gif);
							setImageSrc(gif);
							setShowImage(true);
						} else {
							console.log("not ready");
							setProgress(response["progress"]);
							console.log("PROGRESS", response["progress"]);
							if (response["progress"] > 0) {
								setInQueue(true);
							} else {
								setInQueue(false);
							}
						}
					});
				}, 3000);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});

		// setTimeout(() => {
		// 	setLoading(false);
		// 	setImageSrc(fakeGif);
		// 	setShowImage(true);
		// }, 3000);
	};

	const handleRestart = () => {
		setShowImage(false);
		setShowAdvancedOptions(false); // Reset the advanced options state
	};

	useEffect(() => {
		console.log("This happens when this component renders!");
	}, []);

	return (
		<ThemeProvider theme={darkTheme}>
			<div style={containerStyle}>
				{loading ? (
					<>
						{inQueue ? (
							<>
								<p>In Queue</p>
								<CircularProgress />
							</>
						) : (
							<CircularProgress variant="determinate" value={progress} />
						)}
					</>
				) : showImage ? (
					<div>
						<img src={imageSrc} alt="Profile" />
					</div>
				) : (
					<div style={formStyle}>
						<CssBaseline />
						<Typography variant="h4" gutterBottom>
							SceneFusion
						</Typography>
						<div style={{ width: "100vw", maxWidth: "500px" }}>
							<TextField
								fullWidth
								label="Prompt"
								multiline
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
							/>
						</div>
						<FormControlLabel
							control={
								<Switch
									checked={showAdvancedOptions}
									onChange={() => setShowAdvancedOptions(!showAdvancedOptions)}
									color="primary"
								/>
							}
							label="Advanced Options"
						/>
						{showAdvancedOptions && (
							<>
								<TextField
									label="Negative Prompt"
									value={negativePrompt}
									onChange={(e) => setNegativePrompt(e.target.value)}
								/>
								<Typography variant="h6" gutterBottom>
									Number of Steps:
								</Typography>
								<Slider
									value={numSteps}
									onChange={(e, value) => setNumSteps(value)}
									min={1}
									max={50}
									defaultValue={25}
									step={1}
									// marks
									valueLabelDisplay="auto"
								/>
								<Typography variant="h6" gutterBottom>
									Guidance:
								</Typography>
								<Slider
									value={numFrames}
									onChange={(e, value) => setNumFrames(value)}
									min={0}
									max={20}
									defaultValue={12.5}
									step={0.5}
									// marks
									valueLabelDisplay="auto"
								/>
							</>
						)}
						<Button
							variant="contained"
							color="primary"
							style={buttonStyle}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</div>
				)}
				{showImage && (
					<Button
						variant="contained"
						color="primary"
						style={buttonStyle}
						onClick={handleRestart}
					>
						Restart
					</Button>
				)}
			</div>
		</ThemeProvider>
	);
}

async function query(data, local) {
	console.log(JSON.stringify(data));
	const response = await fetch(local ? "scene" : URL, {
		headers: {
			Authorization: "Bearer XXXXXX",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data),
		agent: agent,
	});

	const result = await response.json();
	return result;
}

async function checkResult(data, local) {
	console.log(JSON.stringify(data));
	const response = await fetch(local ? "scene" : IsReadyURL, {
		headers: {
			Authorization: "Bearer XXXXXX",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data),
		agent: agent,
	});

	const result = await response.json();
	return result;
}

function base64ToGif(base64) {
	// var blob = new Blob([base64], { type: "image/gif" });
	// return window.URL.createObjectURL(blob);

	return "data:image/gif;base64," + base64;
}

render(<App />, document.getElementById("root"));
