import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';

function QuestionModal({closeModal}) {
  const {register, handleSubmit, formState: {errors} } = useForm({criteriaMode: "all"});
  const onSubmit = (data) => console.log(data);
  // const onError = (errors) => {};
  console.log('in question modaL!')
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
              Your Question
            <input className="modalInput" type="text"
            {...register("yourQuestion",
              {
                  required: "Question is required",
                  maxLength: {
                    value: 1000,
                    message: "Question is limited to 1000 characters"
                  }
              })
            }
            />
            <small>
              <ErrorMessage
              errors={errors}
              name="yourQuestion"
              render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
              />
            </small>
            <br></br>
            </label>
            <label className="modalLabel">
                Your Nickname
              <input className="modalInput"
                type="text"
                placeholder="Example: jackson11!"
                {...register("yourNickname",
                  {
                    required: "Nickname is required",
                    maxLength: {
                      value: 60,
                      message: "Nickname is limited to 60 characters"
                    }
                  })
                }
              />
              <small>
                <ErrorMessage
                errors={errors}
                name="yourNickname"
                render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
                />
              </small>
              <small className="modalSubtext">For privacy reasons, do not use your full name or email address</small>
              <br></br>
            </label>
            <label className="modalLabel">
                Your Email
              <input className="modalInput"
                type="text"
                placeholder="Example: jack@email.com"
                {...register("yourEmail",
                  {
                    required: "Email is required",
                    maxLength: {
                      value: 60,
                      message: "Email is limited to 60 characters"
                    },
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Email needs to follow username@email.com format"
                    }
                  })
                }
              />
              {/* <small className="text-danger">
                {errors.yourEmail && errors.yourEmail.message}
              </small> */}
              <small>
                <ErrorMessage
                errors={errors}
                name="yourEmail"
                render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
                />
              </small>
              <small className="modalSubtext">For authentication reasons, you will not be emailed</small>
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