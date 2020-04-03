import { useState } from "react";
import { initialState } from "../Components/Survey/surveyInitialState";

export default function useForm (onSubmit) {
  const [ inputs, setInputs ] = useState(initialState);

  function handleSliderChange (name, value) {
    setInputs({ ...inputs, [name]: value });
  }

  function handleCheckBoxChange (event) {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: (value === 'Yes')
    });
  }

  function handleConfirm (event) {
    const { name, checked } = event.target;
    console.log(`handle ${name}: ${checked}`)
    setInputs({
      ...inputs,
      [name]: checked
    });
  }

  function handleSubmit (event) {
    event.preventDefault();
    onSubmit();
  }

  return {
    inputs,
    handleSliderChange,
    handleCheckBoxChange,
    handleSubmit,
    handleConfirm
  };
}