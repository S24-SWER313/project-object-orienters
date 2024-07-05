import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Landing from './components/landing';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import ProfilePage from './components/ProfilePage';
import PostFollowersFollowingTabs from './components/PostFollowersFollowingTabs';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import "./style.css";
import TrendPage from './components/Trend/TrendPage';
import ChatApp from './components/Messages/ChatApp';
import OAuthRedirect from './components/OAuthRedirect';
import OAuthLogin from './components/OAuthLogin';
import CodePage from './components/CodePage';
import NotFoundPage from './components/NotFoundPage';
import { SelectedCommentProvider } from './components/Comments/CommentsContext';
import ProfileSearchComponents from './components/ProfileSearchComponents';
import CompaniesCard from './components/CompaniesCard';
import CommentForm from './components/Commentss/CommentForm';
import Comment from './components/Commentss/Comment';




function App() {
    return (


        <Router>
            <AuthProvider>
                <SelectedCommentProvider>
                    <Routes>

                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />

                        <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
                        <Route path="/oauth2/login" element={<OAuthLogin />} />



                    <Route element={<PrivateRoute />}>
                        <Route path="/messages" element={<ChatApp />} />
                        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
                        <Route path="/profiles/:profile/posts-followers-following" element={<MainLayout><PostFollowersFollowingTabs /></MainLayout>} />
                        <Route path="/profiles/:profile" element={<MainLayout><ProfilePage /></MainLayout>} />
                        <Route path="/trends/:value" element={<MainLayout><TrendPage /></MainLayout>} />
                        <Route path="/code" element={<MainLayout><CodePage /></MainLayout>} />
                        <Route path="/messages/:profile" element={<ChatApp />} />


                            <Route path="*" element={<NotFoundPage />} />
                        </Route>


                    </Routes>
                </SelectedCommentProvider>
            </AuthProvider>
        </Router>
    );
}


export default App;