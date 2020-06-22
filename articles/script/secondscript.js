let dataCategories = document.getElementById("showCateg")
let dataMark = document.getElementById("showMark")
let dropdownMark = document.getElementById("MarkCateg")
let addCategorie = document.getElementById("addCategorie")
let addMark = document.getElementById("addMark")
let MarkCateg = document.getElementById("MarkCateg")
let err = document.getElementById("err")

let addCatBtn = document.getElementById("addCatBtn")
let editCatBtn = document.getElementById("editCatBtn")
let addMarkBtn = document.getElementById("addMarkBtn")
let editMarkBtn = document.getElementById("editMarkBtn")
let deleteCatBtn = document.getElementById("deleteCatBtn")
let deleteMarkBtn = document.getElementById("deleteMarkBtn")


getAllSubData("`categorie`" , 1,dataCategories)
getAllSubData("`compagne`" , 0,dataMark)

dataCategories.addEventListener("click",e => {
    const elemnt = e.target
    if(elemnt.tagName == 'OPTION')
    addCategorie.value = elemnt.value
})

dataMark.addEventListener("click",e => {
    const elemnt = e.target
    if(elemnt.tagName == 'OPTION'){
        const options = elemnt.value.split('|')
        addMark.value = options[0]
        MarkCateg.value = options[1]
    }
})

addCatBtn.addEventListener("click",e => {
    const _valueC = addCategorie.value
    if(_valueC != '')
        Insert(_valueC, null)
})

editCatBtn.addEventListener("click",e => {
    const _valueC = addCategorie.value
    const _value = dataCategories.value
    if(_valueC != '')
        Edit(_valueC, null, _value)
})

addMarkBtn.addEventListener("click",e => {
    const _valueC = MarkCateg.value
    const _valueM = addMark.value
    if(_valueM != '')
        Insert(_valueC, _valueM)
})

editMarkBtn.addEventListener("click",e => {
    const _valueC = MarkCateg.value
    const _valueM = addMark.value
    const _value = dataMark.value.split('|')[0]
    if(_valueC != '' && _valueM != '')
        Edit(_valueC, _valueM, _value)
    
})

deleteCatBtn.addEventListener("click",e => {
    const _valueC = addCategorie.value
    const _Confirm = confirm("Are you sure?")
    if(_valueC != '' && _Confirm)
        Delete(_valueC, null)
})

deleteMarkBtn.addEventListener("click",e => {
    const _valueM = addMark.value
    const _Confirm = confirm("Are you sure?")
    if(_valueM != '' && _Confirm)
        Delete(null, _valueM)
})

function fillOptions(_data, _opt, _elemnt) {
    let option = ''  
    for(let i = 0; i < _data.length; i++){
        if(_opt)
            option += '<option value="'
            +_data[i].NomCategorie+ '">'
            +_data[i].NomCategorie+ '</option>'
        else
            option += '<option value="'
            + _data[i].NomCompagne + '|' 
            + _data[i].NomCategorie + '">'
            + _data[i].NomCompagne + '</option>'
    }
    _elemnt.innerHTML = option
    if(_opt) dropdownMark.innerHTML = option
}

function getAllSubData(_table, opt, elemnt) {
    $.ajax({
     type: "post",
     url: "../server/api.php",
     async: false, 
     data: { 
       action: "getSecond",
       tableName:_table
     },
     success: data => { 
         if(data != "denied"){
             const _data = JSON.parse(data)
             fillOptions(_data,opt,elemnt)
        }else request.logout()
     }
    })
}

function Insert(_categ, _mark) {
    $.ajax({
        type: "post",
        url: "../server/api.php",
        data: { 
          action: "insertGM",
          _categ:_categ,
          _mark:_mark
        },
        success: data => {
            if(data == "denied") request.logout()
            else{
                if(data == 0) err.style.visibility = "initial"
                else err.style.visibility = "hidden"
                if(_mark != null) getAllSubData("`compagne`" , 0, dataMark)
                else getAllSubData("`categorie`" , 1, dataCategories)
            }
        }
    })
}

function Edit(_categ, _mark, _baseValue) {
    $.ajax({
        type: "post",
        url: "../server/api.php",
        data: { 
          action: "editGM",
          _baseValue:_baseValue,
          _categ:_categ,
          _mark:_mark
        },
        success: data => {
            if(data == "denied") request.logout()
            getAllSubData("`categorie`" , 1, dataCategories)
            getAllSubData("`compagne`" , 0, dataMark)
        }
    })
}

function Delete(_categ, _mark) {
    $.ajax({
        type: "post",
        url: "../server/api.php",
        data: { 
          action: "deleteGM",
          _categ:_categ,
          _mark:_mark
        },
        success: data => {
            if(data == "denied") request.logout()
            getAllSubData("`categorie`" , 1, dataCategories)
            getAllSubData("`compagne`" , 0, dataMark)
        }
    })
}

logout.addEventListener("click", request.logout )