const email =
localStorage.getItem("userEmail");

async function loadProfile(){

    const response = await fetch(
        `http://localhost:5000/api/auth/profile/${email}`
    );

    const data =
    await response.json();

    if(data.success){

        document.getElementById(
            "username"
        ).innerText =
        data.user.username;

        document.getElementById(
            "slot"
        ).innerText =
        data.user.slot;
    }
}

loadProfile();

async function sendComplaint(){

    const response = await fetch(
        "http://localhost:5000/api/complaint",
        {
            method:"POST",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
                email
            })
        }
    );

    const data =
    await response.json();

    alert(data.message);
}