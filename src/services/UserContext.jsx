import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [exam, setExam] = useState([])
  const [create, setCrete] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          handleLogout(); // Manejar logout en caso de error de autorizaciÃ³n
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (user) {
      exams();
    }
  }, [user]);

  const login = async (matricula, password) => {
    try {
      const res = await axios.post('http://localhost:3000/login', { matricula, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };


  const exams = async () => {
    try {
      const token = localStorage.getItem('token')
      const test = await axios.get('http://localhost:3000/teacher/examenes', { headers: { Authorization: `Bearer ${token}` } })
      return setExam(test.data)
    } catch (error) {
      console.error(error)
      setExam([])
    }
  }

  const createExam = async (examData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.post('http://localhost:3000/teacher/examenes', examData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCrete(prevCreate => [...prevCreate, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating exam:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      throw error;
    }
  }


  return (
    <UserContext.Provider value={{ user, loading, exam, create, login, logout, exams, createExam }}>
      {children}
    </UserContext.Provider>
  );

};

export { UserContext, UserProvider };