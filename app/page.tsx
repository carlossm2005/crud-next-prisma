"use client"

import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"

export default function Home() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    Id: 0,
    Login: '',
    FirstName: '',
    LastName: '',
    FullName: '',
    DisplayName: '',
    Email: '',
    Password: '',
    RegDate: new Date(),
  })

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

  const GetUsers = async () => {
    const res = await axios.get('/api/users')
      .catch((error) => {
        console.log('catch: ', error.message);
      });

    if (res && res.data) {
      setUsers(res.data);
    }
  };

  const AddUser = async (e: SyntheticEvent) =>{
    e.preventDefault();

    const resp = await axios.post('/api/users', {
      Login: user.Login,
      Email: user.Email,
      Password: user.Password,
    });

    if (resp && resp.data) {
      console.log('AddUser->resp.data: ', resp.data);
      GetUsers();
    }

    ResetUser()
  }

  const UpdateUser = async (e: SyntheticEvent) =>{
    e.preventDefault()
    
    const resp = await axios.put('/api/users/', {
      Id: user.Id,
      Login: user.Login,
      Email: user.Email,
      Password: user.Password,
    });
    if (resp && resp.data) {
      console.log('UpdateUser->resp.data: ', resp.data);
      GetUsers();
    }
    ResetUser()
  }
  const EditUser = async (userId: number) => {
    const userFound = users.find(user => user.Id === userId);
    if (userFound) {
      setUser(userFound);
    }
  }

  async function DeleteUser(id): Promise<void> {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    }).catch((error) => {
      console.log("catch: ", error.message);
    });
    GetUsers();

  }


  const ResetUser = () => {
    setUser(prevState => ({ ...prevState, Id: 0, Login: '', Email: '', Password: '' }))
  }
  useEffect(() => {GetUsers();}, []);

  return (
    <main className=" w-full h-full flex items-center justify-around">
      <div className="w-2/6">
        <h1 className="text-4xl font-bold text-white text-center">User Log/Update</h1>
        <form className="flex flex-col text-white my-5 rounded-2xl py-10 px-5">

          <label htmlFor="name">Name:</label>
          <input type="text" placeholder="Name" id="name" value={user.Login} name="Login" onChange={HandleChange}/>

          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Email@example.com" id="email" onChange={HandleChange} value={user.Email} name="Email"/>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={HandleChange} value={user.Password} name="Password"/>

          <div className="flex justify-around mt-7">
            <button onClick={AddUser}>Add User</button>
            <button onClick={UpdateUser}>Update User</button>
          </div>
        </form>
      </div>
      <div className="w-3/6">
        <h1 className="text-4xl font-bold text-white text-center">Users</h1>
        <div className="mt-8 rounded-2xl w-full divtable">
          <div className="divhead font-bold">
            <p>ID</p>
            <p>User</p>
            <p>Email</p>
            <p>Password</p>
            <p>Actions</p>
          </div>
          <div className="divbody">
            {users.map((user, key) =>{
              return (
                          <div className="divrow" key={key}>
                            <p>{user.Id}</p>
                            <p>{user.Login}</p>
                            <p>{user.Email}</p>
                            <p>{user.Password}</p>
                            <div className="buttons">
                              <button className="update" onClick={() => EditUser(user.Id)}>Update</button>
                              <button className="delete" onClick={() => DeleteUser(user.Id)}>Delete</button>
                            </div>
                          </div>
            )})}
          </div>
        </div>
      </div>
    </main>
  )
}
