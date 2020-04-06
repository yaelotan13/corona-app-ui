import { useState } from "react";
import { initialState } from "../Components/Survey/surveyInitialState";

export default function useForm (onSubmit, t) {
  const [ inputs, setInputs ] = useState(initialState);
  const [ isConfirmed, setIsConfirmed ] = useState(false);

  function handleSliderChange (name, value) {
    setInputs({ ...inputs, [name]: value });
  }

  function handleCheckBoxChange (event) {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: (value === t('yes'))
    });
  }

  function handleConfirm (event) {
    const { checked } = event.target;
    setIsConfirmed(checked);
  }

  function handleSubmit (event) {
    event.preventDefault();
    onSubmit();
  }

  return {
    inputs,
    isConfirmed,
    handleSliderChange,
    handleCheckBoxChange,
    handleSubmit,
    handleConfirm
  };
}
