import React from 'react';

function QuestionModal({closeModal}) {
  return(
    <div className="qa-modalBackground">
      <div className="qa-modalContainer">
          <button className="qa-modalTitleCloseBtn"
            onClick={() => closeModal(false)}
          >
            x
          </button>
        <div className="qa-modalTitle">
          <h1>Ask Your Question</h1>
        </div>
        <div className="qa-modalBody"></div>
          <label className="required">Your question
            <br></br><input type="text" required></input>
          </label>
        <div className="qa-modalFooter">
          <button className="qa-modalFooterBtn" id="qa-modalFooterCancelBtn"
              onClick={() => closeModal(false)}
          >
            Cancel
          </button>
          <button className="qa-modalFooterBtn"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  )

}

export default QuestionModal