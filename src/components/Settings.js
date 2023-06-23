import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCategory,
  changeDifficulty,
  handleLoadingChange,
  setName,
  setQuestions,
} from "../router/Action";

function Settings() {
  const [options, setOptions] = useState(null);
  const loading = useSelector((state) => state.options.loading);
  const questionCategory = useSelector(
    (state) => state.options.question_category
  );
  const questionDifficulty = useSelector(
    (state) => state.options.question_difficulty
  );
  const questionType = useSelector((state) => state.options.question_type);
  const questionAmount = useSelector(
    (state) => state.options.amount_of_questions
  );

  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    dispatch(changeCategory(event.target.value));
  };

  const handleDifficultyChange = (event) => {
    dispatch(changeDifficulty(event.target.value));
  };

  const handleQuery = async () => {
    console.log(questionCategory);
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;
    // only add the rest of the parameters if they aren't 'all'
    if (questionCategory) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`);
    }
    if (questionDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
    }
    if (questionType.length) {
      apiUrl = apiUrl.concat(`&type=${questionType}`);
    }
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        // this is where we will set questions in the state using an action
        console.log(response.results);
        dispatch(setQuestions(response.results));
      });
  };

  // useEffect hook
  const changeName = (event) => {
    dispatch(setName(event.target.value));
  };

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    dispatch(handleLoadingChange(true));

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setOptions(response.trivia_categories);
      });
    dispatch(handleLoadingChange(false));
  }, [setOptions]);
  return (
    <Grid>
      {!loading ? (
        <Grid>
          <h1 style={{ fontSize: "75px" }}>Quiz Application</h1>
          <Grid style={{ justifyContent: "center", display: "flex" }}>
            <Card
              sx={{ minWidth: 180, width: 400, backgroundColor: "transparent" }}
            >
              <CardContent>
                <Typography style={{ fontSize: "40px", fontWeight: "200" }}>
                  Quiz Settings
                </Typography>

                <TextField
                  style={{ marginTop: 40}}
                  fullWidth
                  id="outlined-basic"
                  label="Enter Name"
                  variant="outlined"
                  onChange={changeName}
                />

                <FormControl fullWidth style={{ marginTop: 40 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Category"
                    value={questionCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                  >
                    {options &&
                      options.map((option) => (
                        <MenuItem value={option.id}>{option.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth style={{ marginTop: 40 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Difficulty
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Difficulty"
                    value={questionDifficulty}
                    onChange={handleDifficultyChange}
                    displayEmpty
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>

                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  onClick={handleQuery}
                  fullWidth
                  variant="filled"
                  style={{ backgroundColor: "blue" }}
                >
                  Start Quiz
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <p>LOADING...</p>
      )}
    </Grid>
  );
}

export default Settings;
