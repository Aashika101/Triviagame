
import React from 'react';
import { formatDate } from '../utils/date'; 

const ProfilePopup = ({ user, onClose }) => { 
    return (
        <div className="profile-modal">
            <div className="modal-content text-white">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Profile Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}</p>
                <p><strong>Last Login:</strong> {formatDate(user.lastLogin)}</p>
                <h3>Account Activity</h3>

            </div>
        </div>
    );
};

export default ProfilePopup;