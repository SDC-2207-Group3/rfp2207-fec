import React from 'react';
import {useForm} from "react-hook-form";
// import {ErrorMessage} from '@hookform/error-message';

function QuestionModal({closeModal}) {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) => console.log(data);
  return (

    <div className="qa-modalBackground">
      <div className="qa-modalContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <button className="qa-modalTitleCloseBtn"
              onClick={() => closeModal(false)}
            >
              x
            </button>
          <div className="qa-modalTitle">
            <h1>Ask Your Question</h1>
          </div>
          <div className="qa-modalBody"></div>
              <label className="modalLabel">
                Your question
              <input className="modalInput" type="text" {...register("yourQuestion", {required: true, maxLength: 1000})} />
              <br></br>
              </label>
            <label className="modalLabel">
                Your Nickname
              <input className="modalInput"
                type="text"
                placeholder="Example: jackson11!"
                {...register("yourNickname", {required: true, maxLength: 60})} />
              <p className="modalSubtext">For privacy reasons, do not use your full name or email address</p>
              <br></br>
            </label>
            <label className="modalLabel">
                Your Email
              <input className="modalInput"
                type="text"
                placeholder="Example: jack@email.com"
                {...register("yourEmail", {required: true, maxLength: 60, pattern:"*@*"})} />
              <p className="modalSubtext">For authentication reasons, you will not be emailed</p>
              <br></br>
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
        </form>
      </div>
    </div>
  )

}

// function QuestionModal({closeModal}) {

//   return(
//     <div className="qa-modalBackground">
//       <div className="qa-modalContainer">
//           <button className="qa-modalTitleCloseBtn"
//             onClick={() => closeModal(false)}
//           >
//             x
//           </button>
//         <div className="qa-modalTitle">
//           <h1>Ask Your Question</h1>
//         </div>
//         <div className="qa-modalBody"></div>
//           <label className="required">Your question
//             <br></br><input type="text" required></input>
//           </label>
//         <div className="qa-modalFooter">
//           <button className="qa-modalFooterBtn" id="qa-modalFooterCancelBtn"
//               onClick={() => closeModal(false)}
//           >
//             Cancel
//           </button>
//           <button className="qa-modalFooterBtn"
//           >
//             Submit
//           </button>
//         </div>

//       </div>
//     </div>
//   )

// }

export default QuestionModal