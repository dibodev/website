window.onbeforeunload = confirmFirst;

function confirmFirst() {
  if(confirm("Leave the page?")){
    console.log("You are leaving the page")
  }else{
    return false;
  }
}
