var renderOption = (optionDefault, elementById, regions) => {
    elementById.prepend($("<option/>").attr({ selected: "selected", disabled: "disabled"}).text(optionDefault))

    if(regions){
        regions.forEach((element) => {
            elementById.append($("<option/>").attr({ value: element.id,}).text(element.displayName))
            return false
        })
        return true
    }else{
        return false
    }
}

var arrList = (arr, selection) => {
    var list = arr
    list.forEach(element => {
        if(element.id == selection){
            list = element
        }
    })
    return list
}


module.exports = {
    renderOption,
    arrList
}