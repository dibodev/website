// window.addEventListener('popstate', () => {
//     confirmFirst('popstate')
// })
// window.addEventListener('beforeunload', () => {
//     confirmFirst('beforeunload')
// })

// window.addEventListener('pagehide', () => {
//     confirmFirst('pagehide')
//
// })
//
// confirm('v4')
//
// function confirmFirst(eventName) {
//   if(confirm("Leave the page?" + eventName)){
//     console.log("You are leaving the page")
//   }else{
//     return false;
//   }
// }


document.addEventListener("unload", () => {
  fetch('https://analytics.dibodev.com/projects', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ domain: `unload${Math.random()}` })
  }).then(res => res.json())
    .then(res => console.log(res));
});


document.addEventListener("beforeunload",() => {
    fetch('https://analytics.dibodev.com/projects', {
        method: 'POST',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ domain: `beforeunload${Math.random()}` })
    }).then(res => res.json())
        .then(res => console.log(res));
})

window.addEventListener('popstate', () => {
    fetch('https://analytics.dibodev.com/projects', {
        method: 'POST',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ domain: `popstate${Math.random()}` })
    }).then(res => res.json())
        .then(res => console.log(res));

})

// ios safari does not support pagehide
window.addEventListener('pagehide', () => {
  fetch('https://analytics.dibodev.com/projects', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ domain: `pagehide${Math.random()}` })
  }).then(res => res.json())
    .then(res => console.log(res));
})
