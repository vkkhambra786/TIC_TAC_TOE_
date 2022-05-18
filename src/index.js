import ReactDOM from "react-dom";
import React from "react";
import "./index.css";

function getGameStatus(squares) {
  let winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winCombs.length; i++) {
    let winComb = winCombs[i];
    let s1 = winComb[0];
    let s2 = winComb[1];
    let s3 = winComb[2];

    if (
      squares[s1] != null &&
      squares[s1] == squares[s2] &&
      squares[s2] == squares[s3]
    ) {
      return squares[s1];
    }
  }
  return null;
}

class Board extends React.Component {
  handleBoxClick(i) {
    this.props.handlerForBoxClick(i);
  }

  renderSquare(i) {
    return (
      <button onClick={() => this.handleBoxClick(i)}>
        {this.props.boxes[i] == null ? "" : this.props.boxes[i]}
      </button>
    );
  }

  render() {
    return (
      <div className="board">
        <div className="title">Tic Tac Toe</div>
        <div className="content">
          <div className="ttt">
            <div className="row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  moveHistory(i) {
    this.props.handleForHistory(i);
  }

  render() {
    //     // let gameStatus = "Next Move For X";
    //     let gameTitle;
    //     if (this.props.gameStatus == null) {
    //       gameTitle =
    //         "Next Move For " + (this.props.stepNumber % 2 === 0 ? "X" : "O");
    //     } else {
    //       if (this.props.gameStatus == " Draw") {
    //         gameTitle = "It is a Draw";
    //       } else {
    //         gameTitle = this.props.gameStatus + " Wins";
    //       }
    //     }

    let gameTitle;

    if (this.props.gameStatus == null) {
      gameTitle =
        "Next Move For " + (this.props.stepNumber % 2 == 0 ? "X" : "O");
    } else {
      if (this.props.gameStatus == " Draw") {
        gameTitle = "It is a Draw";
      } else {
        gameTitle = this.props.gameStatus + " Wins";
      }
    }

    //else {
    // gameTitle = this.props.stepNumber % 2 == 0 ? "O Wins" : "X Wins";
    //}

    let buttons = [];
    for (let i = 0; i <= this.props.stepNumber; i++) {
      let button = null;

      if (i == 0) {
        button = (
          <button key={i} onClick={() => this.moveHistory(i)}>
            Go to Start
          </button>
        );
      } else {
        button = (
          <button key={i} onClick={() => this.moveHistory(i)}>
            Go to step number {i}
          </button>
        );
      }

      buttons.push(button);
    }

    return (
      <div className="display">
        <div className="title">{gameTitle}</div>
        <div className="content">
          <div className="history">{buttons}</div>
        </div>
      </div>
    );
  }
}

class TTT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [[null, null, null, null, null, null, null, null, null]],
      stepNumber: 0,
      gameStatus: null,
    };
  }

  handleSquareClick(i) {
    let oldHistory = this.state.history.slice();
    let currentSquares = oldHistory[oldHistory.length - 1].slice();

    if (currentSquares[i] != null || this.state.gameStatus != null) {
      return;
    }

    currentSquares[i] = this.state.stepNumber % 2 == 0 ? "X" : "O";
    oldHistory.push(currentSquares);

    let newGameStatus = getGameStatus(currentSquares);

    //    let newGameStatus = getGameStatus(currentOfsquares);

    if (this.state.stepNumber === 8 && newGameStatus === null) {
      newGameStatus = " Draw";
    }
    this.setState({
      history: oldHistory,
      stepNumber: this.state.stepNumber + 1,
      gameStatus: newGameStatus,
    });
  }

  moveToStep(i) {
    let oldHistory = this.state.history.slice(0, i + 1);
    let currentSquares = oldHistory[oldHistory.length - 1];
    let newGameStatus = getGameStatus(currentSquares);

    this.setState({
      history: oldHistory,
      stepNumber: i,
      gameStatus: newGameStatus,
    });
  }

  render() {
    let squares = this.state.history[this.state.history.length - 1];

    return (
      <React.Fragment>
        <Board
          handlerForBoxClick={(i) => this.handleSquareClick(i)}
          boxes={squares}
        />
        <Display
          stepNumber={this.state.stepNumber}
          gameStatus={this.state.gameStatus}
          handleForHistory={(i) => this.moveToStep(i)}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<TTT />, document.getElementById("root"));

//-------------------------------------------------

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";

// function getGameStatus(squares) {
//   let winCombs = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < winCombs.length; i++) {
//     let winComb = winCombs[i];
//     let s1 = winComb[0];
//     let s2 = winComb[1];
//     let s3 = winComb[2];
//     if (
//       squares[s1] != null &&
//       squares[s1] === squares[s2] &&
//       squares[s2] === squares[s3]
//     ) {
//       return squares[s1];
//     }
//   }
//   return null;
// }
// class Board extends React.Component {
//   handleBoxClick(i) {
//     this.props.handlerForBoxClick(i);
//   }
//   renderSquare(i) {
//     return (
//       <button onClick={() => this.handleBoxClick(i)}>
//         {this.props.boxes[i] == null ? "" : this.props.boxes[i]}
//       </button>
//     );
//   }
//   render() {
//     return (
//       <div className="board">
//         <div className="title">TIC_TAC_TOE</div>
//         <div className="content">
//           <div className="ttt">
//             <div className="row">
//               {this.renderSquare(0)}
//               {this.renderSquare(1)}
//               {this.renderSquare(2)}
//             </div>
//             <div className="row">
//               {this.renderSquare(3)}
//               {this.renderSquare(4)}
//               {this.renderSquare(5)}
//             </div>
//             <div className="row">
//               {this.renderSquare(6)}
//               {this.renderSquare(7)}
//               {this.renderSquare(8)}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// class Display extends React.Component {
//   moveHistory(i) {
//     this.props.handlerForHistory(i);
//   }
//   render() {
//     // let gameStatus = "Next Move For X";
//     let gameTitle;
//     if (this.props.gameStatus == null) {
//       gameTitle =
//         "Next Move For " + (this.props.stepNumber % 2 === 0 ? "X" : "O");
//     } else {
//       if (this.props.gameStatus == " Draw") {
//         gameTitle = "It is a Draw";
//       } else {
//         gameTitle = this.props.gameStatus + " Wins";
//       }
//     }

//     let buttons = [];
//     for (var i = 0; i <= this.props.stepNumber; i++) {
//       let button;
//       if (i === 0) {
//         button = (
//           <button key={i} onClick={(i) => this.moveHistory(i)}>
//             Go To Start
//           </button>
//         );
//       } else {
//         button = (
//           <button key={i} onClick={(i) => this.moveHistory(i)}>
//             Go to Step number{i}
//           </button>
//         );
//       }
//       buttons.push(button);
//     }
//     return (
//       <div className="display">
//         <div className="title">{gameTitle}</div>
//         <div className="content">
//           <div className="history">{buttons}</div>
//         </div>
//       </div>
//     );
//   }
// }

// class TTT extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [[null, null, null, null, null, null, null, null, null]],
//       stepNumber: 0,
//       gameStatus: null,
//     };
//   }
//   handleSquareClick(i) {
//     //alert(i);
//     let oldHistory = this.state.history.slice();
//     let currentOfsquares = oldHistory[oldHistory.length - 1].slice();

//     if (currentOfsquares[i] != null || this.state.gameStatus != null) {
//       return;
//     }

//     currentOfsquares[i] = this.state.stepNumber % 2 === 0 ? "X" : "O";
//     oldHistory.push(currentOfsquares);

//     let newGameStatus = getGameStatus(currentOfsquares);

//     if (this.state.stepNumber === 8 && newGameStatus === null) {
//       newGameStatus = " Draw";
//     }
//     this.setState({
//       history: oldHistory,
//       stepNumber: this.state.stepNumber + 1,
//       gameStatus: newGameStatus,
//     });
//   }

//   moveToStep(i) {
//     let oldHistory = this.state.history.slice(0, i + 1);

//     let currentOfsquares = oldHistory[oldHistory.length - 1];
//     let newGameStatus = getGameStatus(currentOfsquares);
//     this.setState({
//       history: oldHistory,
//       stepNumber: i,
//       gameStatus: newGameStatus,
//     });
//   }
//   render() {
//     let squares = this.state.history[this.state.history.length - 1];
//     //var name = "Hello TIC_TAC_TEO";
//     //<h1>{name}</h1>
//     return (
//       <React.Fragment>
//         <Board
//           handlerForBoxClick={(i) => this.handleSquareClick(i)}
//           boxes={squares}
//         />
//         <Display
//           stepNumber={this.state.stepNumber}
//           getGameStatus={this.state.gameStatus}
//           gameStatus={this.state.gameStatus}
//           handlerForHistory={(i) => this.moveToStep(i)}
//         />
//       </React.Fragment>
//     );
//   }
// }

// ReactDOM.render(<TTT />, document.getElementById("root"));
