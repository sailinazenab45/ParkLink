const API_URL = "https://parklink-ba31.onrender.com/api/auth";

async function registerUser() {

    const username =
        document.getElementById("username").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data = await response.json();

    document.getElementById("message")
        .innerText = data.message;
}


async function loginUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

if(data.success){

    localStorage.setItem(
        "userEmail",
        email
    );

    localStorage.setItem(
        "username",
        data.user.username
    );

    if(data.user.vehicleInfoCompleted === false){

        document.getElementById("vehicleModal")
        .style.display = "flex";

    }else{

        window.location.href =
        "dashboard.html";
    }

}else{

    alert(data.message);
}}

async function saveVehicleInfo() {

    const email = localStorage.getItem("userEmail");

    const slot =
        document.getElementById("slot").value;

    const vehicleNumber =
        document.getElementById("vehicleNumber").value;

    const vehicleType =
        document.getElementById("vehicleType").value;

    const vehicleModel =
        document.getElementById("vehicleModel").value;

    const fuelType =
        document.getElementById("fuelType").value;

    const response = await fetch(
        `${API_URL}/vehicle-info`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                slot,
                vehicleNumber,
                vehicleType,
                vehicleModel,
                fuelType
            })
        }
    );

    const data = await response.json();

    if(data.success){

        alert("Vehicle Information Saved");

        window.location.href =
        "dashboard.html";

    }else{

        alert(data.message);
    }
}