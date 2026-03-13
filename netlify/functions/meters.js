let meters = {
  boxingKing: { value: 60, increasing: true },
  goldenEmpire: { value: 45, increasing: false }
};

function updateMeter(meter){
  const step = Math.random()*(0.8-0.05)+0.05;
  if(meter.increasing){
    meter.value+=step;
    if(meter.value>=90){ meter.value=90; meter.increasing=false; }
  }else{
    meter.value-=step;
    if(meter.value<=10){ meter.value=10; meter.increasing=true; }
  }
}

function createTimeframe(max,minStep,maxStep){
  let value = Math.random()*max;
  let increasing = Math.random()<0.5;

  if(!increasing) value=-value;

  return {
    tf10: parseFloat((Math.random()*5-2.5).toFixed(2)),
    tf60: parseFloat((Math.random()*30-15).toFixed(2)),
    tf180: parseFloat((Math.random()*68-34).toFixed(2)),
    tf360: parseFloat((Math.random()*77-38).toFixed(2))
  };
}

exports.handler = async () => {

  updateMeter(meters.boxingKing);
  updateMeter(meters.goldenEmpire);

  return {
    statusCode: 200,
    body: JSON.stringify({
      boxingKing: meters.boxingKing.value.toFixed(2),
      goldenEmpire: meters.goldenEmpire.value.toFixed(2),
      timeframes:{
        boxingKing: createTimeframe(5,0.01,0.09),
        goldenEmpire: createTimeframe(5,0.01,0.09)
      }
    })
  };

};