
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
let parsedData;
const fs = require('fs');
let source=process.argv[2]
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
 // let data=fs.readFileSync('./database.json');
 // parsedData=JSON.parse(data)
 // console.log(parsedData.todoList[0])
}

if(!source){
  const fs=require('fs')
  data=fs.readFileSync('./database.json')
  parsedData=JSON.parse(data)
  console.log('hye bye')
}else{
  try {
    const fs=require('fs')
    data=fs.readFileSync(source)
    console.log('try',data)
    parsedData=JSON.parse(data)
    console.log('file data', parsedData.code)
  }catch(err){
    const fs=require('fs')

  }
  const fs=require('fs')
  if(fs.existsSync(source)){
    const fs=require('fs')
    data=fs.readFileSync(source)
    console.log('file try')
    parsedData=JSON.parse(data)
  }
  else{
    parsedData={todoList:[]}
  }
  
  
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
  } else if(text==='remove\n'){
    remove(todoList.length)
  } else if(text==='edit\n'){
    console.log('error!: please enter a number of todo list to edit')
  } else if(text.slice(0,5)==='edit '){
    text=text.slice(5,text.length-1)
    text=text.split(' ')
    edit(text)
  } else if(text==='check\n'){
    console.log('error! you should provide number of todo')
  } else if(text.slice(0,6)==='check '){
    check(text.slice(6,text.length-1))
  } else if(text==='uncheck\n'){
    console.log('error!: you should provide the number of your todo')
  }else if(text.slice(0,8)==='uncheck '){
    unCheck(text.slice(8,text.length-1))
  } else{
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
  console.log(parsedData)
  const fs= require('fs')
  const data=JSON.stringify(parsedData)
  try{fs.writeFileSync(source,data)
  console.log('Saved successfuly')
  }catch(e){
    console.log('Batata error')
  }
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

 /**
 * prints the todo list
 * @returns {void}
 */
function list(){
  parsedData.todoList.map((todo, index) => {todo.done===false? console.log(`[${index=index+1}] [ ] ${todo.todo}`): console.log(`[${index=index+1}] [✓] ${todo.todo}`)})
}

 /**
 * add todo => add todo to your list
 * add => display an error
 * @param  {string} todo the text received
 * @returns {void}
 */
function add(todo){
  todo.length != 0 ? parsedData.todoList.push({todo: todo, done:false}): console.log('error!: please enter a todo')
}

/**
 * remove => remove last todo in todo list
 * remove x => remove todo number x in todo list
 * @param  {string} index the text received
 * @returns {void}
 */
function remove(index){
  let stringIndx=index
  console.log(index)
  index=parseInt(index);
  if(!index && stringIndx!='0'){console.log(index); parsedData.todoList.pop()}
  else if(index<=0||index>parsedData.todoList.length ){console.log('error!: please enter a number that exists in your todo list')}
  else{
    if(index >0 && index<=todoList.length){
      parsedData.todoList.splice(parseInt(index)-1,1)
    }
  }
}


function edit(newTitle){
  newTitle=newTitle.map(substring => substring.trim())
  let trimmedTitle=newTitle.filter(substring => substring != '')
  let index=parseInt(trimmedTitle[0])
  if(index  && parsedData.todoList.length >= index){
    trimmedTitle.shift();
    parsedData.todoList[index -1].todo=trimmedTitle.join(' ')
  }
  else if(index  && parsedData.todoList.length < index){
    console.log(`There is no todo number ${index} in your list`)
  }
  else if(!index && trimmedTitle.join('').length>0){
    parsedData.todoList[parsedData.todoList.length-1].todo=trimmedTitle.join(' ')
  }
  else{    console.log('error!: please enter a number that exists in your todo list')
}
}

/**
 * check => error!
 * check x => check your todo number x in todo list
 * @param  {string} index the text received
 * @returns {void}
 */
function check(index){
  let stringIndx=index
  console.log(index)
  index=parseInt(index);
  if(!index && stringIndx!='0'){console.log('error!: please enter a number that exist your todo list')}
  else if(index<=0||index>parsedData.todoList.length ){console.log('error!: please enter a number that exists in your todo list')}
  else{
    if(index >0 && index<=parsedData.todoList.length){
      parsedData.todoList[index-1].done=true;
    }
  }
}

/**
 * uncheck => error!
 * uncheck x => uncheck your todo number x in todo list
 * @param  {string} index the text received
 * @returns {void}
 */
function unCheck(index){
  let stringIndx=index
  console.log(index)
  index=parseInt(index);
  if(!index && stringIndx!='0'){console.log('error!: please enter a number that exist your todo list')}
  else if(index<=0||index>parsedData.todoList.length ){console.log('error!: please enter a number that exists in your todo list')}
  else{
    if(index >0 && index<=parsedData.todoList.length){
      parsedData.todoList[index-1].done=false;
    }
  }
}
// The following line starts the application
startApp("Nabigha Mogharbel")
