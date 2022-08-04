import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import 'react-simple-keyboard/build/css/index.css';
import { keyboardF } from "../../../store";
import './Input.css';
export const Input = (props: any) => {
    const keyboardSave = useRef();
    const dispatch = useDispatch();

    const onFocus = async (e: any) => {
      console.log(e.target.offsetTop);
      setTimeout(() => {
        dispatch(keyboardF.setKeyboard({
            keyboard: true,
            props: props
        }));
      }, 100);
      setTimeout(() => {
        window.scrollTo(0, e.target.offsetTop);
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
      }, []);

    return (
        <div>
            <input onFocus={onFocus} {...props} />
        </div>
    )
}