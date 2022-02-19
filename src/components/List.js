import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = (props) => {

    return <div className='grocery-list'>
        {
            props.items.map((item)=>{
                return <article key={item.id} className='grocery-item'>
                    <p className='title'>{item.title}</p>
                    <div className='btn-container'>
                        <button className='edit-btn' type='button' onClick={()=>props.editItem(item.id)}>
                            <FaEdit/>
                        </button>
                        <button className='delete-btn' type='button' onClick={()=>props.removeItem(item.id)}>
                            <FaTrash/>
                        </button>
                    </div>
                </article>
            })
        }
    </div>
}

export default List