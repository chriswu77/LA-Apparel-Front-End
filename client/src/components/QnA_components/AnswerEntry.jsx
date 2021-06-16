import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerEntry = ({ answer }) => {
  const [helpful, setHelpful] = useState(answer.helpfulness);
  const [click, setClick] = useState(false);
  const [reported, setReported] = useState(false);

  const handleHelpfulness = (id, help) => {
    const updateHelpful = {
      updateHelpful: help + 1,
    };
    axios.put(`/api/qa/answers/${answer.answer_id}/helpful`, updateHelpful)
      // .then(() => axios.get(`/api/qa/questions/${question.question_id}/answers`))
      .catch((err) => console.error(err));
  };

  const handleAnswerReport = (id) => {
    const report = {
      reported: true,
    };
    axios.put(`/api/qa/answers/${answer.answer_id}/report`, report)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        A:
        {answer.body}
      </div>
      <div>
        {answer.answerer_name}
        ,
        &nbsp;
        {new Date(answer.date).toString().slice(4, 16)}
        {!click ? (
          <span onClick={() => {
            handleHelpfulness(answer.answer_id, helpful);
            setHelpful(helpful + 1);
            setClick(true);
          }}>
            Helpful? <u>Yes</u>(
            {helpful}
            )
            &nbsp;
          </span>
        ) : (
          <span>
            Helpful? <u>Yes</u>(
            {helpful}
            )
            &nbsp;
          </span>
        )}
        {!reported ? (
        <u onClick={() => {
          handleAnswerReport(answer.answer_id, reported);
          setReported(true);
        }}>
            Report
        </u>
        ) : (
          <span>Reported</span>
        )}
      </div>
    </div>
  );
};

export default AnswerEntry;
