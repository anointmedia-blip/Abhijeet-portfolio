import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:whoabhio6@gmail.com" data-cursor="disable">
                whoabhio6@gmail.com
              </a>
            </p>
            <p>
              <a href="mailto:abhii.singh.ba@gmail.com" data-cursor="disable">
                abhii.singh.ba@gmail.com
              </a>
            </p>
            <h4>Phone / WhatsApp</h4>
            <p>
              <a
                href="https://wa.me/919876738617?text=Hi%20Abhijeet,%20I%20saw%20your%20portfolio!"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                +91 98767 38617
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/anointmedia-blip"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/abhijeet-singh-519710381/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.threads.net/@abhijeet__1437"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Threads <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/abhijeet__singh__06/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Abhijeet Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
