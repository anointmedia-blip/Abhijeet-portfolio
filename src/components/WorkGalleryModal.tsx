import React, { useEffect, useState, useRef } from "react";
import {
  MdClose,
  MdChevronLeft,
  MdChevronRight,
  MdGridView,
  MdViewCarousel,
  MdCollections,
  MdPlayCircleFilled,
} from "react-icons/md";
import "./styles/WorkGalleryModal.css";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  title?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  tools: string;
  image: string;
  gallery: GalleryItem[];
}

interface WorkGalleryModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const WorkGalleryModal: React.FC<WorkGalleryModalProps> = ({
  project,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"viewer" | "grid">("viewer");
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0);
    setViewMode("viewer");
  }, [project]);

  // Handle Keyboard navigation and lock body scroll
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % project.gallery.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex(
          (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
        );
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentItem = project.gallery[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % project.gallery.length);
  };

  return (
    <div
      className="gallery-backdrop"
      onClick={onClose}
      data-cursor="disable"
    >
      <div
        className="gallery-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="gallery-header">
          <div className="gallery-header-info">
            <div className="gallery-badge">
              <MdCollections /> {project.gallery.length} Media Assets
            </div>
            <h2>{project.title}</h2>
            <p>{project.category} • <span className="gallery-tools">{project.tools}</span></p>
          </div>

          <div className="gallery-header-actions">
            <button
              className={`gallery-view-btn ${viewMode === "viewer" ? "active" : ""}`}
              onClick={() => setViewMode("viewer")}
              title="Carousel / Focus View"
              data-cursor="disable"
            >
              <MdViewCarousel />
            </button>
            <button
              className={`gallery-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
              data-cursor="disable"
            >
              <MdGridView />
            </button>
            <button
              className="gallery-close-btn"
              onClick={onClose}
              title="Close Gallery (Esc)"
              data-cursor="disable"
            >
              <MdClose />
            </button>
          </div>
        </div>

        {/* View Mode: Viewer / Carousel */}
        {viewMode === "viewer" ? (
          <div className="gallery-viewer-container">
            <div className="gallery-stage">
              {project.gallery.length > 1 && (
                <button
                  className="gallery-nav-btn prev"
                  onClick={handlePrev}
                  aria-label="Previous item"
                  data-cursor="disable"
                >
                  <MdChevronLeft />
                </button>
              )}

              <div className="gallery-media-wrapper">
                {currentItem.type === "video" ? (
                  <div className="gallery-video-holder">
                    <video
                      key={encodeURI(currentItem.src)}
                      ref={videoRef}
                      controls
                      autoPlay
                      playsInline
                      className="gallery-main-video"
                    >
                      <source src={encodeURI(currentItem.src)} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                ) : (
                  <div className="gallery-image-holder">
                    <img
                      src={encodeURI(currentItem.src)}
                      alt={currentItem.title || project.title}
                      className="gallery-main-image"
                    />
                  </div>
                )}

                {currentItem.title && (
                  <div className="gallery-caption">
                    <span>{currentIndex + 1} / {project.gallery.length}</span> — {currentItem.title}
                  </div>
                )}
              </div>

              {project.gallery.length > 1 && (
                <button
                  className="gallery-nav-btn next"
                  onClick={handleNext}
                  aria-label="Next item"
                  data-cursor="disable"
                >
                  <MdChevronRight />
                </button>
              )}
            </div>

            {/* Bottom Thumbnails Strip */}
            {project.gallery.length > 1 && (
              <div className="gallery-thumbs-strip">
                {project.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    className={`gallery-thumb ${idx === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                    data-cursor="disable"
                  >
                    {item.type === "video" ? (
                      <div className="gallery-thumb-video-icon">
                        <MdPlayCircleFilled />
                        <video
                          src={encodeURI(item.src)}
                          muted
                          preload="none"
                          poster={encodeURI(project.image)}
                        />
                      </div>
                    ) : (
                      <img src={encodeURI(item.src)} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                    )}
                    <span className="gallery-thumb-index">{idx + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* View Mode: Responsive Gallery Grid */
          <div className="gallery-grid-container">
            <div className="gallery-grid">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="gallery-grid-item"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode("viewer");
                  }}
                  data-cursor="disable"
                >
                  {item.type === "video" ? (
                    <div className="gallery-grid-video-wrap">
                      <video
                        src={encodeURI(item.src)}
                        muted
                        preload="none"
                        poster={encodeURI(project.image)}
                      />
                      <div className="gallery-grid-play-badge">
                        <MdPlayCircleFilled /> Video
                      </div>
                    </div>
                  ) : (
                    <img src={encodeURI(item.src)} alt={`Gallery item ${idx + 1}`} loading="lazy" />
                  )}
                  <div className="gallery-grid-overlay">
                    <span className="gallery-grid-number">#{idx + 1}</span>
                    <span className="gallery-grid-title">{item.title || `${project.title} #${idx + 1}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkGalleryModal;
