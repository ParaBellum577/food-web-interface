import validator from 'validator';


export const required = (value) => {
  if (!value.toString().trim().length) {
    return (
    	// <ValidationErrorMsg msg={'Required field.'} />
    );
  }
};

export const email = (value) => {
  if (!validator.isEmail(value)) {
    return "{ value } is not a valid email."
  }
};

