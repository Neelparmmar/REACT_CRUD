import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Update.css"; // Import External CSS

const Update = () => {
  const [studentStore, setstudentStore] = useState({});
  let myNavigate = useNavigate();
  const { id } = useParams();

  const SaveData = (e) => {
    setstudentStore({ ...studentStore, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="heading">Update Student</h1>

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
          value="Update"
          onClick={() => {
            let Formdata = new FormData();
            Formdata.append("st_id", id);
            Formdata.append("st_name", studentStore.name);
            Formdata.append("st_gender", studentStore.gender);
            Formdata.append("st_email", studentStore.email);
            Formdata.append("st_password", studentStore.password);
            Formdata.append("st_mobileno", studentStore.mobileno);

            axios
              .post(
                `${import.meta.env.VITE_API_URL}/student-update-api.php`,
                Formdata
              )
              .then((res) => {
                console.log(res.data);
                myNavigate("/");
              });
          }}
          className="submit-button"
        />
      </div>
    </div>
  );
};

export default Update;
