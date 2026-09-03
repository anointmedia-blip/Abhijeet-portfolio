import { useState } from "react";
import { MdCollections, MdPlayCircleFilled, MdFullscreen } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  galleryCount?: number;
  hasVideos?: boolean;
  onClick?: () => void;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      setVideo(props.video);
    }
  };

  return (
    <div className="work-image" onClick={props.onClick}>
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        data-cursor="disable"
      >
        <div className="work-link" title="Open Portfolio Gallery">
          <MdFullscreen />
        </div>

        <div className="work-gallery-indicator">
          {props.hasVideos ? (
            <>
              <MdPlayCircleFilled /> Watch Videos
            </>
          ) : (
            <>
              <MdCollections /> {props.galleryCount ? `${props.galleryCount} Assets` : "View Gallery"}
            </>
          )}
        </div>

        <img src={encodeURI(props.image)} alt={props.alt} loading="lazy" />
        {isVideo && video && (
          <video
            src={encodeURI(video)}
            autoPlay
            muted
            playsInline
            loop
          />
        )}
      </div>
    </div>
  );
};

export default WorkImage;

