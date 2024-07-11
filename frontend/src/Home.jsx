// src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8081/students');
            setStudents(response.data);
        } catch (error) {
            console.error("There was an error fetching the students!", error);
        }
    };

    const addStudent = async () => {
        if (!name || !email) {
            alert("Please enter both name and email");
            return;
        }
        try {
            await axios.post('http://localhost:8081/students', { name, email });
            fetchStudents();
            setName('');
            setEmail('');
        } catch (error) {
            console.error("There was an error adding the student!", error);
        }
    };

    const updateStudent = async (id) => {
        const newName = prompt('Enter new name:');
        const newEmail = prompt('Enter new email:');
        if (newName || newEmail) {
            try {
                await axios.put(`http://localhost:8081/students/${id}`, { name: newName, email: newEmail });
                fetchStudents();
            } catch (error) {
                console.error("There was an error updating the student!", error);
            }
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/students/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("There was an error deleting the student!", error);
        }
    };

    return (
        <div className="Home">
            <h1>Student Management System</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="add-button" onClick={addStudent}>Add Student</button>
            </div>
            <div className="students-list">
                <h2>Students List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button className="edit-button" onClick={() => updateStudent(student.id)}>Edit</button>
                                    <button className="delete-button" onClick={() => deleteStudent(student.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
