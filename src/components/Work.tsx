import { useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import WorkGalleryModal, { ProjectData } from "./WorkGalleryModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdCollections, MdPlayCircleFilled } from "react-icons/md";

gsap.registerPlugin(useGSAP);

const projects: ProjectData[] = [
  {
    id: "social-media",
    title: "Social Media & Brand Creatives",
    category: "Social Media Management & Strategy",
    tools: "Canva, Adobe Photoshop, Content Strategy, Brand Campaigns, Analytics",
    image: "/images/social.png",
    gallery: [
      {
        type: "image",
        src: "/images/socia.jpeg",
        title: "Social Media Brand Campaign Strategy & Performance",
      },
      {
        type: "image",
        src: "/images/social.png",
        title: "Brand Engagement Posts & Content Creatives",
      },
    ],
  },
  {
    id: "ui-ux",
    title: "UI / UX Design & Prototypes",
    category: "User Interface & Experience Design",
    tools: "Figma, Interactive Prototyping, Wireframing, UX Research, Mobile App UI",
    image: "/images/UI-vs-UX.png",
    gallery: [
      {
        type: "video",
        src: "/images/ui (1).mp4",
        title: "Interactive Mobile UI & Motion Micro-Interactions",
      },
      {
        type: "video",
        src: "/images/ui (2).mp4",
        title: "App User Flow & Prototype Walkthrough",
      },
      {
        type: "image",
        src: "/images/UI-vs-UX.png",
        title: "UI vs UX Strategy & Structure",
      },
    ],
  },
  {
    id: "video-motion",
    title: "Video Editing & Motion Graphics",
    category: "Commercial Video Production & 3D VFX",
    tools: "Adobe Premiere Pro, After Effects, 3D Blender, Color Grading, Sound Design, Ai Gen Tools",
    image: "/images/vedio.png",
    gallery: [
      {
        type: "video",
        src: "/images/Motion graphic.mp4",
        title: "Commercial Motion Graphics & Title Animation Showreel",
      },
      {
        type: "video",
        src: "/images/Nova AI Smart Ring UI_UX Product Design Showreel by six2eight on Dribbble.mp4",
        title: "Nova AI Smart Ring UI/UX Product Design Showreel",
      },
      {
        type: "image",
        src: "/images/vedio.png",
        title: "Video Production Branding & Visuals",
      },
    ],
  },
  {
    id: "Packaging",
    title: "Packaging & Wraps Designs",
    category: "Product Packaging & Visual Identity",
    tools: "Adobe Illustrator, Photoshop, CorelDRAW, Label Printing, Wrap Designs",
    image: "/images/pack.png",
    gallery: [
      { type: "image", src: "/images/wrap (1).jpg", title: "Product Wrap Design #1" },
      { type: "image", src: "/images/wrap (2).jpg", title: "Product Wrap Design #2" },
      { type: "image", src: "/images/wrap (3).jpg", title: "Product Wrap Design #3" },
      { type: "image", src: "/images/wrap (4).jpg", title: "Product Wrap Design #4" },
      { type: "image", src: "/images/wrap (5).jpg", title: "Product Wrap Design #5" },
      { type: "image", src: "/images/wrap (6).jpg", title: "Product Wrap Design #6" },
      { type: "image", src: "/images/wrap (7).jpg", title: "Product Wrap Design #7" },
      { type: "image", src: "/images/wrap (8).jpg", title: "Product Wrap Design #8" },
      { type: "image", src: "/images/wrap (9).jpg", title: "Product Wrap Design #9" },
      { type: "image", src: "/images/wrap (10).jpg", title: "Product Wrap Design #10" },
      { type: "image", src: "/images/wrap (11).jpg", title: "Product Wrap Design #11" },
      { type: "image", src: "/images/wrap (12).jpg", title: "Product Wrap Design #12" },
      { type: "image", src: "/images/wrap (13).jpg", title: "Product Wrap Design #13" },
      { type: "image", src: "/images/wrap (14).jpg", title: "Product Wrap Design #14" },
      { type: "image", src: "/images/wrap (15).jpg", title: "Product Wrap Design #15" },
      { type: "image", src: "/images/wrap (16).jpg", title: "Product Wrap Design #16" },
      { type: "video", src: "/images/wrap design.mp4", title: "Product Wrap 3D Design Showcase Video" },
      { type: "image", src: "/images/pack.png", title: "Complete Packaging Box Kit" },
      { type: "image", src: "/images/jascolabs.jpg", title: "Jasco Labs Brand Identity" },
    ],
  },
];

const Work = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-flex">
            {projects.map((project, index) => {
              const hasVideos = project.gallery.some((g) => g.type === "video");
              return (
                <div
                  className="work-box"
                  key={project.id || index}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="work-info">
                    <div className="work-title">
                      <h3>0{index + 1}</h3>

                      <div>
                        <h4>{project.title}</h4>
                        <p>{project.category}</p>
                      </div>
                    </div>
                    <h4>Tools and features</h4>
                    <p>{project.tools}</p>

                    <button
                      className="work-open-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                      data-cursor="disable"
                    >
                      {hasVideos ? (
                        <>
                          <MdPlayCircleFilled /> Watch Videos & Showreel
                        </>
                      ) : (
                        <>
                          <MdCollections /> View Full Gallery ({project.gallery.length} Assets)
                        </>
                      )}
                    </button>
                  </div>

                  <WorkImage
                    image={project.image}
                    alt={project.title}
                    video={hasVideos ? project.gallery.find((g) => g.type === "video")?.src : undefined}
                    galleryCount={project.gallery.length}
                    hasVideos={hasVideos}
                    onClick={() => setActiveProject(project)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {activeProject && (
        <WorkGalleryModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
};

export default Work;

