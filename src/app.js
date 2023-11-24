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
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import image from "./Resources/Letter C Profile Picture.jpg";
import "./style.scss";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

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

function App() {
    const [prompt, setPrompt] = useState("");
    const [numSteps, setNumSteps] = useState(1);
    const [negativePrompt, setNegativePrompt] = useState("");
    const [numFrames, setNumFrames] = useState(1);
    const [showImage, setShowImage] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    const handleSubmit = () => {
        setShowImage(true);
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
                {showImage ? (
                    <div>
                        <img src={image} alt="Profile" />
                    </div>
                ) : (
                    <div style={formStyle}>
                        <CssBaseline />
                        <Typography variant="h4" gutterBottom>
                            SceneFusion
                        </Typography>
                        <TextField
                            label="Prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showAdvancedOptions}
                                    onChange={() =>
                                        setShowAdvancedOptions(!showAdvancedOptions)
                                    }
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
                                    max={10}
                                    step={1}
                                    marks
                                    valueLabelDisplay="auto"
                                />
                                <Typography variant="h6" gutterBottom>
                                    Number of Frames:
                                </Typography>
                                <Slider
                                    value={numFrames}
                                    onChange={(e, value) => setNumFrames(value)}
                                    min={1}
                                    max={10}
                                    step={1}
                                    marks
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

render(<App />, document.getElementById("root"));