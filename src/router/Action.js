export const handleLoadingChange = (value) => {
  return {
    type: "CHANGE_LOADING",
    loading: value,
  };
};

export const changeCategory = (event) => {
  return {
    type: "CHANGE_CATEGORY",
    value: event,
  };
};

export const changeDifficulty = (event) => {
  return {
    type: "CHANGE_DIFFICULTY",
    value: event,
  };
};

export const setQuestions = (value) => {
  return {
    type: "SET_QUESTIONS",
    questions: value,
  };
};

export const setIndex = (value) => {
  return {
    type: "SET_INDEX",
    index: value + 1,
  };
};

export const setScore = (value) => {
  return {
    type: "SET_SCORE",
    score: value + 1,
  };
};

export const setName = (value) => {
    return {
      type: "SET_NAME",
      name: value,
    };
  };
