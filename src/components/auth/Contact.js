import React from 'react';

const Contact = () => {
  return (
    <>
      <section className="sign">
        <div className="contact-container sign-container">
          <div className="contact-left sign-left">
            <h2 className='contact-heading form-heading'>Contact Me</h2>
            <form className="contact-form">

              <div className="form-group">
                <label htmlFor="name">
                  <i class="zmdi zmdi-account"></i>
                </label>
                <input id="name" type="text" name="name"
                  autoComplete='off' placeholder='Enter Name'
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email"></i>
                </label>
                <input id="email" type="text" name="email"
                  autoComplete='off' placeholder='Enter Email'
                />
              </div>

              <div className="contact-textarea">
                <label htmlFor="message">
                  Type Message:-
                </label>
                <br />
                <textarea id="message" name="message">
                </textarea>
              </div>

              <div className='form-button'>
                <button className="contact-button" type="submit">Send</button>
              </div>

            </form>
          </div>

          <div className="contact-right">
            <h2 className='contact-heading form-heading'>Developed By:</h2>
            <img className="my-image" src="https://res.cloudinary.com/princekr20/image/upload/v1645642523/TraVlog/me2_h8743q.jpg" alt="Loading Image"></img>
            <div className='contact-me'>
              <span className='contact-me-details'>Email</span>
              <span className='conatct-me-val'>princekumargilli@gmail.com</span>
            </div>
            <div className='contact-me'>
              <span className='contact-me-details'>Phone</span>
              <span className='conatct-me-val'>+91-09606008</span>
            </div>
            <div className='contact-me'>
              <span className='contact-me-details'>Address</span>
              <span className='conatct-me-val'>Patna, Bihar</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
