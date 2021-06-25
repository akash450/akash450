import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import useInterval from "./useInterval";

enum Colors {
  RED = 1,
  GREEN = 2,
  BLUE = 3,
}

var level = 0
let initialColor = Colors.RED;
let initObstacleColor = Math.ceil(Math.random() * 3);
const canvasX = 1500;
const canvasY = 1500;
const scale = 50;
let hole = 20;
const initialFlappy = [
  [4, 10],
  [4, 10],
];
const initialObstacle = [
  [canvasX / scale - 1, 0],
  [canvasX / scale - 1, 0],
];
var timeDelay = 300;

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flappy, setFlappy] = useState(initialFlappy);
  const [flappyColor, setFlappyColor] = useState(initialColor);
  const [obstacleColor, setObstacleColor] = useState(initObstacleColor);
  const [obstacle, setObstacle] = useState(initialObstacle);
  const [obDir, setObDir] = useState([0, -1]);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        /* render obstacle */
        if (obstacleColor === Colors.RED) {
          ctx.fillStyle = "red";
        } else if (obstacleColor === Colors.GREEN) {
          ctx.fillStyle = "green";
        } else {
          ctx.fillStyle = "blue";
        }
        obstacle.forEach(([obX, obY]) => {
          ctx.fillRect(obX, obY, 1, canvasY / scale);
          ctx.clearRect(obX, hole, 4, 4);
        });
        /* render flappy */
        if (flappyColor === Colors.RED) {
          ctx.fillStyle = "red";
        } else if (flappyColor === Colors.GREEN) {
          ctx.fillStyle = "green";
        } else {
          ctx.fillStyle = "blue";
        }
        ctx.fillRect(flappy[0][0], flappy[0][1], 2, 1);
      }
    }
  }, [flappy, flappyColor, obstacle, obstacleColor, gameOver]);

  function handleSetScore() {
    if (score > Number(localStorage.getItem("score"))) {
      localStorage.setItem("score", JSON.stringify(score));
    }
  }

  function play() {
    /* set flappy */
    setFlappy(initialFlappy);
    setDirection([0, 1]);
    setFlappyColor(initialColor);
    /* set obstacle */
    setObstacleColor(initObstacleColor);
    setObstacle(initialObstacle);
    setObDir([-1, 0]);
    /* set delay */
    setDelay(timeDelay);
    /* set score */
    setScore(0);
    /* still playing */
    setGameOver(false);
  }

  function checkCollide(head: number[]) {
    if (!(head[1] === hole + 1 || head[1] === hole + 2)) {
      return true;
    }
    return false;
  }

  function runGame() {
    const newFlappy = [...flappy];
    const newFlappyHead = [
      newFlappy[0][0] + direction[0],
      newFlappy[0][1] + direction[1],
    ];
    const obstacleMove = [...obstacle];
    const newObstaclePos = [
      obstacleMove[0][0] + obDir[0],
      obstacleMove[0][1] + obDir[1],
    ];
    newFlappy.unshift(newFlappyHead);
    obstacleMove.unshift(newObstaclePos);
    console.log(newObstaclePos[0])
    console.log(newFlappyHead[0])
    /* the pipe is out of sight so you don't see the change */
    if (newObstaclePos[0] === -2) {
      newObstaclePos[0] = 29;
      let newColor = Math.ceil(Math.random() * 3);
      setObstacleColor(newColor);
      hole = Math.floor((Math.random() * canvasY) / scale);
    }
    /* if flappy coord and (obstacle coord - 1) are same */
    if (newFlappyHead[0] === newObstaclePos[0] - 2) {
      if (checkCollide(newFlappyHead) || (flappyColor !== obstacleColor) ||
      (newFlappyHead[1] === 0) || (newFlappyHead[1] === canvasY/scale - 1)) {
        endGame();
      } else {
        /* flappy has to fully pass through pipe to increase score */
        setScore(score + 1);
        if (score % 3 === 0) {
          level += 1
          timeDelay -= 10
          setDelay(timeDelay)
        } if (level > 25) {
          setDelay(timeDelay)
        }
      }
    }
    /* if flappy coord crosses over obstacle coord (flappy coord = (obstacle coord - 1) + 1) */
    if (newFlappyHead[0] === newObstaclePos[0]) {
      if (checkCollide(newFlappyHead) || (flappyColor !== obstacleColor)) {
        endGame();
      }
    }
    newFlappy.pop();
    setFlappy(newFlappy);
    obstacleMove.pop();
    setObstacle(obstacleMove);
  }

  function endGame() {
    setDelay(null);
    setGameOver(true);
    handleSetScore();
  }

  function changeDirectionAndColor(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
      case "ArrowRight":
        setFlappyColor(((flappyColor + 1) % 3) + 1);
        break;
    }
  }

  return (
    <div id="main" onKeyDown={(e) => changeDirectionAndColor(e)}>
      <div className="instructionsContainer">
        <div className="instructionsBox">
          <h1>Instructions</h1>
          <strong>
            Pass through as many pipes as you can. But remember, you have to be the
            same colour to pass through! Change colour using the "right" arrow key and change
            direction using "up and down" arrow keys.
          </strong>
        </div>
      </div>
      <div className="scoreContainer">
        <div className="scoreBox">
          <h3>Score: {score}</h3>
          <h3>High Score: {localStorage.getItem("score")}</h3>
        </div>
      </div>
      <div className="gameover-container">
        {gameOver && <div className="gameOver"><strong>Game Over</strong></div>}
      </div>
      <div className="canvasContainer">
        <canvas
          className="playArea"
          ref={canvasRef}
          width={`${canvasX}px`}
          height={`${canvasY}px`}
        />
      </div>
      <div className="buttonContainer">
        <button onClick={play} className="playButton">
          Play
        </button>
      </div>
    </div>
  );
}

export default App;
