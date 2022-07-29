import { useEffect, useState } from "react";
import Keyboard from "react-simple-keyboard"
import 'react-simple-keyboard/build/css/index.css';
import './Input.css';
export const Input = (props: any) => {
    const [keyboard, showKeyboard] = useState(false);
    console.log(props)
    const onChange = (input: String) => {
        props.setCustom(input);
    }

    const onFocus = () => {
        showKeyboard(true);
    }

    useEffect(() => {
        function clickHanlder(e: any) {
            console.log(e.target.nodeName);
          if (
            !(e.target.nodeName === "INPUT") &&
            !e.target.classList.contains("hg-button")
          ) {
            showKeyboard(false);
          }
        }
    
        window.addEventListener("click", clickHanlder);
        return window.removeEventListener("click", clickHanlder, true);
      }, []);

    return (
        <div >
            <input onFocus={onFocus} {...props} />
            {keyboard && <Keyboard className="keyboard" onChange={onChange}/>}
        </div>
    )
}