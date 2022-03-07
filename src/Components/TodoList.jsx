import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../Components/todo.css";
import { db } from "../firebaseconfig/firebase";

const TodoList = () => {
  const [inpVal, setinpVal] = useState("");
  const [todoS, settodoS] = useState([]);
  const collectRef = collection(db, "todos");
  const [eBtnToggle, seteBtnToggle] = useState(true);
  const [eBtnVal, seteBtnVal] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(collectRef);
      settodoS(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUser();
  }, []);



  // add todo

  const addtodo = async () => {
    
    if (!inpVal) {
      alert("Please Enter Some Values");
    } else if (inpVal && !eBtnToggle) {
      
      settodoS(
        
        todoS.map((val) => {
          
          if (val.id === eBtnVal) {
            return {
              ...val,
              name: inpVal,
            };
          }
          return val;
        })
      );
      seteBtnToggle(true);
      setinpVal("");
      seteBtnVal(null);
    } else {
      const allData = { id: new Date().getTime().toString(), name: inpVal };
      // console.log(allData);
      await addDoc(collectRef, allData);
      settodoS([...todoS, allData]);
      setinpVal("");
    }
  };

  // del todo
  

  const delTodo = async (ind) => {
    const userDoc = doc(db,"todos",ind)
    const del = todoS.filter((val) => {
      return ind !== val.id;
    });
    await deleteDoc(userDoc)
    settodoS(del);
  };

  // edit todo


  const editTodo = async (id) => {
    const userDoc = doc(db,"todos",id)
    let edit = todoS.find((val) => {
      console.log(val);
      return(val.id === id)
    });
    console.log(edit);
    await updateDoc(userDoc,edit,id)
    seteBtnToggle(false);
    setinpVal(edit.name);
    seteBtnVal(id);
  };
  // remove all
  
  const remtodo = () =>{
    
    settodoS([]);
  };

  return (
    <>
      <div className="container col-lg-5 col-md-6 col-sm-12">
        <div>
          <h1 className="text-center mt-3">Todo List</h1>
        </div>
        <div className="row mt-4">
          <div className="col">
            <div className="d-flex flex-wrap form-control  justify-content-between">
              <input
                className="myInput1 "
                placeholder="Enter Todo...✍ "
                value={inpVal}
                onChange={(e) => setinpVal(e.target.value)}
              />
              <div className="btnDiv">
                {eBtnToggle ? (
                  <i
                    onClick={addtodo}
                    className="fa-solid fa-circle-plus myBtn"
                  ></i>
                ) : (
                  <i
                    onClick={addtodo}
                    className="fa-solid fa-pen-to-square myBtn"
                  ></i>
                )}

                <i
                  onClick={remtodo}
                  className="fa-solid fa-trash-can myBtn"
                ></i>
              </div>
            </div>
            <div className="mt-5 text-capitalize text-break">
              {todoS.map((val) => {
                console.log(val);
                return (
                  <div
                    className="d-flex mt-2 flex-wrap form-control justify-content-between align-items-center"
                    key={val.id}
                  >
                    <h3>{val.name}</h3>
                    <div>
                      <i
                        onClick={() => {
                          delTodo(val.id);
                        }}
                        className="fa-solid fa-trash-can myBtn"
                      ></i>
                      <i
                        onClick={() => {
                          editTodo(val.id);
                        }}
                        className="fa-solid fa-pen-to-square myBtn"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
