import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import http from "./httpReqsForQA.js";
import qaUtilities from "./qaUtilities.js"
const axios = require("axios")


function AnswerModal({product_id, question_id, closeModal, mainQA, setQA}) {
  const {register, handleSubmit, formState: {errors}, reset} = useForm({criteriaMode: "all"});
  const onSubmit = (data) => {
    console.log('this is data: ', data)
    // reset()
    // closeModal(false)
    if (data.yourImages.length > 0) {
      console.log('images: ', data.yourImages)
      let body = new FormData()
      body.set('key', process.env.IMGBB_KEY)
      for (var key in data.yourImages) {
        if (key.length === 1) {
          console.log('here is key: ', key)
          // IF condition is v hacky way to get only keys of files
          body.append('image', data.yourImages[key])
        }
      }
      // body.append('image', data.yourImages[0])
      // TODO: how to view multiple images with IMGBB?!?!
      axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
      })
        .then((res) =>
          http.postAnswer(
            product_id,
            question_id,
            {
            'body': data.yourAnswer,
            'name': data.yourNickname,
            'email': data.yourEmail,
            'photos': [res.data.data.url]
            }
          ))
        .then((res) => http.getQuestions(product_id))
        .then((res) => {
          setQA(res.data.results)
        })
        .catch((err) => {console.error(err)})
    } else {
      const modalData = {
        'body': data.yourAnswer,
        'name': data.yourNickname,
        'email': data.yourEmail,
        'photos': []
      }
      http.postAnswer(product_id, question_id, modalData)
        .then((res) => http.getQuestions(product_id))
        .then((res) => {setQA(res.data.results)})
        .catch((err) => {console.error(err)})
    }
  }

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
            <h1>Answer a Question</h1>
          </div>
          <div className="qa-modalBody"></div>
            <label className="modalLabel">
              Your Answer
              <input className="modalInput" type="text"
              {...register("yourAnswer",
                {
                    required: "Answer is required",
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
                name="yourAnswer"
                render={({ messages }) => messages && Object.entries(messages).map(([type, message]) => (<p key={type}>{message}</p>))}
                />
              </small>
            </label>
            <label className="modalLabel">
              Your Images
              <input className="modalInput"
                type="file"
                multiple
                accept="image/png, image/jpeg"
                {...register("yourImages")}
                // TODO: HANDLE ERRORS FOR FILE UPLOADS
              />
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
            {/* <button className="qa-modalFooterBtn" id="qa-modalFooterCancelBtn"
                onClick={() => closeModal(false)}
            >
              Cancel
            </button> */}
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

export default AnswerModal