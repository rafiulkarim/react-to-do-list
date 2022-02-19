import React, {useState, useEffect} from 'react'
import List from './components/List'
import Alert from './components/Alert'

function App() {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alter, setAlert] = useState({show: false, msg: '', type: ''});

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, 'danger', 'please enter value')
        } else if (name && isEditing) {
            setList(list.map((item)=>{
                if(item.id === editID){
                    return {...item, title: name}
                }
                return item
            }))
            setName('');
            setEditID(null);
            setIsEditing(false);
            showAlert(true, 'success', 'value changed');
        } else {
            const newItem = {id: new Date().getTime().toString(), title: name}
            showAlert(true, 'success', 'Item added');
            setList([...list, newItem]);
            setName('');
        }
    }

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({show, type, msg});
    }

    const handelClear = () =>{
        showAlert(true, 'danger', 'All item deleted');
        setList([]);
    }

    // useEffect(()=>{
    //     const timeOut = setTimeout(()=>{
    //         showAlert();
    //     }, 3000);
    //     return () => clearTimeout(timeOut);
    // }, []);

    const removeItem = (id) =>{
        showAlert(true, 'danger', 'Item removed');
        setList(list.filter((item)=>item.id !== id));
    }

    const editItem = (id) => {
      const specificItem = list.find((item)=>item.id === id);
      setIsEditing(true);
      setEditID(id);
      setName(specificItem.title);
    }

    return <section className='section-center'>
        <form className='grocery-form' onSubmit={handelSubmit}>
            {alter.show && <Alert {...alter} removeAlter={showAlert} list={list} />}
            <h3>To-Do List</h3>
            <div className='form-control'>
                <input type="text" className='grocery' value={name} onChange={(e) => setName(e.target.value)}
                       placeholder='e.g. egg'/>
                <button type='submit' className='submit-btn'>
                    {isEditing ? 'edit' : 'submit'}
                </button>
            </div>
        </form>
        {
            list.length > 0 &&
            <div className='grocery-container'>
                <List items={list} removeItem={removeItem} editItem={editItem}/>
                <button className='clear-btn' onClick={handelClear}>clear items</button>
            </div>
        }
    </section>
}

export default App