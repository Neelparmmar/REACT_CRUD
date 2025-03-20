import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [StudentData, setStudentData] = useState([]);
  let myNavigate = useNavigate();

  useEffect(() => {
    showData();
  }, []);

  const showData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/student-display-api.php`)
      .then((res) => {
        setStudentData(res.data.student_list);
      });
  };

  const [studentStore, setstudentStore] = useState({});
  const SaveData = (e) => {
    setstudentStore({ ...studentStore, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="heading">Display Students</h1>

      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={SaveData}
          className="input-field"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          onChange={SaveData}
          className="input-field"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={SaveData}
          className="input-field"
        />
        <input
          type="text"
          name="mobileno"
          placeholder="Mobile"
          onChange={SaveData}
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={SaveData}
          className="input-field"
        />
        <input
          type="button"
          value="Submit"
          onClick={() => {
            let Formdata = new FormData();
            Formdata.append("st_name", studentStore.name);
            Formdata.append("st_gender", studentStore.gender);
            Formdata.append("st_email", studentStore.email);
            Formdata.append("st_password", studentStore.password);
            Formdata.append("st_mobileno", studentStore.mobileno);
            axios
              .post(
                `${import.meta.env.VITE_API_URL}/student-add-api.php`,
                Formdata
              )
              .then((res) => {
                showData();
              });
          }}
          className="button"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {StudentData.map((val) => (
            <tr key={val.st_id}>
              <td>{val.st_name}</td>
              <td>{val.st_gender}</td>
              <td>{val.st_email}</td>
              <td>{val.st_mobileno}</td>
              <td>
                <input
                  type="button"
                  value="Delete"
                  onClick={() => {
                    let Formdata = new FormData();
                    Formdata.append("st_id", val.st_id);
                    axios
                      .post(
                        `${
                          import.meta.env.VITE_API_URL
                        }/student-delete-api.php`,
                        Formdata
                      )
                      .then(() => {
                        showData();
                      });
                  }}
                  className="delete-button"
                />
                <input
                  type="button"
                  value="Update"
                  onClick={() => {
                    myNavigate(`/update/${val.st_id}`);
                  }}
                  className="update-button"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
