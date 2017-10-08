   

      var databaseRef = new Firebase("https://toyota-f0ad8.firebaseio.com/");
        var  OptionEnum = {
        MUST : 0,
        NICE : 1,
        IMPARTIAL : 2,
        NOT: 3,
    }


      var cars = [];

        function collectData() {
          var content = document.getElementById("content").value;
            databaseRef.child("cars").push({username:username, content:content});
            return false;
           }


        
        function showData(){
            MUST = "must";
            NICE = "nice";
            IMPARTIAL = "impartial";
            NOT ="not";
          rankCars(MUST, MUST, MUST, MUST, MUST, MUST,MUST, MUST, MUST, MUST, 32000);
          }


			        /*
			"leather"
			'parkingassist'
			tv
			infotainment
			4wd
			safetysense
			glass-roof
			rear-parking
			blind-spot
			high-quality-radio
			*/


			function getUserData(){

				var leather =  document.getElementsByName("leather");
				for(var i =0; i<leather.length; i++){
					if (leather[i].checked){
						var L = leather[i].id;
					}
				}

				var parkingassist =  document.getElementsByName("parkingassist");
				for(var i =0; i<parkingassist.length; i++){
					if (parkingassist[i].checked){
						var P = parkingassist[i].id;
					}
				}

				var tv =  document.getElementsByName("tv");
				for(var i =0; i<tv.length; i++){
					if (tv[i].checked){
						var T = tv[i].id;
					}
				}

				var infotainment =  document.getElementsByName("infotainment");
				for(var i =0; i<infotainment.length; i++){
					if (infotainment[i].checked){
						var I = infotainment[i].id;
					}
				}

				var fwd =  document.getElementsByName("4wd");
				for(var i =0; i<fwd.length; i++){
					if (fwd[i].checked){
						var F = fwd[i].id;
					}
				}

				var safetysense =  document.getElementsByName("safetysense");
				for(var i =0; i<safetysense.length; i++){
					if (safetysense[i].checked){
						var S = safetysense[i].id;
					}
				}

				var glassroof=  document.getElementsByName("glass-roof");
				for(var i =0; i<glassroof.length; i++){
					if (glassroof[i].checked){
						var G = glassroof[i].id;
					}
				}

				var rearparking =  document.getElementsByName("rear-parking");
				for(var i =0; i<rearparking.length; i++){
					if (rearparking[i].checked){
						var R = rearparking[i].id;
					}
				}

				var blindspot =  document.getElementsByName("blind-spot");
				for(var i =0; i<blindspot.length; i++){
					if (blindspot[i].checked){
						var B = blindspot[i].id;
					}
				}

				var highqualityradio =  document.getElementsByName("high-quality-radio");
				for(var i =0; i<highqualityradio.length; i++){
					if (highqualityradio[i].checked){
						var H = highqualityradio[i].id;
					}
				}

				var price = document.getElementById("price").value;
				rankCars(L, P, T, I, F, S, G, R, B, H, price); 

        		//window.open("results.html");
			}

	function pullingRoutine(){
		var cars = new Map();
		databaseRef.child("cars").on('child_added', function(snapshot) {
        var stuff = snapshot.val();

        cars.set(snapshot.key(), stuff);
         });
        return cars;
	}

	function rankCars(L, P, T, I, F, S, G, R, B, H, price){

		    MUST = "must";
            NICE = "nice";
            IMPARTIAL = "impartial";
            NOT ="not";
          var bestAffordable;
          var bestCheaper;
          var bestExpensive;
          var affordableCar;
          var cheaperCar;
          var expensiveCar;
          
          var featuresMap = new Map();
              featuresMap.set("FOUR_WHEEL_DRIVE", F);
              featuresMap.set("BLIND_SPOT_MONITOR", B);
              featuresMap.set("GLASS_ROOF", G);
              featuresMap.set("HIGH_QUALITY_AUDIO", H);
              featuresMap.set("INFOTAINMENT", I);
              featuresMap.set("LEATHER_SEATS", L);
              featuresMap.set("PARKING_ASSIST", P);
              featuresMap.set("REAR_CAMERA", R);
              featuresMap.set("SAFE_SENSE", S);
              featuresMap.set("TELEVISION", T);

var cars = pullingRoutine();
			cars = pullingRoutine();
			


          var carsList = Array.from(cars.keys());
          var scoremap = new Map();
          for(car in carsList){
            cars.get(carsList[car]);

             scoremap.set(carsList[car], scoreCar(featuresMap, cars.get(carsList[car])));


            }
          carsList.sort(function(a, b){
            return scoremap.get(b) - scoremap.get(a);
          });
          console.log(carsList[0], scoremap.get(carsList[0]));
          
          //var scoreMap; // map of car to score
          // for loop through cars in inventory
            // insert car into map with score, use score car function to get score
          // sort list of cars based on score from scoremap
          // return top 30 cars
          var i = 0;
          for (car in carsList){
          	if(i ==0){
          		i++;
          		continue;
          	}
              var name = carsList[car];
              var carsPrice = cars.get(name).price;
              if (carsPrice > price){
                continue;
              } else {
                bestAffordable = cars.get(name);
                bestAffordableCar = name;
                break;
              }
          }

          for (car in carsList){
              var name = carsList[car];
              var carsPrice = cars.get(name).price;;
              if (carsPrice >= bestAffordable.price){
                continue;
              } else {
                bestCheaper = cars.get(name);
                bestCheaperCar = name;
                break;
              }
          }

          bestExpensive = cars.get(carsList[0]);
          bestExpensiveCar = carsList[0];

          if (bestAffordable == undefined){
          	//console.log("Wait please1");
          	window.alert("Are you ready to see the cars., if yes please click SUBMIT!");

          } else {


		          //console.log(bestAffordable);
		          //console.log(bestCheaper);
		          //console.log(bestExpensive);
		          localStorage.setItem("bestAffordable", JSON.stringify(bestAffordable));
		          localStorage.setItem("bestAffordableCar", bestAffordableCar);


		          localStorage.setItem("bestCheaper", JSON.stringify(bestCheaper));
		          localStorage.setItem("bestCheaperCar", bestCheaperCar);


		          localStorage.setItem("bestExpensive", JSON.stringify(bestExpensive));
		          localStorage.setItem("bestExpensiveCar", JSON.stringify(bestExpensiveCar));
		          window.open("results.html");	
          }
        }

        function scoreCar(featuresMap, car){

          var featuresList = Array.from(featuresMap.keys());
          //console.log(car.features);
          var score = 0;
          if (car.features == undefined){
            return -1;
          }
          for (feature in featuresList){
            var key = featuresList[feature];
            var HAVE_MOD = 1.2;
            var MISS_MOD = 1.2;     
            //console.log(key);
            if(car.features[key])   { 
             switch(featuresMap.get(key)){

                case NOT:
                  score -= 7 * MISS_MOD;
                  MISS_MOD += 1.25;
                  break;
                case MUST:
                  score += 10 * HAVE_MOD;
                  HAVE_MOD *= 1.25;
                  break;
                case NICE:
                  score += 7 * HAVE_MOD;
                  HAVE_MOD *= 1.1;
                  break;
                 case IMPARTIAL:
                  score += 3;
                  break;
                }

              } else{
                switch(featuresMap.get(key)){

                case NOT:
                  score += 5 * MISS_MOD;
                  break;
                case MUST:
                  score -= 3 * MISS_MOD;
                  MISS_MOD += .1;
                  break;
                case NICE:
                  score -= 3;
                  break;
                 case IMPARTIAL:
                  score -= 0;
                  break;
                }
              }   
        }
        return score;
      }
 
       