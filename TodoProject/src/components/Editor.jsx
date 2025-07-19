import { useContext, useRef, useState } from 'react';
import './Editor.css';
import { TodoDispatchContext } from '../App';


const Editor = () => {
    const { onCreate } = useContext(TodoDispatchContext);
    const [content, setContnet] = useState("");
    const inputRef = useRef();

    const onChangeContent = (e) => {
        setContnet(e.target.value);
    };

    const onSubmit = () => {
        if (content === "") {
            inputRef.current.focus();
            return;
        }

        onCreate(content);
        setContnet("");
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    };


    return (
        <div className='Editor'>
            <input placeholder='새로운 Todo...' ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown} />
            <button onClick={onSubmit}>추가</button>
        </div>
    );
};

export default Editor;