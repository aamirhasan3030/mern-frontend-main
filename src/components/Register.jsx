import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Data saved successfully");
      Navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="App-Register-Row">
      <div className="register-container">
        <h2 className="register-title">Registration Form</h2>
        <p className="register-error">{error}</p>
        <p>
          <input
            className="register-input"
            type="text"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="Enter First Name"
          />
        </p>
        <p>
          <input
            className="register-input"
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </p>
        <p>
          <input
            className="register-input"
            type="text"
            placeholder="Enter Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </p>
        <p>
          <input
            className="register-input"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </p>
        <p>
          <button className="register-button" onClick={handleSubmit}>Submit</button>
        </p>
        <hr className="register-separator" />
        <Link className="register-link" to="/login">Already a member? Login Here...</Link>
      </div>
    </div>
  );
}


// export default function Register() {
//   const firstName = useRef();
//   const lastName = useRef();
//   const email = useRef();
//   const password = useRef();
//   const handleSubmit = () => {
//     const user = {
//       firstName: firstName.current.value,
//       lastName: lastName.current.value,
//       email: email.current.value,
//       password: password.current.value,
//     };
//     console.log(user);
//   };
//   return (
//     <div className="App-Register-Row">
//       <div style={{ backgroundColor: "white" }}>
//         <h2>Registration Form</h2>
//         <p>
//           <input type="text" placeholder="Enter First Name" ref={firstName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Last Name" ref={lastName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Email Address" ref={email} />
//         </p>
//         <p>
//           <input type="password" placeholder="Enter Password" ref={password} />
//         </p>
//         <p>
//           <button onClick={handleSubmit}>Submit</button>
//         </p>
//       </div>
//     </div>
//   );
// }
