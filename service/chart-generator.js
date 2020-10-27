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

function generateCart(pair_id,randMaxValue,length) {
  const chart = []
  for (i = 0; i < length; i++) {
    chart.push(generateCandel(pair_id,randMaxValue))
  }
  return chart
}


console.log(generateCart('eth-btc',10,30));


