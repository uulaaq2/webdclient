import '../../node_modules/@primer/css/dist/primer.css'
import './style.css'
import React, { createContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'

import PublicHome from 'pages/public/home'
import SignIn from 'pages/signIn'
import SignOut from 'pages/signOut'
import ChangePassword from 'pages/public/changePassword'
import Settings from 'pages/protected/settings'
import Redirect from 'pages/redirect'

import ProtectedHome from 'pages/protected/home'

import Sites from 'pages/protected/sites'

const App = () => {
 
  return (
      <Router>

        <Routes>        
            <Route exact path="/signin" element={<SignIn />} />                    
            <Route exact path="/signout" element={<SignOut />} />                                
            <Route path="/me/changepassword/:token" element={<ChangePassword />} />     

            <Route 
              path="/public"
              element={
                <PublicRoute element={<PublicHome />} />
              }
            />

            <Route 
              path="/" 
              element={
                <PrivateRoute element={<ProtectedHome />} />
              }            
            />

            <Route exact path="/redirect" element={<Redirect />} />                                            

            <Route 
              path="/settings" 
              element={
                <PrivateRoute element={<Settings />} />
              }            
            />

            <Route 
              path="/settings/groups" 
              element={
                <PrivateRoute element={<Settings />} />
              }            
            />            
            <Route 
              path="/settings/departments" 
              element={
                <PrivateRoute element={<Settings />} />
              }            
            />            
            <Route 
              path="/settings/users" 
              element={
                <PrivateRoute element={<Settings />} />
              }            
            />            


            <Route 
              path="/sites" 
              element={
                <PrivateRoute element={<Sites />} />
              }            
            />

            
        </Routes>

      </Router>
  );
};

export default App;