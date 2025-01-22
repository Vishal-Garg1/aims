
const getOtpBtn = document.getElementById("getOtpBtn");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otp");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const emailInput = document.getElementById("email");

// Handle Get OTP Button Click
getOtpBtn.addEventListener("click", function() {
  const email = emailInput.value;
  console.log("Email entered:", email);  // Debugging log

  if (email) {
    // Send OTP request to backend (replace with your actual backend API)
    fetch("http://localhost:3000/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response from backend:", data);  // Debugging log

      if (data.message === 'OTP sent successfully') {
        alert("OTP sent to your email!");
        otpSection.style.display = "block"; // Show OTP input section
        getOtpBtn.style.cursor = "pointer";
        getOtpBtn.disabled = true; // Disable Get OTP button after click
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP.");
    });
  } else {
    alert("Please enter a valid email ID.");
  }
});

// Handle Verify OTP Button Click
verifyOtpBtn.addEventListener("click", function() {
  const otp = otpInput.value;
  const email = emailInput.value;

  if (otp) {
    // Send OTP verification request to backend (replace with your actual backend API)
    fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp })
    })
    .then(response => response.json())
    .then(data => {
      console.log("OTP verification response:", data); // Debugging log

      if (data.message === 'Logged in successfully') {
        alert("OTP Verified! You are logged in.");
        // Redirect or load next page (e.g., dashboard)
        window.location.href = "/dashboard"; // Change this URL as necessary
      } else {
        alert("Invalid OTP, please try again.");
      }
    })
    .catch(error => {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying OTP.");
    });
  } else {
    alert("Please enter OTP.");
  }
});
