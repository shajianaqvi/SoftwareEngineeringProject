function addEmployee() {
    const name = document.getElementById("empName").value;
    const role = document.getElementById("empRole").value;
  
    if (name && role) {
      const empId = db.ref("employees").push().key;
      db.ref("employees/" + empId).set({ name, role });
      alert("Employee Added!");
      document.getElementById("empName").value = "";
      document.getElementById("empRole").value = "";
      loadEmployees();
    } else {
      alert("Please enter all fields.");
    }
  }
  
  function loadEmployees() {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";
  
    db.ref("employees").once("value", snapshot => {
      snapshot.forEach(child => {
        const emp = child.val();
        const li = document.createElement("li");
        li.innerText = `${emp.name} (${emp.role})`;
        list.appendChild(li);
      });
    });
  }
  
  // Load employees when page loads
  window.onload = loadEmployees;
  