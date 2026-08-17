const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx298rNWZ0scWOU4qvWD2ew-tI58rGFSQjXniIsdOYsB0l_NM2yRTPFg9qUOczEnGWF/exec";

  window.addEventListener("DOMContentLoaded", () => {
    fetchEventData();
  });

  async function fetchEventData() {
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();

      if (data.status === "success") {
        document.getElementById("modalHeading").innerText = data.heading;
        document.getElementById("modalDescription").innerText = data.description;
        document.getElementById("modalImage").src = data.image;
        
        // Display the modal
        document.getElementById("eventModal").style.display = "flex";
      } else {
        console.log("No event scheduled for today or image missing.");
      }
    } catch (err) {
      console.error("Error fetching event data:", err);
    }
  }

function eventCloseModal() {
  document.getElementById("eventModal").style.display = "none";
}


