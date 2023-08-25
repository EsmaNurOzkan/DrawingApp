$(document).ready(function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");
    const colorPicker = document.getElementById("colorPicker");
    const thicknessSlider = document.getElementById("thicknessSlider");
    const eraserButton = document.getElementById("eraserButton");
    const saveButton = document.getElementById("saveButton");
    const displayedImage = document.getElementById("displayedImage");
    const closeDisplayedButton = document.getElementById("closeDisplayedButton");

    let isDrawing = false;
    let currentColor = "black";
    let currentThickness = 5;

    canvas.width = 800;
    canvas.height = 600;

    canvas.addEventListener("mousedown", () => {
        isDrawing = true;
    });

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        context.beginPath();
    });

    clearButton.addEventListener("click", () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    colorPicker.addEventListener("input", (e) => {
        currentColor = e.target.value;
    });

    thicknessSlider.addEventListener("input", (e) => {
        currentThickness = e.target.value;
    });

    function draw(e) {
        if (!isDrawing) return;

        context.lineWidth = currentThickness;
        context.lineCap = "round";
        if (currentColor === "white") {
            context.strokeStyle = "#ffffff";
        } else {
            context.strokeStyle = currentColor;
        }

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    eraserButton.addEventListener("click", () => {
        currentColor = "white";
        currentThickness = 15;
    });

    saveButton.addEventListener("click", () => {
        const dataURL = canvas.toDataURL(); // Canvas verisini veri URL'sine dönüştür
        const savedDrawings = JSON.parse(localStorage.getItem("savedDrawings")) || [];
        savedDrawings.push(dataURL);
        localStorage.setItem("savedDrawings", JSON.stringify(savedDrawings));
        alert("Çizim kaydedildi!");
    });

    const showDrawingsButton = document.getElementById("showDrawingsButton");
    const popup = document.getElementById("popup");
    const drawingListPopup = document.getElementById("drawingListPopup");
    const closePopupButton = document.getElementById("closePopup");

    showDrawingsButton.addEventListener("click", () => {
        popup.style.display = "block"; // Popup'u görüntüle
        closeDisplayedButton.style.display = "block";

        drawingListPopup.innerHTML = ""; // Önceki listeyi temizle

        // Kaydedilen çizimleri görüntüleme
        const savedDrawings = JSON.parse(localStorage.getItem("savedDrawings")) || [];
        savedDrawings.forEach((drawingData, index) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = drawingData;
            link.target = "_blank";
            link.textContent = `Çizim ${index + 1}`;
            listItem.appendChild(link);
            drawingListPopup.appendChild(listItem);
        });
    });

    closePopupButton.addEventListener("click", () => {
        popup.style.display = "none"; // Popup'u kapat
    });

    // Ekleme
    drawingListPopup.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            const dataURL = e.target.href;
            displayedImage.src = dataURL;
            e.preventDefault();
        }
    });

    closeDisplayedButton.addEventListener("click", () => {
        displayedImage.src = ""; // Resmi kapat
    });

    $("#clearDrawingsButton").click(function () {
        localStorage.removeItem("savedDrawings");
        $("#drawingListPopup").empty();
       });
    });
