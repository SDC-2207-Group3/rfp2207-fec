import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import http from "../Utilities/Atelier.jsx";
const axios = require("axios")


function AnswerModal({product_id, question_id, closeModal, mainQA, setQA}) {
  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({criteriaMode: "all"});
  const imageFiles = watch("yourImages")
  console.log('this is watch: ', imageFiles)
  const onSubmit = (data) => {
    // console.log('this is data: ', data)
    if (data.yourImages.length > 0) {
      // console.log('images: ', data.yourImages)
      var arrPromise = [];
      for (var key in data.yourImages) {
        if (key.length === 1) {
          // IF condition is v hacky way to get only keys of files
          var body = new FormData()
          body.set('key', process.env.IMGBB_KEY)
          body.append('image', data.yourImages[key])
          var promise = http.postToImgbb(body);
          arrPromise.push(promise);
        }
      }
      Promise.all(arrPromise)
        .then((res) =>
          // res is an array
          http.postAnswer(
            product_id,
            question_id,
            {
            'body': data.yourAnswer,
            'name': data.yourNickname,
            'email': data.yourEmail,
            'photos': res.map((e) => e.data.data.url)
            }
          )
        )
        .then((res) => http.getQuestions(product_id))
        .then((res) => {
          // console.log('setting new results: ', res.data.results)
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
    reset()
    closeModal(false);
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
              <input
                className="modalInput"
                type="text"
                // value="This product runs small."
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
              />
            <div className="qa-thumbnail-list">
              {imageFiles && Object.entries(imageFiles).map(([index, image]) => {
                    return (
                        <img className="qa-thumbnail" key={image.name} src={URL.createObjectURL(image)} />
                    )
                  })}
            </div>
            </label>
            <label className="modalLabel">
                Your Nickname
              <input className="modalInput"
                type="text"
                placeholder="Example: jackson11!"
                // value="jess123"
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
                type="email"
                placeholder="Example: jack@email.com"
                // value="helloWorld@gmail.com"
                {...register("yourEmail",
                  {
                    required: "Email is required",
                    maxLength: {
                      value: 60,
                      message: "Email is limited to 60 characters"
                    },
                    // pattern: {
                    //   value: /^[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/,
                    //   message: "Email needs to follow username@email.com format"
                    // }
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