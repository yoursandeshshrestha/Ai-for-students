import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Main() {
  const {
    onSent,
    setInput,
    input,
    recentPrompt,
    loading,
    resultData,
    showResult,
  } = useContext(Context);

  const handleCardClick = (question) => {
    setInput(question);
    onSent(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p></p>
        <p>Ai</p>
      </div>
      <div className="main-container">
        {!showResult && (
          <>
            <div className="greet">
              <p>
                <span>Hello,</span>
              </p>
              <p>Do you have any query?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Will Ai replace humans in jobs?")
                }
              >
                <p>Will Ai replace humans in jobs?</p>
                {/* <img src={assets.compass_icon} alt="compass icon" /> */}
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("Why is AI getting so popular?")}
              >
                <p>Why is AI getting so popular?</p>
                <img src={assets.bulb_icon} alt="bulb icon" />
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("Is AI dangerous to society?")}
              >
                <p>Is AI dangerous to society?</p>
                <img src={assets.message_icon} alt="message icon" />
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("How to learn AI?")}
              >
                <p>How to learn AI?</p>
                <img src={assets.code_icon} alt="code icon" />
              </div>
            </div>
          </>
        )}

        {/* Render result section only when showResult is true */}
        {showResult && (
          <div className="result">
            <div className="result-title">
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
              value={input}
              type="text"
              placeholder="Enter your query"
            />
            <div>
              {input ? (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt="send icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
