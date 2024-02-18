// window.addEventListener('popstate', () => {
//     confirmFirst('popstate')
// })
// window.addEventListener('beforeunload', () => {
//     confirmFirst('beforeunload')
// })

window.addEventListener('pagehide', () => {
    confirmFirst('pagehide')

})

confirm('v4')

function confirmFirst(eventName) {
  if(confirm("Leave the page?" + eventName)){
    console.log("You are leaving the page")
  }else{
    return false;
  }
}
