let  domManipulation = (function(){

    //get selected item inner text
    function getText(row, index) { return row[index].innerText; }

    //fromatting the date
    function dateFormat() {
        if (dd.value && mm.value && yyyy.value)
        return `${dd.value}/${mm.value}/${yyyy.value} `;
        return null
    }

    //delete from html table click
    function delete_Maniputaltion(row,_st) {
        const id = row[0].children[0].getAttribute("data")
        if (confirm("are you sure?")) request.deleteFromDb(id,_st)
    }

    //get checked item data
    function checkBox_Maniputaltion(e, row) {
        const id = e.target.getAttribute("data")
        const state = e.target.checked
        ArrayData(checkedID, state, id)
        setHtmlInputs(row)//inputs filling
    }

    //insert data to html inputs from clicked item
    function setHtmlInputs(row) {
        //----------- data in inputs ------------
        libele.value = domManipulation.getText(row, 2)
        comp.value = domManipulation.getText(row, 3)
        cat.value = domManipulation.getText(row, 4)
        qte.value = domManipulation.getText(row, 5)
        price.value = domManipulation.getText(row, 6)
        let dateArr = domManipulation.getText(row, 7).split('-')
        dd.value = dateArr[1]
        mm.value = dateArr[2]
        yyyy.value = dateArr[0]
    }

    //data validation before add or edit
    function submiteWithValidation(method) {
        let items = []
        items[0] = parseInt(checkedID[0])
        items[1] = libele.value
        items[2] = dateFormat()
        items[3] = qte.value
        items[4] = cat.value
        items[5] = comp.value
        items[6] = price.value
        if (items[1] && items[2] && items[3] && items[4] && items[5] && items[6]) {
        if (method) request.addUpdate(items, true, st)//add
        else if (items[0]) request.addUpdate(items, false, st)//update
        checkedID = []//empty array
        } else alert('fill everything!')
    }

    //add and delete checked data from an array
    function ArrayData(arr, state, id) {
        if (state) arr.push(id)
        else {
            const index = arr.indexOf(id)
            if (index > -1) arr.splice(index, 1)
        }
    }

    //insert data to the html table
    function renderDataTable(el,fi,li) {
        let row = ""
        for (let i = 0; i < el.length; i++) 
        row += '<tr><td><input type="checkbox" data="' +
            el[i].IDArticle + '" id="checked" class="checkbox"/></td>' +
            "<td>" + (i+1) + "</td>" +
            "<td>" + el[i].Libele + "</td>" +
            "<td>" + el[i].NomCompagne + "</td>" +
            "<td>" + el[i].NomCategorie + "</td>" +
            "<td>" + el[i].Qte + "</td>" +
            "<td>" + el[i].Prix + "</td>" +
            "<td>" + el[i].Echeance + "</td>" +
            '<td><button id="btnd" class="small_btn bin"></button></td></tr>'
        
        data.innerHTML = row
    }

    //select/deselect button 
    function toggleSelectionButton() {
        isChecked = !isChecked;
        if (isChecked) {
            selectAll.innerText = " deselect "
            selectAll.classList.add("selected")
        } else {
            selectAll.innerText = "select all"
            selectAll.classList.remove("selected")
        }
    }

    function toggleFilter(){
        let argum = `Libele`
        if (searchFilter == 'f') argum = `Libele`
        else if (searchFilter == 'ff') argum = `NomCompagne`
        else argum = `NomCategorie`
        return argum
    }

    function paginationWork(order,_start) {
        let pagesNumber = document.getElementsByClassName('pg')
        let start = _start
        
        if(iPage < pglen-1 && order == 1) iPage++
        else if(iPage > 0 && order == 0) iPage--

        for (let i = 0; i < pglen; i++) {
            if(iPage == i){
                pagesNumber[iPage].classList.add('pgAct')
                if(pagesNumber[i].innerText == '1') start = 0
            }else pagesNumber[i].classList.remove('pgAct')
        }
        request.getAll(start,pgLimit)
    }

    function setPagination(_srch) {
        let pglen = request.pagiRefresh(pgLimit)
        if(_srch != null) pglen = _srch
        let row = '<span class="pg pgAct">1</span>'
        for (let i = 1; i < pglen; i++) 
        { row += '<span class="pg">'+(i+1)+'</span>' }
        pag.innerHTML = row
    }

    return {
        checkBox_Maniputaltion:checkBox_Maniputaltion,
        submiteWithValidation:submiteWithValidation,
        toggleSelectionButton:toggleSelectionButton,
        delete_Maniputaltion:delete_Maniputaltion,
        renderDataTable:renderDataTable,
        paginationWork:paginationWork,
        setHtmlInputs:setHtmlInputs,
        setPagination:setPagination,
        toggleFilter:toggleFilter,
        ArrayData:ArrayData,
        getText:getText
    }

})()