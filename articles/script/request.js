let request = (function(){

  function getAll(start = 0,limit=5) {
    //startFrom is the index to start the pagination
    $.ajax({
      type: "post",
      url: "../server/api.php",
      async: false, 
      data: { 
        action: "getAll",
        idGet:start,
        limit:limit
      },
      success: data => { 
        messageBox.logg(data)
        dataBuffer = JSON.parse(data)
      }
    })
    domManipulation.renderDataTable(dataBuffer)
  }

  let preSearchVal = null
  function getSearchResults(_arg,_sVal) {
      if (_sVal == '') { 
        refreshTable(st)
        preSearchVal = null
        return 
      }
      if (preSearchVal == _sVal) return 
      //check if it's the same _sVal
      loadingIcon.style.display = "block"
      $.ajax({
        type: "post",
        url: "../server/api.php",
        data: { 
          action: "Search",
          argum: _arg,
          searchValue: _sVal
        },
        success: data => { 
          setTimeout(() => {
            loadingIcon.style.display = "none"
            let _data = JSON.parse(data)
            if(_data.length){
              domManipulation.renderDataTable(_data)
              domManipulation.setPagination(0)
            }
            else
              console.log('Nothing found!')
          }, 1000);
        }
      });
      preSearchVal = _sVal
  }
  function feedback(x,_text) {
    if (x == 1) {
      msg.innerText = _text
      msg.classList.add("animate_s")
      setTimeout(() => {
        msg.classList.remove("animate_s")
      }, 3001);
    }else{
      msg.innerText = "Error"
      msg.classList.add("animate_err")
      setTimeout(() => {
        msg.classList.remove("animate_err")
      }, 3001);
    }
  }
  function addUpdate(items, method,_st) {
      let _action = "Add"
      let txt = "Added successfully"
      if (!method){
        _action = "Edit"
        txt = "Edited successfully"
      } 
        
      const record = {
        action: _action,
        IDArticle: items[0],
        Libele: items[1],
        Echeance: items[2],
        Qte: items[3],
        NomCategorie: items[4],
        NomCompagne: items[5],
        Prix: items[6]
      }
      $.ajax({
        type: "post",
        url: "../server/api.php",
        data: record,
        success: data => { 
          const x = messageBox.logg(data)
          feedback(x, txt)
          refreshTable(_st)
        }
      });
  } 

  function deleteFromDb(id,_st) {
      const record = { action: "Delete", IDArticle: id}
      $.ajax({
        type: "post",
        url: "../server/api.php",
        data: record,
        success: msg => {
          const x = messageBox.logg(msg)
          feedback(x,"Deleted successfully")
          checkedID = []
          refreshTable(_st)
        }
      });
  }

  function pagiRefresh(_pgLimit){
    let count = 0
    $.ajax({
      type: "post",
      url: "../server/api.php",
      async: false,
      data: { action: "Pagin" },
      success: data => {
        count = JSON.parse(data)
      }
    });
    const x = parseInt(count[0]['0'])
    return Math.ceil(x / _pgLimit)
  }

  function refreshTable(_start) {
    domManipulation.setPagination()
    domManipulation.paginationWork(-1,_start)
  }

  function login(_user,_pass,err) {
    const record = { action: "Login", user: _user, pass:_pass }
    $.ajax({
      type: "post",
      url: "server/api.php",
      data: record,
      success: msg => {
        const _success = messageBox.logg(msg)
        if (_success == 1){
          err.style.visibility = "hidden"
          window.location.href = 'dashboard'
        }else err.style.visibility = "initial"
      }
    });
  }

  function logout() {
    $.ajax({
      type: "post",
      url: "../server/api.php",
      data: { action: "Logout"},
      success: data => { 
        if(data == "denied") window.location.href = 'http://localhost/articles/'
      }
    });
  }

  return {
    getSearchResults:getSearchResults,
    deleteFromDb:deleteFromDb,
    pagiRefresh:pagiRefresh,
    addUpdate:addUpdate,
    getAll:getAll,
    logout:logout,
    login:login
  }

})()