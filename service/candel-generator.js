function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateCandel(pair_id,randMaxValue){
  const candel = {
    p: pair_id,
    d: Date.now(),
    o: getRandomInt(randMaxValue),
    h: getRandomInt(randMaxValue),
    l: getRandomInt(randMaxValue),
    c: getRandomInt(randMaxValue)
  }
  return candel
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function generateCandels(pair_id,randMaxValue) {
  while(1){
    const candel = generateCandel(pair_id,randMaxValue)
    console.log(candel);
    await sleep(1000);
  }
}



generateCandels('eth-btc',10)
// generateCandels('ltc-btc',100)
// generateCandels('xmr-btc',1000)

