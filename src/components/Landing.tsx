import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ABHIJEET
              <br />
              <span>SINGH</span>
            </h1>
          </div>

          {/* Floating Animated Badges in 3 Corners */}
          <div className="landing-tools">
            <div className="tool-chip tool-chip-1" title="Visual & Brand Design">
              <img src="/images/photoshop.svg" alt="Photoshop" className="tool-icon" />
              <img src="/images/illustrator.svg" alt="Illustrator" className="tool-icon" />
              <span>Visual & Brand Design</span>
            </div>

            <div className="tool-chip tool-chip-2" title="Video & Motion VFX">
              <img src="/images/premiere.svg" alt="Premiere Pro" className="tool-icon" />
              <img src="/images/canva.svg" alt="Canva / Motion" className="tool-icon" />
              <span>Video & Motion VFX</span>
            </div>

            <div className="tool-chip tool-chip-3" title="UI/UX & Content Strategy">
              <img src="/images/figma.svg" alt="Figma" className="tool-icon" />
              <img src="/images/aigen.svg" alt="AI Gen" className="tool-icon" />
              <span>UI/UX & Content Strategy</span>
            </div>
          </div>

          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Designer</div>
              <div className="landing-h2-2">Editor</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Editor</div>
              <div className="landing-h2-info-1">Designer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;



