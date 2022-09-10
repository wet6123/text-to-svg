import logo from "./logo.svg";
import "./App.css";
import { load } from "opentype.js";
import font2 from "./font/BlackHanSans.woff";
import font1 from "./font/NanumGothic.woff";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [textLen, setTextLen] = useState(0);
  const [font, setFont] = useState(font1);

  const onChangeHandler = (e) => {
    console.log(e.currentTarget.value);
    setFont(e.currentTarget.value);
  };

  const onChange = (e) => {
    setText(e.target.value);
    setTextLen(e.target.value.length * 900);
  };

  const onReset = () => {
    setText("");
    setTextLen(0);
  };

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("clear canvas");

    load(font, (err, font) => {
      console.log(text);
      if (err) {
        alert("Font could not be loaded: " + err);
      } else {
        const glyphs = font.stringToGlyphs(text);
        // console.log(glyphs);
        for (let i = 0; i < glyphs.length; i++) {
          // for (let i = 0; i < 1; i++) {
          // console.log(glyphs[i].path.commands);
          for (let j = 0; j < glyphs[i].path.commands.length; j++) {
            const command = glyphs[i].path.commands[j];
            draw(ctx, command, i);
          }
        }
      }

      // const svg = document.getElementById("canvas");
      // const warp = new Warp(svg);

      // warp.interpolate(4);
      // warp.transform(([x, y]) => [x, y, y]);

      // let offset = 0;
      // function animate() {
      //   warp.transform(([x, y, oy]) => [
      //     x,
      //     oy + 4 * Math.sin(x / 16 + offset),
      //     oy,
      //   ]);
      //   offset += 0.1;
      //   requestAnimationFrame(animate);
      // }

      // animate();
    });
  }, [text, font]);

  const draw = (ctx, command, order) => {
    console.log("draw ");
    // console.log(command);
    ctx.lineWidth = 20;
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
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <select onChange={onChangeHandler} value={font}>
        <option value="" disabled selected>
          menu
        </option>
        <option value={font1}>font1</option>
        <option value={font2}>font2</option>
      </select>
      <div>
        <b> 값 : {text}</b>
      </div>
      <div>
        <b> 값 : {textLen}</b>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <canvas id="canvas" width={textLen} height="1100"></canvas>
    </div>
  );
}

export default App;
