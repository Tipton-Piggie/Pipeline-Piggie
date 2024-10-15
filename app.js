// Function to show the selected screen and hide the others
function showScreen(screenId) {
    const screens = document.getElementsByClassName('calculator-screen');
    for (let screen of screens) {
        screen.style.display = 'none';  // Hide all screens
    }
    document.getElementById('homeScreen').style.display = 'none'; // Hide the home screen
    document.getElementById(screenId).style.display = 'block';  // Show the selected screen
}

// Go back to the Home Screen
function goBack() {
    const screens = document.getElementsByClassName('calculator-screen');
    for (let screen of screens) {
        screen.style.display = 'none';  // Hide all calculation screens
    }
    document.getElementById('homeScreen').style.display = 'block';  // Show the home screen
}

// Function to calculate Pig Speed and Time for Gas Flow
function calculatePigSpeed() {
    // Get input values
    const diameter = parseFloat(document.getElementById('gasDiameter').value);
    const pressure = parseFloat(document.getElementById('pressure').value);
    const flowRateMMCF = parseFloat(document.getElementById('flowRateMMCF').value);
    const miles = parseFloat(document.getElementById('gasMiles').value);

    // Validate inputs
    if (isNaN(diameter) || isNaN(pressure) || isNaN(flowRateMMCF) || isNaN(miles)) {
        document.getElementById('pigSpeedResult').innerText = "Please enter valid numbers for all fields.";
        return;
    }

    // Gas Flow Calculation
    const A = 0.372 * pressure * Math.pow(diameter, 2);
    const B = A * 5.28;
    const pigSpeedMPH = ((flowRateMMCF / 24) / B) * 1e6;
    const pigRunTimeHours = miles / pigSpeedMPH;

    // Display Results
    document.getElementById('pigSpeedResult').innerText = `Pig Speed: ${pigSpeedMPH.toFixed(2)} miles per hour (MPH)`;
    document.getElementById('pigTimeResult').innerText = `Time for Pig Run: ${pigRunTimeHours.toFixed(2)} hours`;
}

// Function to calculate Liquid Pig Speed and Time for Liquid Flow
function calculateLiquidFlow() {
    const productType = document.getElementById('productType').value;
    const diameter = parseFloat(document.getElementById('liquidDiameter').value);
    const flowRate = parseFloat(document.getElementById('flowRate').value);
    const miles = parseFloat(document.getElementById('liquidMiles').value);

    // Validate inputs
    if (isNaN(diameter) || isNaN(flowRate) || isNaN(miles)) {
        document.getElementById('liquidPigSpeedResult').innerText = "Please enter valid numbers for all fields.";
        return;
    }

    // Product density lookup (lbs/ft^3)
    const densities = {
        ethane: 30.07,
        ethylene: 32.12,
        propane: 31.67,
        propylene: 32.99
    };

    const density = densities[productType];
    const volumeFlowRate = flowRate / density;  // Volume flow rate (cubic feet/hour)
    const diameterFeet = diameter / 12;
    const area = Math.PI * Math.pow(diameterFeet / 2, 2);  // Cross-sectional area in square feet
    const velocity = volumeFlowRate / area;  // Velocity in feet per hour
    const pigSpeedMPH = velocity / 5280;  // Convert to miles per hour
    const pigRunTimeHours = miles / pigSpeedMPH;

    // Display Results
    document.getElementById('liquidPigSpeedResult').innerText = `Pig Speed: ${pigSpeedMPH.toFixed(2)} miles per hour (MPH)`;
    document.getElementById('liquidPigTimeResult').innerText = `Time for Pig Run: ${pigRunTimeHours.toFixed(2)} hours`;
}

// Function to calculate Hydrotest Volume
function calculateHydrotestVolume() {
    const length = parseFloat(document.getElementById('pipeLength').value);
    const diameter = parseFloat(document.getElementById('hydroDiameter').value);
    const wallThickness = parseFloat(document.getElementById('wallThickness').value);

    // Validate inputs
    if (isNaN(length) || isNaN(diameter) || isNaN(wallThickness)) {
        document.getElementById('hydrotestVolumeResult').innerText = "Please enter valid numbers for all fields.";
        return;
    }

    // Calculate internal diameter
    const internalDiameter = diameter - 2 * wallThickness;
    const internalDiameterFeet = internalDiameter / 12;

    // Calculate cross-sectional area (square feet)
    const area = Math.PI * Math.pow(internalDiameterFeet / 2, 2);

    // Calculate volume in cubic feet (length converted from miles to feet)
    const lengthFeet = length * 5280;
    const volumeCubicFeet = area * lengthFeet;

    // Convert cubic feet to gallons (1 cubic foot = 7.48 gallons)
    const volumeGallons = volumeCubicFeet * 7.48;

    // Display the result
    document.getElementById('hydrotestVolumeResult').innerText = `Hydrotest Volume: ${volumeGallons.toFixed(2)} gallons`;
}

// Function to calculate Nitrogen Volume
function calculateNitrogenVolume() {
    // Get input values
    const diameter = parseFloat(document.getElementById('nitroDiameter').value);
    const psi = parseFloat(document.getElementById('nitroPSI').value);
    const length = parseFloat(document.getElementById('nitroMiles').value);
    const speed = parseFloat(document.getElementById('nitroSpeed').value);
    const pigRuns = parseFloat(document.getElementById('nitroPigRuns').value);

    // Validate inputs
    if (isNaN(diameter) || isNaN(psi) || isNaN(length) || isNaN(speed) || isNaN(pigRuns)) {
        document.getElementById('nitrogenVolumeResult').innerText = "Please enter valid numbers for all fields.";
        return;
    }

    // Calculate Rate SCFM
    const rateSCFM = (0.03265 * diameter * diameter * speed) * (psi + 14.7);

    // Calculate Total Nitrogen per run
    const totalNitrogenPerRun = (1.959 * diameter * diameter * length) * (psi + 14.7);

    // 1 Line fill plus number of pig runs
    const totalNitrogen = (pigRuns * totalNitrogenPerRun) + totalNitrogenPerRun;

    // Number of Transport loads at 500,000 CF per load
    const transportLoads = totalNitrogen / 500000;

    // Display results
    document.getElementById('nitrogenVolumeResult').innerText = `
        Rate SCFM: ${rateSCFM.toFixed(2)} SCFM
        Total Nitrogen per Run: ${totalNitrogenPerRun.toFixed(2)} CF
        1 Line Fill + Pig Runs: ${totalNitrogen.toFixed(2)} CF
        Transport Loads (at 500k CF per load): ${transportLoads.toFixed(2)} loads
    `;
}
// Function to calculate Pig Speed (Weld Tracker)
function calculatePigWeldSpeed() {
    // Get input values
    const timeInSeconds = parseFloat(document.getElementById('weldTime').value);
    const jointLengthFt = parseFloat(document.getElementById('jointLength').value);

    // Validate inputs
    if (isNaN(timeInSeconds) || isNaN(jointLengthFt)) {
        document.getElementById('pigWeldSpeedResult').innerText = "Please enter valid numbers for all fields.";
        return;
    }

    // Calculate Speed in mph
    const speedMph = (jointLengthFt / timeInSeconds) * 0.681818182;

    // Display the result
    document.getElementById('pigWeldSpeedResult').innerText = `Speed: ${speedMph.toFixed(2)} miles per hour (MPH)`;
}
