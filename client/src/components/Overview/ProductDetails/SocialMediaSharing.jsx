import React from 'react';

const SocialMediaSharing = (props) => {
  return (
    <section>
      <h4 className="overview-h4">Share on Social Media:</h4>
      <section className="social-media-icons">
        <a
          target="_blank"
          href="https://twitter.com/intent/tweet"
          data-size="large"
          data-text="custom share text"
          data-url="https://dev.twitter.com/web/tweet-button"
          data-hashtags="example,demo"
          data-via="twitterdev"
          data-related="twitterapi,twitter"
        >
          <i className="fa-brands fa-square-twitter"></i>
        </a>

        <a
          onClick={() => {window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse/', 'newwindow', 'width=400, height=250'); return false;}}
        >
          <i className="fa-brands fa-square-facebook"></i>
        </a>

        <a
          target="_blank"
          href="https://www.pinterest.com/<your-profile-here>/"
        >

          <i className="fa-brands fa-square-pinterest"></i>
        </a>

      </section>
    </section>
  )
}

export default SocialMediaSharing;

{/* <i className="fa-brands fa-square-pinterest"></i>
<i className="fa-brands fa-square-twitter"></i>
<i className="fa-brands fa-instagram"></i>
<i className="fa-brands fa-square-facebook"></i> */}
