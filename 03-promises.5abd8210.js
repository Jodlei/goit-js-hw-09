function e(e,t){const o=Math.random()>.3;return new Promise(((n,r)=>{setTimeout((()=>{o?n({position:e,delay:t}):r({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.peventDefault();let o=Number(t.currentTarget.delay.value);const n=Number(t.currentTarget.step.value),r=Number(t.currentTarget.amount.value);for(let t=1;t<=r;t+=1)e(t,o).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)})),o+=n}));
//# sourceMappingURL=03-promises.5abd8210.js.map
