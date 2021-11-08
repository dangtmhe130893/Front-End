var endpoint = "http://localhost:8080/api/auth/signin";

// sua cac link vao day de login chuyen trang
var redirectStaff = "http://127.0.0.1:5501/html/staff/homepage_staff.html";
var redirectAdmin = "http://127.0.0.1:5501/html/admin/homepage_admin.html";
var redirectAcademicHead =
  "http://127.0.0.1:5501/html/academichead/homepage_academichead.html";
var redirectHeadMaster =
  "http://127.0.0.1:5501/html/headmaster/homepage_headmaster.html";
var redirectTeacher =
  "http://127.0.0.1:5501/html/teacher/homepage_teacher.html";
var redirectParent =
  "http://127.0.0.1:5501/html/pupils-parents/homepage_pupils.html";

var admin = "ROLE_ADMIN";
var guest = "ROLE_GUEST";
var staff = "ROLE_STAFF";
var headMaster = "ROLE_HEADMASTER";
var teacher = "ROLE_TEACHER";
var pupilParent = "ROLE_PUPIL_PARENT";
var academicHead = "ROLE_ACADEMIC_HEAD";

function login() {
  var username = document.querySelector('input[name="username"]').value;
  var password = document.querySelector('input[name="password"]').value;
  var data = {
    username: username,
    password: password,
  };
  let status;
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      status = response.status;
      return response.json();
    })
    .then(function (res) {
      console.log(res);
      if (status == 200 && res.token !== null) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
        localStorage.setItem("roles", res.roles[0]);
        // window.location = "http://127.0.0.1:5500/html/employee.html";
        if (res.roles[0] === admin) window.location = redirectAdmin;
        else if (res.roles[0] === teacher) window.location = redirectTeacher;
        else if (res.roles[0] === staff) window.location = redirectStaff;
        else if (res.roles[0] === pupilParent) window.location = redirectParent;
        else if (res.roles[0] === academicHead)
          window.location = redirectAcademicHead;
        else if (res.roles[0] === headMaster)
          window.location = redirectHeadMaster;
      } else {
        document.getElementById("loginFail").innerText =
          "Tài khoản hoặc mật khẩu không đúng vui lòng đăng nhập lại";
        setTimeout(() => {
          document.getElementById("loginFail").innerText = "";
        }, 3000);
      }
    });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("roles");
}
