import React from "react";

//if error
function Errors({ errors }) {
  return (
    <>
      <div>
        <div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Errors;
