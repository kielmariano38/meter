let meters = {
  boxingKing: { value: Math.random()*80+10, increasing: true },
  goldenEmpire: { value: Math.random()*80+10, increasing: true }
};

let timeframes = {
  boxingKing: { tf10: Math.random()*5, tf60: Math.random()*30, tf180: Math.random()*65, tf360: Math.random()*75, inc10:true, inc60:true, inc180:true, inc360:true },
  goldenEmpire: { tf10: Math.random()*5, tf60: Math.random()*30, tf180: Math.random()*65, tf360: Math.random()*75, inc10:true, inc60:true, inc180:true, inc360:true }
};

function updateMeter(m){
  let step = Math.random()*(0.8-0.05)+0.05;
  if(m.increasing){
    m.value+=step;
    if(m.value>=90){ m.value=90; m.increasing=false; }
  }else{
    m.value-=step;
    if(m.value<=10){ m.value=10; m.increasing=true; }
  }
}

function updateTimeframe(tf, max, minStep, maxStep, key){
  let step = Math.random()*(maxStep-minStep)+minStep;
  if(tf["inc"+key]){
    tf["tf"+key]+=step;
    if(tf["tf"+key]>=max){ tf["tf"+key]=max; tf["inc"+key]=false; }
  }else{
    tf["tf"+key]-=step;
    if(tf["tf"+key]<=0){ tf["tf"+key]=0; tf["inc"+key]=true; }
  }
}

exports.handler = async () => {
  // Update meters
  updateMeter(meters.boxingKing);
  updateMeter(meters.goldenEmpire);

  // Update timeframes
  Object.keys(timeframes).forEach(game=>{
    updateTimeframe(timeframes[game],5,0.01,0.09,"10");
    updateTimeframe(timeframes[game],30,0.04,0.29,"60");
    updateTimeframe(timeframes[game],65,0.07,0.43,"180");
    updateTimeframe(timeframes[game],75,0.09,0.57,"360");
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      boxingKing: { value: meters.boxingKing.value.toFixed(2), increasing: meters.boxingKing.increasing },
      goldenEmpire: { value: meters.goldenEmpire.value.toFixed(2), increasing: meters.goldenEmpire.increasing },
      timeframes
    })
  };
};