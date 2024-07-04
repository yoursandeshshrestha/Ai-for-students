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
                <span>
                  AI can make mistakes, please verify the important info.
                </span>
              </p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("What is artificial intelligence (AI)?")
                }
              >
                <p>What is artificial intelligence (AI)?</p>
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("Why is AI getting so popular?")}
              >
                <p>Why is AI getting so popular?</p>
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("How long has AI been around?")}
              >
                <p>How long has AI been around?</p>
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("How to learn AI?")}
              >
                <p>How to learn AI?</p>
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("Can AI be dangerous?")}
              >
                <p>Can AI be dangerous?</p>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Can AI have consciousness or emotions?")
                }
              >
                <p>Can AI have consciousness or emotions?</p>
              </div>
              <div
                className="card"
                onClick={() => handleCardClick("What are the benefits of AI?")}
              >
                <p>What are the benefits of AI?</p>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "What are the risks of AI replacing human jobs?"
                  )
                }
              >
                <p>What are the risks of AI replacing human jobs?</p>
              </div>
            </div>
          </>
        )}

        {showResult && (
          <div className="result">
            <div className="result-title">
              <p className="recent-prompt">{recentPrompt}</p>
            </div>
            <div className="result-data">
              {loading ? (
                <div className="loader">
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
              onKeyPress={handleKeyPress}
              value={input}
              type="text"
              placeholder="Insert your query here."
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
          <p className="bottom-info">Made with ❤️ by Sandesh Shrestha</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
