const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.peventDefault();

  let elDelay = Number(evt.currentTarget.delay.value);
  const elStep = Number(evt.currentTarget.step.value);
  const elAmount = Number(evt.currentTarget.amount.value);

  for (let position = 1; position <= elAmount; position += 1) {
    createPromise(position, elDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    elDelay += elStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
