import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

function Home() {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3030";
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }
      const res = await axios.get(`${apiUrl}/home`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(res.data);
    } catch (error) {
      if (error.response) {
        console.error('Error fetching data:', error.response.data);
        if (error.response.status === 401) {
          navigate('/');
        }
      } else if (error.request) {
        console.error('Error fetching data: No response from server', error.request);
      } else {
        console.error('Error fetching data:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header></Header>
      <div className='container w-75 mx-auto'>
      {data.length === 0 ? (
        <p className="text-center">Data is not available.</p>
      ) : (
        <div className="row mt-5">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((d,index) => (                      
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{d.name}</td>
                        <td>{new Date(d.dateCreated).toLocaleDateString()}</td>
                        <td>{d.role}</td>
                        <td>{d.status}</td>
                        <td>
                        <img src={require("../Static/SettingsIcon.png")} alt="Settings" style={{ width: '20px', marginRight: '10px' }} />
                        <img src={require("../Static/CrossIcon.png")} alt="Delete" style={{ width: '20px' }} />
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
          
        </div>
      )}
    </div>
    </div>
    
  );
}

export default Home;
