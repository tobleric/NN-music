let model;
let outcome;
let table;

let fields = []

function preload() {
    table = loadTable( "michelin.csv", "header", "csv")
  
}


function setup() 
{
	noCanvas();
	getOptions()
	let options = {
		dataUrl: 'michelin.csv',
		inputs: ['region', 'price'],
		outputs: ['stars'],
		task: 'classification',
		debug: true
	};

	model = ml5.neuralNetwork(options, modelReady);

	trainButton = select('#train');
	trainButton.mousePressed( function() {

		let trainOptions = {
			epochs: 30
		};

		model.train(trainOptions, whileTraining, doneTraining)
		console.log(model.data)

	});

	predictButton = select('#predict')
	predictButton.mousePressed(classify)
	predictButton.hide();

}


function whileTraining(epoch, loss) {
	console.log(epoch, loss)
}



function doneTraining() {
	predictButton.show();
	trainButton.hide();
	console.log("Training done")
}



function classify() {

	let region = parseInt(select('#region').elt.value)
	let price = parseInt(select('#price').elt.value)

	let userInputs = {
		region: region,
		price: price
	};

	model.classify(userInputs, gotResults) 
}


function gotResults(error, result) {
	if(error) {
		console.log(error) 
		return
	} else {
		console.log(result);
		if (result[0].label == "*") {
		  outcome = "1 Stern";
		} else if (result[0].label == "**"){
		  outcome = "2 Sterne";
		} else {
			outcome = "3 Sterne";
		  }
		
		select("#result").html(
		  outcome
		);
	  }

}


function modelReady() {
	console.log('Model Loaded')
	model.normalizeData();
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
      option.value = j
      console.log(option.value)

    }


}

function getUniqueValues(array) {

    let newarray = array.filter((element, index, array) => array.indexOf(element) === index);
    return newarray;

}
