const initState = {
  options: {
    loading: false,
    question_category: ``,
    question_difficulty: ``,
    question_type: "multiple",
    amount_of_questions: 15,
  },
  questions: [],
  index: 0,
  score: 0,
  name:""
};
const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_LOADING":
      return {
        ...state,
        options: {
          ...state.options,
          loading: action.value,
        },
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        options: {
          ...state.options,
          question_category: action.value,
        },
      };
    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        options: {
          ...state.options,
          question_difficulty: action.value,
        },
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };
    case "SET_INDEX":
      return {
        ...state,
        index: action.index,
      };

    case "SET_SCORE":
      return {
        ...state,
        score: action.score,
      };
      case "SET_NAME":
      return {
        ...state,
        score: action.name,
      };
    default:
      return state;
  }
};
export default Reducer;
