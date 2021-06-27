import React from "react";

const Campaign = (props) => {
  const { body, cc, howManyTime, startTime, subject, to } = props;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Subject : {subject}</h5>
        <p className="card-text">Body : {body}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">To : {to}</li>
          <li className="list-group-item">{cc && <> CC : {cc}</>}</li>
          <li className="list-group-item">
            How Many Time Email Sent : {howManyTime}
          </li>
          <li className="list-group-item">
            Start Time : {new Date(startTime).toISOString()}
          </li>
          <li className="list-group-item">Subject : {subject}</li>
        </ul>
      </div>
    </div>
  );
};

export default Campaign;
