import { useEffect } from "react";
import { useDispatch } from "react-redux";

import 'react-simple-keyboard/build/css/index.css';
import { keyboardF } from "../../../store";
import { TextField } from "../../../ui-kit/components/TextField/TextField";
import './Input.css';
export const Input = (props: any) => {
    const dispatch = useDispatch();

    const onFocus = async (e: any) => {
      console.log(e);
      setTimeout(() => {
        dispatch(keyboardF.setKeyboard({
            keyboard: true,
            props: props
        }));
      }, 100);
      setTimeout(() => {
        window.scrollTo(0, e.target.getBoundingClientRect().top);
      }, 200);
    }

    useEffect(() => {
        function clickHanlder(e: any) {
          if (!(e.target.nodeName === "INPUT") &&
            !e.target.classList.contains("hg-button")
          ) {
            dispatch(keyboardF.setKeyboard({
              keyboard: false,
              props: {}
          }));
          }
        }
    
        window.addEventListener("click", clickHanlder);
        return window.removeEventListener("click", clickHanlder, true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div>
          <TextField InputProps={{ style: { height: "50px" } }} InputLabelProps={{ style: { fontSize: 15 } }} onFocus={onFocus} {...props} variant="outlined" />
        </div>
    )
}