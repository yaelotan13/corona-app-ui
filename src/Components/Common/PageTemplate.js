import React, { Fragment } from "react";
import { Footer } from "./Footer";

export const PageTemplate = ({ children }) =>
  <Fragment>
    {/*<Header/>*/}
    <main className="main">
      {children}
    </main>
    <Footer/>
  </Fragment>
;
