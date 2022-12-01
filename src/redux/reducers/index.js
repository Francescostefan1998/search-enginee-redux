const initialState = {
  work: {
    content: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-TO-FAVOURITE-JOB":
      return {
        ...state,
        work: {
          ...state.work,
          content: [...state.work.content, action.payload],
        },
      };
    case "REMOVE-FROM-FAVOURITE-JOB":
      return {
        ...state,
        work: {
          ...state.work,
          content: state.work.content.filter((job, i) => {
            return i !== action.payload;
          }),
        },
      };

    default:
      return state;
  }
};
export default mainReducer;
