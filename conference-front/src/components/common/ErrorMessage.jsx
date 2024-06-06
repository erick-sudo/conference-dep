import React from "react";

function ErrorMessage({message}) {

    return (
        <div className="text-red-600 text-sm">
            {message.map((err, i) => {
                return <div key={i}>{err}</div>
            })}
        </div>
    )
}

export default ErrorMessage;