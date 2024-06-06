import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ministries } from "../../data/ministries";

const AuthContext = createContext();

function camelCaseToTitleCase(inputString) {
  return inputString
    .split(/(?=[A-Z])/)
    .map((c) => capitalize(c))
    .join(" ");
}

function snakeCaseToTitleCase(inputString) {
  return inputString
    .split("_")
    .map((c, i) => {
      if (c === "year" || c === "month" || c === "week" || c === "today") {
        return applyPossession(capitalize(c));
      } else {
        return capitalize(c);
      }
    })
    .join(" ");
}

function applyPossession(noun) {
  return noun + "'s";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
}

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [change, setOnChange] = useState(false);
  const [error, setError] = useState("");
  const [state_departments, setStateDepartments] = useState([]);

  const [user, setUser] = useState(null);

  const backendUrl = "http://ec2-18-208-140-121.compute-1.amazonaws.com:4000";
  // const backendUrl = "https://conference-thawing-c5eafdce0b81.herokuapp.com";

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    attemptLogin();
    generalFetch(`${backendUrl}/state_departments`, setStateDepartments);
  }, []);

  function formatText(text) {
    const lines = text.split("|").map((line) => line.trim());
    const formattedText = lines.map((line, i) => <li key={i}>{line}</li>);
    return formattedText;
  }

  function newSuperUser(userData, onErrorCallBack) {
    fetch(`${backendUrl}/new/admin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    }).then((response) => {
      if (response.status < 400) {
        response.json((data) => {
          Toast.fire({
            icon: "error",
            title: `User created successfully`,
            text: response.error,
          });
        });
      } else if (response.status === 422) {
        response.json().then((err) => {
          onErrorCallBack(err.errors);
          Toast.fire({
            icon: "error",
            title: `Error ${response.status} : Bad Request`,
            text: response.error,
          });
        });
      } else {
        Toast.fire({
          icon: "error",
          title: `Error ${response.status} : Internal Server Error`,
          text: response.error,
        });
      }
    });
  }

  function attemptLogin() {
    fetch(`${backendUrl}/me`, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.status < 400) {
        response.json().then((data) => {
          setUser(data);
        });
      }
    });
  }

  function generalFetch(url, callback) {
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.status <= 400) {
        res.json().then((data) => {
          callback(data);
        });
      }
    });
  }

  function login(email, password) {
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else if (!isValidEmail(email)) {
      setError("Invalid email format.");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    } else {
      fetch(`${backendUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identity: email,
          password: password,
        }),
      }).then((res) => {
        if (res.error) {
          Toast.fire({
            icon: "error",
            title: "Oops...",
            text: response.error,
          });
        } else if (res.status === 202) {
          res.json().then((response) => {
            setOnChange(!change);
            setUser(response);
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            navigate("/admin");
          });
        }
      });
    }
  }

  const register = (name, email, password) => {
    if (!email || !password) {
      setError("Please enter all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      // Check if email format is valid
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      // Check if password is at least 6 characters
      setError("Password must be at least 6 characters.");
      return;
    }

    // Register user
    fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setOnChange(!change);
        if (response.error) {
          Toast.fire({
            icon: "error",
            title: "Oops...",
            text: response.error,
          });
        } else {
          Toast.fire({
            icon: "success",
            title: "Registered successfully!",
          });

          navigate("/login");
        }
      })
      .catch(() => {
        console.error("Error registering user:", error);
        setError("Error registering user. Please try again later.");
      });
  };

  const logout = () => {
    fetch(`${backendUrl}/logout`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 204) {
        Toast.fire({
          icon: "success",
          title: "Logged out successfully!",
        });

        setUser(null);
      }
    });
  };

  function showAlert(message, icon, bg) {
    Swal.fire({
      position: "center",
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500,
      background: bg,
      color: "white",
    });
  }

  const contextData = {
    user,
    setUser,
    login,
    logout,
    register,
    backendUrl,
    error,
    showAlert,
    ministries,
    state_departments,
    generalFetch,
    formatText,
    snakeCaseToTitleCase,
    camelCaseToTitleCase,
    newSuperUser,
  };

  return (
    <>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export { AuthContext, AuthProvider };
