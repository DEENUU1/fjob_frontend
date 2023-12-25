'use client'

import React, {useState} from "react";
import {toast} from "react-toastify";


export default function PatchUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const updateProfile = async () => {
        try {
            const data = {
                first_name: firstName,
                last_name: lastName,
            };

            const response = await fetch('http://localhost:8000/api/users/me/', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsLoading(false);
            } else {
                toast.error('Error updating data');
            }
        } catch (error) {
            toast.error('Error updating data');
        }
    };

    return (
        <div>
            <label>First Name:</label>
            <input
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                required
                onChange={(event) => setFirstName(event.target.value)}
            />

            <label>Last Name:</label>
            <input
                type="text"
                value={lastName}
                placeholder="Enter your last name"
                required
                onChange={(event) => setLastName(event.target.value)}
            />

            <button onClick={updateProfile} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
        </div>
    );
};
