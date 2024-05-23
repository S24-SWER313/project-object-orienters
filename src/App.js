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
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/posts-followers-following" element={<MainLayout><PostFollowersFollowingTabs /></MainLayout>} />
                <Route path="/profile" element={<MainLayout><ProfilePage 
                        name="Christian Buehner"
                        jobTitle="Photographer"
                        email="chris@buehner.com"
                        avatarImageUrl="https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        backgroundImage="https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1pYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        followers="15k"
                        following="20k"
                        posts="10"/></MainLayout>} />
                <Route path="*" element={<MainLayout><Header /><Footer /></MainLayout>} />
            </Routes>
        </Router>
    );
}

export default App;
