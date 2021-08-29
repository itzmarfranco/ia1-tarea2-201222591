function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

// Metodo para incrementar los contadores de cada estado
function status_count(states){
    let location = states[0];
    let sideA = states[1];
    let sideB = states[2];

    let position = 1;
    
    if(sideA == "DIRTY" && sideB == "DIRTY"){
      position = 1;
    }else if(sideA == "DIRTY" && sideB == "CLEAN"){
      position = 3;
    }else if(sideA == "CLEAN" && sideB == "DIRTY"){
      position = 5;
    }else{
      position = 7;
    }

    if(location != "A") position += 1;
    
    const cell = "estado"+position;
    let cont = parseInt( document.getElementById(cell).innerHTML );
    document.getElementById(cell).innerHTML = cont+1;
    
}

// Metodo para ensuciar los estados
function dirty_state(states){
    let location = states[0];
    let sideA = states[1];
    let sideB = states[2];

    // Obtengo un numero random para ver si ensucio el lado A
    let probability = Math.random() * (10 - 1) +1;

    if(sideA == "CLEAN" && probability > 6.5){
        states[1] = "DIRTY";
        print_action(location, "DIRTY SIDE A");
    }

    // Vuelvo a obtener otro numero random para ver si ensucio el lado B
    probability = Math.random() * (10 - 1) +1;
    if(sideB == "CLEAN" && probability > 6.5){
        states[2] = "DIRTY";
        print_action(location, "DIRTY SIDE B");
    }

    return states;
}

// Metodo para revisar si ya se llego 2 veces en cada estado
function check_counters(){
    for(let i=1; i < 9 ;i++){
      let cell = "estado"+i;
      let cont = parseInt( document.getElementById(cell).innerHTML );
      if(cont < 2) return false;
    }
    return true;
}

// Metodo para realizar alguna accion con la aspiradora
function test(states){
      // Reviso el estado actual para incrementar el contador
      status_count(states);

       var location = states[0];		
       var state = states[0] == "A" ? states[1] : states[2];
       var action_result = reflex_agent(location, state);
       print_action(location, action_result);
       if (action_result == "CLEAN"){
         if (location == "A") states[1] = "CLEAN";
          else if (location == "B") states[2] = "CLEAN";
       }
       else if (action_result == "RIGHT") states[0] = "B";
       else if (action_result == "LEFT") states[0] = "A";		
 
       // Ensucio los lados que esten limpios aleatoriamente
       states = dirty_state(states);

       // Reviso si ya se llego al menos dos veces cada estado
       if( !check_counters() ) setTimeout(function(){ test(states); }, 750);
       else document.getElementById("terminado").style = 'block';
}

function print_action(location, action){
  document.getElementById("log").innerHTML+= `<br>Location: ${location} | Action: ${action}`;
}

var states = ["A","DIRTY","DIRTY"];
test(states);