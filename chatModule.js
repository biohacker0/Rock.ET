// Function to set focus on the first input field when the page loads
window.onload = function () {
  document.getElementById("input1").focus();
};

// Function to log typed messages
var sharedMsg = document.getElementById("sharedMsg");

function logMessage(message) {
  console.log();
  const chatMessages = document.getElementById("chatMessages");
  const messageElement = document.createElement("div");
  sharedMsg.innerText = message;

  // Create a custom event to dispatch the message
  const messageEvent = new CustomEvent("messageLogged", {
    detail: { message: message },
  });
  document.dispatchEvent(messageEvent); // Dispatch the event

  messageElement.textContent = message;
  messageElement.classList.add("chatMessage");
  chatMessages.insertBefore(messageElement, chatMessages.firstChild);
  setTimeout(() => {
    messageElement.remove(); // Remove message after 5 seconds
  }, 5000);
}

// Function to handle the input cycle and form submission
function handleInputCycle(event) {
  event.preventDefault(); // Prevent form submission

  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");

  const input1Value = input1.value.trim();
  const input2Value = input2.value.trim();

  if (!input1Value || !input2Value) {
    logMessage("Fill both data.");
    input1.value = "";
    input2.value = "";
    input1.focus();
  } else {
    const message = input1Value + ", " + input2Value;
    logMessage(message);
    input1.value = "";
    input2.value = "";
    input1.focus();
  }
}

// Event listener for form submission
document
  .getElementById("inputForm")
  .addEventListener("submit", handleInputCycle);

// Event listener for pressing Enter to submit
document
  .getElementById("input2")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleInputCycle(event);
    }
  });

// Event listener for auto-change input from first input to second if two words filled
document.getElementById("input1").addEventListener("input", function () {
  if (this.value.length >= this.maxLength) {
    document.getElementById("input2").focus();
  }
});
