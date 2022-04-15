import { useLocation, useNavigate } from "react-router-dom";
const MusicPreview = (props) => {
  const location = useLocation();
  const song = location.state;

  const navigate = useNavigate();

  return (
    <div className="w-75 mx-auto mt-3">
      <div className="card text-center">
        <div className="card-header">
          <h4>{song.artistName}</h4>
        </div>
        <div className="card-body">
          <img src={song.artworkUrl100} width={100} alt={song.artistName} />
          <p className="mt-3">{song.trackName}</p>
          <div className="mt-3">
            {song.kind === "song" ? (
              <audio controls="controls" autoPlay="autoPlay">
                <source src={song.previewUrl} type="audio/mp4" />
              </audio>
            ) : (
              <video controls="controls" width={600} autoPlay="autoPlay">
                <source src={song.previewUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn-sm btn-outline-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back to Song List
          </button>
        </div>
      </div>
    </div>
  );
};
export default MusicPreview;
