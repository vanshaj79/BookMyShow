import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { hideLoading, showLoading } from "../redux/loaderSlice.js"
import { setUser } from "../redux/userSlice.js"
import { message } from "antd"
import { GetCurrentUser } from '../apicalls/users';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users).user;
    
    const getCurrentUser = async () => {
        try {
            // show loader
            dispatch(showLoading())
            // make API call to get current user
            const response = await GetCurrentUser();
            console.log(response,"helo")
            // hide loader
            dispatch(hideLoading())
            if(response.success) {          
                // dispatch current user to usersReducer 
                dispatch(setUser(response.data))
            } else {
                // dispatch null to usersReducer
                dispatch(setUser(null))
                // show some error message
                message.error(response.message)
                // delete token from localstorage
                localStorage.removeItem("token")
                // redirect to login page
                navigate("/login")
            }
        } catch (error) {
            // hide loader
            dispatch(hideLoading())
            // dispatch null to usersReducer
            dispatch(setUser(null))
            // show error
            message.error(error)
            // redirect to login page
            navigate("/login")
        }        
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            // get current user and set it in store
            //console.log(localStorage.getItem("token"),"token")
            getCurrentUser();
        } else {
            navigate("/login")
        }
    }, [])

    return (
        user && 
        (
          <div className="layout p-1">
            <div className="header bg-primary flex justify-between p-2">
              <div>
                <h1 className="text-2xl text-white cursor-pointer"
                  onClick={() => navigate("/")}
                >Book My Show</h1>
              </div>
    
              <div className="bg-white p-1 flex gap-1">
                <i className="fa-solid fa-shield text-primary mt-1"></i>
                <h1
                  className="text-sm underline"
                  onClick={() => {
                    if (user.isAdmin) {
                      navigate("/admin");
                    } else {
                      navigate("/profile");
                    }
                  }}
                >
                  {user.name}
                </h1>
                <i className="fa-solid fa-right-from-bracket mt-1"
                    onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                ></i>
              </div>
            </div>
            <div className="content mt-1 p-1">{children}</div>
          </div>
        )
      );
}

export default ProtectedRoute