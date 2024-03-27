import React from 'react';
import './Notification.css';
import avatar from '../Images/user-avatar.svg';
import icon1 from '../Images/icon-1.svg';
import icon3 from '../Images/icon-2.svg';
import icon2 from '../Images/icon-3.svg';

function NotificationItem({ children}) {
    return (
        <div className="notification-item">
          <span className="notification-dot"></span>
        <img src={avatar} alt="Avatar" className="avatar-image" />
        {children}
      </div>
    );
  }
  
  function Notifications() {
    const notifications = [
      { id: 1, name: 'Micheal James', action: 'You have submitted your request.', time: '11 hours ago', type: 'Task List' },
      { id: 1, name: 'Micheal James', action: 'You have submitted your request.', time: '11 hours ago', type: 'Task List' },
      { id: 1, name: 'Micheal James', action: 'You have submitted your request.', time: '11 hours ago', type: 'Task List' }
    ];
  
    return (
      <div className="notifications-page">
        <div className="inbox-header">
                <nav className="navbar">
                  <div className="navbar-right">
                    <div className="nav-item1">
                        <span className="nav-link">Inbox </span>
                        <span className="nav-notification-count">2</span>
                    </div>

                    <div className="nav-item">
                        <span className="nav-link">Archived</span>
                    </div>

                    <div className="nav-item">
                        <span className="nav-link">All</span>
                    </div>

                    <div className="nav-item">
                        <span className="interrogation-icon"><img src={icon1} alt="interrogation" className="icon1" /></span>
                    </div>

                  </div>
 
                  <div className="navbar-left">

                    <div className="nav-item">
                      <span className="menu-icon"><img src={icon2} alt="menu" className="icon3" /></span>
                    </div>

                    <div className="nav-item"> 
                      <span className="settings-icon"><img src={icon3} alt="settings" className="icon2" /></span>
                    </div>
                  </div>
                </nav>
        </div>
    
        <div classname="buttons">

         <button className="mark-read">Mark All As Read</button>
          <button className="archive-read">Archive Read</button>

        </div>


        <div className="notifications-list">
          {notifications.map(notification => (
            <NotificationItem key={notification.id}>
              <div className="notification-content">
                <div className="notification-name-action">
                <span className="notification-name">{notification.name}</span>
                <span className="notification-action">{notification.action}</span>
                </div>

                <div className="notification-time-type">
                <span className="notification-time">{notification.time}</span>
                <span className="notification-type">{notification.type}</span>
                </div>
              </div>
            </NotificationItem>
          ))}
        </div>
      </div>
    );
  }
  
  export default Notifications;