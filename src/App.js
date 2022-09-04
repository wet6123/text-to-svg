import logo from "./logo.svg";
import "./App.css";
import { load } from "opentype.js";
// import Roboto from "./font/BlackHanSans.woff";
import Roboto from "./font/NanumGothic.woff";
import { useEffect } from "react";

const text = "테스트중입니다.";
const textLen = text.length;

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    load(Roboto, (err, font) => {
      if (err) {
        alert("Font could not be loaded: " + err);
      } else {
        const glyphs = font.stringToGlyphs(text);
        console.log(glyphs);
        for (let i = 0; i < glyphs.length; i++) {
          // for (let i = 0; i < 1; i++) {
          console.log(glyphs[i].path.commands);
          for (let j = 0; j < glyphs[i].path.commands.length; j++) {
            const command = glyphs[i].path.commands[j];
            draw(ctx, command, i);
          }
        }
      }
    });
  }, []);

  const draw = (ctx, command, order) => {
    console.log("draw ");
    // console.log(command);
    if (command.type === "M") {
      ctx.beginPath();
      ctx.moveTo(command.x + 900 * order, 900 - command.y);
    } else if (command.type === "L") {
      ctx.lineTo(command.x + 900 * order, 900 - command.y);
    } else if (command.type === "Q") {
      ctx.quadraticCurveTo(
        command.x1 + 900 * order,
        900 - command.y1,
        command.x + 900 * order,
        900 - command.y
      );
    } else if (command.type === "Z") {
      ctx.stroke();
    } else {
      console.log("NO");
    }
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <canvas id="canvas" width={textLen * 900} height="1100"></canvas>
    </div>
  );
}

export default App;
