export let showSearch=()=>{
  return {
    type:"SHOW_Search",
    payload:true
  }
}

export let hideSearch=()=>{
  return {
    type:"HIDE_Search",
    payload:false
  }
}