import './Base.css';
import NavBar from "../utils/NavBar/NavBar";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Notification } from '../utils/Notification/Notification';
import { useEffect } from 'react';
import Dialog from '../dialog/Dialog';

function Base() {
    const notification = useSelector((state: any) => {
        return state.notification;
    });
    useEffect(() => {
    }, []);
    return (
        <div>
            <NavBar/>
            <Notification config={
                {
                    url: notification.url,
                    topic: notification.topic
                }
            }>
            <div className='stickyDiv'>
                <Outlet />
                <Dialog />
            </div>
            </Notification>
        </div>
    );
}

export default Base;