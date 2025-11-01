import "./style.css";

export const BorderContainer = () => {
  return (
    <div id="border-container">
      <div className="corner top-right" />
      <div className="corner top-left" />
      <div className="corner bottom-left" />
      <div className="corner bottom-right" />
    </div>
  );
};
