import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer (Intern)</h4>
                <h5>Printevr</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Assisted in creating visual content including marketing materials, product packaging, and digital assets. Refined brand consistency across projects and developed hands-on proficiency with industry-standard design software.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer</h4>
                <h5>Jasco Labs Pvt. Ltd.</h5>
              </div>
              <h3>2022 - 2024</h3>
            </div>
            <p>
              Produced high-quality visual content for pharmaceutical products and marketing materials. Designed product packaging, brochures, flyers, and regulatory-compliant digital assets. Developed motion graphics and promotional video content.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Social Media Manager</h4>
                <h5>WePromote</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Oversee end-to-end content strategy across platforms. Create high-impact reels, motion graphics, and AI-generated visuals to support brand awareness and client audience growth. Manage brand tone, scheduling, and community engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
