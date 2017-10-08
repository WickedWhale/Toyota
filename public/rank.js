   /*
		
    phone number: <input type="text" id="phonenumber"><br>
    <input type="submit" value="Notify Dealer" onclick="notifyDealer()"> <br>
    <button onclick="showData()">Pull data from database</button>
   */



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
          rankCars(MUST, MUST, MUST, MUST, MUST, MUST,MUST, MUST, MUST, MUST, 25000);
          }

        function rankCars(L, P, T, I, F, S, G, R, B, H, price){
          var bestAffordable;
          var bestCheaper;
          var bestExpensive;
          var cars = new Map();
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

          databaseRef.child("cars").on('child_added', function(snapshot) {
                  var stuff = snapshot.val();
                  cars.set(snapshot.key(), stuff);
                });
                console.log(cars);


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

          for (car in carsList){
              var name = carsList[car];
              var carsPrice = cars.get(name).price;
              if (carsPrice > price){
                continue;
              } else {
                bestAffordable = cars.get(name);
                break;
              }
          }

          for (car in carsList){
              var name = carsList[car];
              var carsPrice = cars.get(name).price;;
              if (carsPrice < bestAffordable.price){
                continue;
              } else {
                bestCheaper = cars.get(name);
                break;
              }
          }

          bestExpensive = cars.get(carsList[0]);
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
 
        function notifyDealer(){
          var customer  = document.getElementById("phonenumber").value;
          // Twilio Credentials 
          var accountSid = 'AC2b0b3d93f83c517cf4ff08b9871143ba'; 
          var authToken = '4dd64c7d00e49d037f34be10e12d63c6'; 
           
          //require the Twilio module and create a REST client 
          var client = require('twilio')(accountSid, authToken); 
           
          client.messages.create({ 
              to: customer, 
              from: "+6159430239", 
              body: "Thanks for shopping with Toyota!", 
          }, function(err, message) { 
              console.log(message.sid); 
          });

          console.log("message sent");
        }