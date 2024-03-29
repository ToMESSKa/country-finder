import React, { useState, useEffect } from "react";

import { Formik } from "formik";

const SearchForm = (props) => {
  


  return(
    <Formik
      initialValues={{ name: "jared" }}
      onSubmit={(values, actions) => {
      let newCurrency = values;
      props.setCurrency(newCurrency)
      props.getCountriesByCurrency()
      console.log(props.currency)
    }}  
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
            name="name"
          />
          {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>);
};

export default SearchForm;
