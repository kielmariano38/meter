// meters.js
let meters = {
  boxingKing: { value: 60, increasing: true },
  goldenEmpire: { value: 45, increasing: false }
};

// Update meter value according to your interval logic
function updateMeter(meter) {
  const step = Math.random() * (0.8 - 0.05) + 0.05;

  if (meter.increasing) {
    meter.value += step;
    if (meter.value >= 90) {
      meter.value = 90;
      meter.increasing = false;
    }
  } else {
    meter.value -= step;
    if (meter.value <= 10) {
      meter.value = 10;
      meter.increasing = true;
    }
  }
}

exports.handler = async function() {
  // Update each meter
  updateMeter(meters.boxingKing);
  updateMeter(meters.goldenEmpire);

  // Return JSON to all clients
  return {
    statusCode: 200,
    body: JSON.stringify({
      boxingKing: meters.boxingKing.value.toFixed(2),
      goldenEmpire: meters.goldenEmpire.value.toFixed(2)
    })
  };
};