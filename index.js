function calculate() {
    // Get input values
    const dailyKWh = parseFloat(document.getElementById("dailyKWh").value);
    const solarFieldSize = parseFloat(document.getElementById("solarFieldSize").value);
    const buyRate = parseFloat(document.getElementById("buyRate").value);
    const sellRate = parseFloat(document.getElementById("sellRate").value);
  
    // Hourly consumption
    // This divides the daily energy usage by 24 hours to get hourly consumption.
    const hourlyConsumption = dailyKWh / 24;
  
    // Daily revenue from grid
    // This calculates the revenue from selling excess solar energy to the grid for 8 hours a day.
    const dailyRevenue = (solarFieldSize - hourlyConsumption) * sellRate * 8;
  
    // Off-solar consumption (~16 hours non-solar)
    // Energy consumed during the non-solar hours (~16 hours).
    const offSolarConsumption = (dailyKWh * 16) / 24;
  
    // Off-solar daily cost
    // The cost of energy consumed during the non-solar hours at the buy rate.
    const offSolarCost = offSolarConsumption * buyRate;
  
    // No ESS daily cost
    // The difference between the daily cost and the revenue from selling energy.
    const noESSCost = offSolarCost - dailyRevenue;
  
    // Monthly electricity bill before Pulse
    // The monthly electricity bill, based on daily costs.
    const monthlyBill = noESSCost * 30;
  
    // Daily production (charge batteries)
    // The solar energy production minus the hourly consumption for 8 hours.
    const dailyProduction = (solarFieldSize - hourlyConsumption) * 8;
  
    // Daily savings from grid independence
    // This determines the savings when independent from the grid,
    // based on energy production vs. consumption.
    let dailySavings = 0;
    if (dailyProduction > offSolarConsumption) {
      dailySavings = (dailyProduction - offSolarConsumption) * sellRate + offSolarCost;
    } else {
      dailySavings = (dailyProduction - offSolarConsumption) * buyRate + offSolarCost;
    }
  
    // Pulse Whole Home Cost (fixed + variable cost)
    // The total cost of the system including the inverter and battery modules.
    const pulseWholeHomeCost = 4999.95 + 1164.95 * Math.ceil(offSolarConsumption / 5) + 1000;
  
    // Pulse 5kWh modules required
    // This rounds up the off-solar consumption to the nearest 5kWh
    // and divides it by 5kWh per module.
    const pulseModules = Math.ceil(offSolarConsumption / 5);
  
    // Annual savings
    // The yearly savings from grid independence.
    const annualSavings = dailySavings * 365;
  
    // Years for ROI
    // The number of years required to recover the initial investment.
    const roiYears = pulseWholeHomeCost / annualSavings;
  
    // Display the results
    document.getElementById("hourlyConsumption").textContent = hourlyConsumption.toFixed(2);
    document.getElementById("dailyRevenue").textContent = dailyRevenue.toFixed(2);
    document.getElementById("offSolarConsumption").textContent = offSolarConsumption.toFixed(2);
    document.getElementById("offSolarCost").textContent = offSolarCost.toFixed(2);
    document.getElementById("noESSCost").textContent = noESSCost.toFixed(2);
    document.getElementById("monthlyBill").textContent = monthlyBill.toFixed(2);
    document.getElementById("dailyProduction").textContent = dailyProduction.toFixed(2);
    document.getElementById("dailySavings").textContent = dailySavings.toFixed(2);
    document.getElementById("pulseModules").textContent = pulseModules;
    document.getElementById("annualSavings").textContent = annualSavings.toFixed(2);
    document.getElementById("roiYears").textContent = roiYears.toFixed(2);
  }
  