import { memo, useContext } from 'react';
import './TodoItem.css'
import { TodoDispatchContext } from '../App';

const TodoItem = ({ id, isDone, content, date }) => {
    const { onUpdate, onDelete } = useContext(TodoDispatchContext);
    console.log("TodoItem 렌더링!");
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDeleteButton = () => {
        onDelete(id);
    };

    return (
        <div className='TodoItem'>
            <input readOnly checked={isDone} type="checkbox" onChange={onChangeCheckbox} />
            <div className='content'>{content}</div>
            <div className='date'>{date}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    );
}

export default memo(TodoItem);

// export default memo(TodoItem, (prevProps, nextProps) => {
//     if (prevProps.id !== nextProps.id) return false;
//     if (prevProps.isDone !== nextProps.isDone) return false;
//     if (prevProps.content !== nextProps.content) return false;
//     if (prevProps.date !== nextProps.date) return false;
//     return true;
// });