import Error from 'next/error';
import React from "react";

export const throw404 = () => {
  if (process.browser) {
    return <Error statusCode={404} />
  }
  const e = new Error()
  e.code = 'ENOENT'
  throw e
}
