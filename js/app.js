console.log("Zipcode App Connected!");
//select form 
 var zipForm = document.getElementById("zipform");
//add event listener
zipform.addEventListener("submit", getLocationInfo);
//event listener for delete
var deleteButton = document.querySelector("body");

deleteButton.addEventListener("click", deleteLocation);

//function
function getLocationInfo(event){
	// console.log("123");
	//get zip value from input
	var zip = document.querySelector(".zip").value;
	// console.log(zip);
	//make request
	fetch(`https://api.zippopotam.us/us/${zip}`)
		// .then(response => response.json())
		// .then(data => {
		// 	console.log(data);
		// });
		.then(response => {
			if(response.status != 200){
				showIcon("remove");
				document.querySelector("#output").innerHTML = 
				`
					<article class="message is-danger">
  						<div class="message-header">
    						<p>Uh-Oh!</p>
    						<button class="delete" aria-label="delete"></button>
  						</div>
  						<div class="message-body">
    						That doesn't seem to be a valid zipcode!  Please try again.
  						</div>
					</article>
				`;
				throw Error(response.statusText);
			} else {
				showIcon("check")
				return response.json();
			}
		})
		.then(data => {
			// console.log(data);
			//loop thru data and show
			var output = "";
			data.places.forEach(place => {
				output += 
				`
					<article class="message is-info">
					  <div class="message-header">
					    <p>Zipcode Info</p>
					    <button class="delete" aria-label="delete"></button>
					  </div>
					  <div class="message-body">
					   	<ul>
					   		<li><strong>City: </strong>${place["place name"]}</li>
					   		<li><strong>State: </strong>${place["state"]}</li>
					   		<li><strong>Longitude: </strong>${place["longitude"]}</li>
					   		<li><strong>Latitude: </strong>${place["latitude"]}</li>
					   	</ul>
					  </div>
					</article>	
				`;
			});
			//insert into output div
			document.querySelector("#output").innerHTML = output;
		})
		.catch(err => console.log(err));

	event.preventDefault(); //prevents submit from flashing and disappearing from console
}
//show check or x icon in input field
function showIcon(icon){
	//clear icons first
	document.querySelector(".icon-remove").style.display = "none";
	document.querySelector(".icon-check").style.display = "none";
	//show correct icon 
	document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

//delete location button ability
function deleteLocation(event){
	if(event.target.className == "delete"){
		// console.log("2134");
		document.querySelector(".message").remove();
		document.querySelector(".zip").value = "";
		document.querySelector(".icon-check").remove();
	}
}