import React, { useState } from "react";
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Slidebutton({txt="Sorting"}) {

    const [hover, setHover] = useState(false)

  return (
    <button
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
      type="submit"
      className={`relative bg-lime-700 ${hover ? "expand_w w-full" : "contract_w w-[20%]"} flex items-center px-4 py-2 text-white rounded`}
    ><span>Go</span>
      <span className={`absolute right-4`}>
      <FontAwesomeIcon icon={faAnglesRight} />
      </span>
    </button>
  );
}

export default Slidebutton;
