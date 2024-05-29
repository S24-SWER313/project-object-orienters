import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Landing from './components/landing';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import ProfilePage from './components/ProfilePage';
import PostFollowersFollowingTabs from './components/PostFollowersFollowingTabs';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './components/EditProfile';
import "./style.css";
import TrendPage from './components/Trend/TrendPage';
import ChatApp from './components/Messages/ChatApp';
//import OAuthRedirect from './components/OAuthRedirect';


function App() {
    return (

        <Router>
            <AuthProvider>
                <Routes>

                    {/* <Route path="/" element={<EditProfile />} /> */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/messages" element={<ChatApp/>} />
                    {/* <Route path="/oauth2/redirect" element={<OAuthRedirect />} /> */}


                    <Route element={<PrivateRoute />}>

                        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
                        <Route path="/posts-followers-following" element={<MainLayout><PostFollowersFollowingTabs /></MainLayout>} />
                        <Route path="/profiles/:profile" element={<MainLayout><ProfilePage /></MainLayout>} />
                        <Route path="/trends/:value" element={<MainLayout><TrendPage /></MainLayout>} />

                        <Route path="*" element={<MainLayout></MainLayout>} />
                    </Route>


                </Routes>
            </AuthProvider>
        </Router>
    );
}


export default App;
