let table;

let fields = []

function preload() {
    table = loadTable( "michelin.csv", "header", "csv")
  
}

function setup() {

 noCanvas();
 getOptions()
 
}

function getOptions() {
  
    let region = document.getElementById("region")

    let rows = table.getRows()
    for (let i = 0; i< rows.length; i++) {
        let regionName = rows[i].getString("region")
        fields.push(regionName)
    }
    let uniqueValues = getUniqueValues(fields)


    //selection via DOM
    for ( let j = 0; j < uniqueValues.length; j++ ) {
      let option = document.createElement("option")
      region.appendChild(option)
      option.text = uniqueValues[j]
      option.value = j+1
      console.log(option.value)

    }


}

function getUniqueValues(array) {

    let newarray = array.filter((element, index, array) => array.indexOf(element) === index);
    return newarray;

}
