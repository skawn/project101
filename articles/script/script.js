let data = document.getElementById("data").getElementsByTagName("tbody")[0]
let selectAll = document.getElementById("selectAll")
let removeAll = document.getElementById("removeAll")
let addBtn = document.getElementById("addBtn")
let editBtn = document.getElementById("editBtn")
let searchBtn = document.getElementById("searchBtn")
let addCat = document.getElementById("addCat")
let pgUp = document.getElementById("pgUp")
let pgDw = document.getElementById("pgDw")
let logout = document.getElementById("logout")

var msg = document.getElementById("msg")
let search = document.getElementById("search")
let libele = document.getElementById("product")
let qte = document.getElementById("quantity")
let price = document.getElementById("price")
let comp = document.getElementById("mark")
let cat = document.getElementById("category")
let filtering = document.getElementById('filtering')
let loadingIcon = document.getElementById('loadingIC')
let mm = document.getElementById("date-m")
let dd = document.getElementById("date")
let yyyy = document.getElementById("date-y")
let modal = document.getElementById("modal")
let pag = document.getElementById('numeros')
let pagina = document.getElementsByClassName('pagination')

let dataBuffer
let checkedID = []
let pgStartID = []
let isChecked = false
let searchFilter = 'f' // first item ~ f ff fff
let iPage = 0
let st = 0
const pgLimit = 10
const pglen = request.pagiRefresh(pgLimit)

//show data from database
request.getAll(0,pgLimit)

//checkbox and delete withing html table click
data.addEventListener("click", e => {
  let element = e.target.getAttribute("id")
  let row = e.target.parentNode.parentNode.children
  if (element === "btnd") 
    domManipulation.delete_Maniputaltion(row,st)
  else if (element === "checked") 
    domManipulation.checkBox_Maniputaltion(e, row)
})

//select all and push ids to checkedID
selectAll.addEventListener("click", e => {
  let checkbox = data.getElementsByTagName('input')
  domManipulation.toggleSelectionButton()
  //selecting all checkboxes
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].checked = isChecked
    const id = checkbox[i].getAttribute('data')
    domManipulation.ArrayData(checkedID,isChecked, id)
  }
})

//delete selected data
removeAll.addEventListener("click", e => {
  e.preventDefault()
  if (checkedID.length) {
    if (confirm("are you sure?")) request.deleteFromDb(checkedID,st)
    if(isChecked) domManipulation.toggleSelectionButton()
  }
})

//insert if true
addBtn.addEventListener("click", e => {
  e.preventDefault()
  domManipulation.submiteWithValidation(true)
})

//update if false
editBtn.addEventListener("click", e => {
  e.preventDefault()
  domManipulation.submiteWithValidation(false)
})

//search
searchBtn.addEventListener("click", e => {
  e.preventDefault()
  let selectedFilter = domManipulation.toggleFilter()
  request.getSearchResults(selectedFilter,search.value)
})
search.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    let selectedFilter = domManipulation.toggleFilter()
    request.getSearchResults(selectedFilter,search.value)
  }else if (e.keyCode == 27) {
    search.value = ''
    request.getSearchResults( null ,'' )
  }
})

//Search filtering toggle
filtering.addEventListener("click",e => {
  try {
      let label = e.target.parentNode.children
      let targeted = e.target.children[0].getAttribute('id')
      searchFilter = targeted.split(' ')[0]

      for (let i = 0; i < 3; i++) {
          if(label[i].getAttribute('for') == searchFilter)
              label[i].children[0].style.opacity = 1
          else    
              label[i].children[0].style.opacity = .5  
      }
    } catch (error) {}
})

//show pagination
domManipulation.setPagination()

pgUp.addEventListener("click", e => {
  if(st < (pglen * pgLimit)-pgLimit) st += pgLimit
  domManipulation.paginationWork(1,st)
})

pgDw.addEventListener("click", e => {
  st -= pgLimit
  if(st < 0) st = 0
  domManipulation.paginationWork(0,st)
})

// Redirect
addCat.addEventListener("click", e => {
  e.preventDefault()
  window.location.href = 'categories.php'
})

logout.addEventListener("click", request.logout )