
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.slice(0,6) === 'hello '){
    text=text.slice(5,text.length-1)
    text=text.trim();
    hello(text)
  }
  else if(text==='hello\n'){
    hello('')
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text==='list\n'){
    list()
  }
  else if(text.slice(0,4)==='add '){
    text=text.slice(3,text.length-1);
    text=text.trim();
    add(text);
  }
  else if(text==='add\n'){
    add('')
  }
  else if(text.slice(0,7)==='remove '){
    text=text.slice(6,text.length-1);
    text=text.trim();
    remove(text);
  }
  else if(text==='remove\n'){
    remove(todoList.length)
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * hello name => Display hello name! 
 * hello => Display hello!
 * @param {string} name
 * @returns {void}
 */
function hello(name){
  name.length !=0 ? console.log(`hello ${name}!`): console.log('hello!');
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * Display the list of all commands
 *
 * @returns {void}
 */
function help(){
  console.log('help: display list of all commands \nexit or quit: exits the application \nhello: says hello!')
}

let todoList=['grocery', 'get a new shoes', 'buy line recharge card'];

 /**
 * prints the todo list
 * @returns {void}
 */
function list(){
  todoList.map((todo, index) => console.log(`[${index=index+1}] ${todo}`))
}

 /**
 * add todo => add todo to your list
 * add => display an error
 * @param  {string} todo the text received
 * @returns {void}
 */
function add(todo){
  todo.length != 0 ? todoList.push(todo): console.log('error!: please enter a todo')
}

/**
 * remove => remove last todo in todo list
 * remove x => remove todo number x in todo list
 * @param  {string} index the text received
 * @returns {void}
 */
function remove(index){
  index=parseInt(index);
  if(!index){todoList.pop()}
  else{
    if(index >0 && index<=todoList.length){
      todoList.splice(parseInt(index)-1,1)
    }
    else if(index === 0 ||index>todoList.length ){
      console.log('error!: please enter a number that exists in your todo list')
    }
  }
}

// The following line starts the application
startApp("Nabigha Mogharbel")
