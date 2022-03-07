import React from "react";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import { Routes, Route } from "react-router-dom";
import TodoList from "./Components/TodoList";






const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TodoList/>} />
                <Route path="signup" element={<SignUpForm />} />
                <Route path="login" element={<LoginForm />} />
            </Routes>
            
        </>
    )
}

export default App