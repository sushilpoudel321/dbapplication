import React, { useState, useEffect } from "react";
import { fetchUsers, addUser } from "./api"; // Import API functions
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // Fetch users from the database when the component loads
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({ name, email, age });
    setUsers(await fetchUsers()); // Refresh user list
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary">User Management</h1>

      {/* User Form */}
      <form className="mb-3" onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Add User</button>
      </form>

      {/* Users List */}
      <h2 className="mt-4">Users List</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user.id}>
            {user.name} ({user.email}) - Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
