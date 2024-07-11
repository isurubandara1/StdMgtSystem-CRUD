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
        if (newName && newEmail) {
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
                <button onClick={addStudent}>Add Student</button>
            </div>
            <div className="students-list">
                <h2>Students List</h2>
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            {student.name} ({student.email})
                            <button onClick={() => updateStudent(student.id)}>Edit</button>
                            <button onClick={() => deleteStudent(student.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
