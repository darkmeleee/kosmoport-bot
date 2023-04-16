
const TelegramBot = require('node-telegram-bot-api')
const token = '6155987703:AAFxbDvH2EdIpy1YqfhyYrtLBaVVkbvlSI4'
const bot = new TelegramBot(token, { polling: true })
const fs = require("fs");
let path = "tokens.json";
var tokena = 'Bearer vk1.a.xb5YicvVh_hhvHcObIe_LwHDtRbdezxthx-GT0hJPT6B09FInieU0rtpKRpVWMeqTVmUvplkuU0obdrU1auxILM2IGtW9KHpKla6K0yt5RHaC-7KFhwz0U-maUw4PhVdmiVV4VtJ-_Xx686gmWFzbi2eTrHdzAgEoQcgKp1--8Bxq-55ebj_Jy-1_ITIbzMdgqk6G9ZXH_-p232jnufPEw';

const fetch = require("node-fetch");

const { abort } = require('process');
var num = 1;
var max = 0;
var userToken = "";
var myHeaders = new fetch.Headers();

bot.on("polling_error", console.log);



bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if(msg.text == "/start"){
    var options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
        [{ text: 'Расписание', callback_data: '1' },
        { text: 'Список курсов', callback_data: '2' }],
        [{ text: 'Мои курсы', callback_data: '3' }]
        ]
      })
      };
    bot.sendMessage(msg.chat.id, "Добро пожаловать в Космопорт.Курсы, здесь вы сможете получить необходимую информацию о курсах.\nЧтобы ввести ваш VkID введите /id *id*",options);
  }
  
  });

  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };

  if (action === '1'){
    var options = {
      chat_id: msg.chat.id,
        message_id: msg.message_id,
      reply_markup: JSON.stringify({
        inline_keyboard: [
        [{ text: 'Список курсов', callback_data: '2' },
        { text: 'Мои курсы', callback_data: '3' }],
        
        ]
      })
      };
      bot.editMessageText("Космопорт работает ежедневно с 8:00 до 17:00", options);
  }
  
  if (action === '3') {
	const jsonfile = fs.readFileSync(path, "utf8");
    const users = JSON.parse(jsonfile);
    let id = null;
	var options = {
		chat_id: msg.chat.id,
        message_id: msg.message_id,
		reply_markup: JSON.stringify({
		  inline_keyboard: [
		  [{ text: 'Расписание', callback_data: '1' },
		  { text: 'Список курсов', callback_data: '2' }],
		  [{ text: 'Мои курсы', callback_data: '3' }]
		  ]
		})
		};

    for(var i=0; i<users.length; i++){
        if(users[i].tgid == msg.chat.id){
            id = users[i].vkid;
            break;
        }
    }
	if(id == null){
		bot.editMessageText("Введите ваш ID Вконтакте используя /id", options);
	}
	else{

	}

	var options = {
        chat_id: msg.chat.id,
          message_id: msg.message_id,
        reply_markup: JSON.stringify({
          inline_keyboard: [
          [{ text: 'Расписание', callback_data: '1' },
          { text: 'Список курсов', callback_data: '2' }],
          
          ]
        })
        };



    async function getImposter(gid){
      let response = await fetch(`https://kp-back.gesti.tech/api/user?id=${gid}`, {method: 'GET'});
	  if(response.status != "200"){
		bot.editMessageText("Ваш ID неверен, исправьте его", options);
		return;
	  }
      const obj = JSON.parse(await response.text());
      let texta = "";
      var num = 0;
      for (let course of obj.courses){
        num = num + 1;
        texta = texta +`${num}. `+ course.name + ` - ${course.schedule.toLowerCase()}` + "\n";
      }
      
        bot.editMessageText(texta, options);
      
    }
    getImposter(id);
  }
  if(action === '2'){
    num = 1;
    async function getImposter(){
      myHeaders = new fetch.Headers({
        'Authorization': tokena
        });
      let response = await fetch('https://kp-back.gesti.tech/api/courses', {headers: myHeaders, method: 'GET'});
      const obj = JSON.parse(await response.text());
      //let texta = "";
      for (let course of obj){
        max = max + 1;
      }
      console.log(max);
        
      //  num = num + 1;
    //    texta = `+ course.name + ` + `- ${course.schedule.toLowerCase()}` + "\n";
        var options = {
          chat_id: msg.chat.id,
            message_id: msg.message_id,
          reply_markup: JSON.stringify({
            inline_keyboard: [
            [{ text: '◀️', callback_data: '11' },
            { text: '✅', callback_data: '12' },
            { text: '▶️', callback_data: '13' }],
            [{text: 'Назад', callback_data: "14"}]
            ]
          })
          }; 
      //}
      bot.editMessageText(`(${num}/${max}):\n${obj[num-1].name}\n${obj[num-1].description}\n${obj[num-1].schedule}`, options);



    //  bot.sendMessage(msg.chat.id, `${obj[0].name} - ${obj[0].schedule}`, options);
    }
    getImposter();
  }
  if(action === "14"){
    num = 0;
    max = 0;
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    var options = {
      chat_id: msg.chat.id,
        message_id: msg.message_id,
      reply_markup: JSON.stringify({
        inline_keyboard: [
        [{ text: 'Расписание', callback_data: '1' },
        { text: 'Список курсов', callback_data: '2' }],
        [{ text: 'Мои курсы', callback_data: '3' }]
        ]
      })
      };
      bot.editMessageText(`Добро пожаловать в Космопорт.Курсы, здесь вы сможете получить необходимую информацию о курсах.`, options);
  }
  if(action === '11'){
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    
    async function getImposter(){
      myHeaders = new fetch.Headers({
        'Authorization': tokena
        });
      let response = await fetch('https://kp-back.gesti.tech/api/courses', {headers: myHeaders, method: 'GET'});
      const obj = JSON.parse(await response.text());
      //let texta = "";
      //for (let course of obj){
        
      //  num = num + 1;
    //    texta = `+ course.name + ` + `- ${course.schedule.toLowerCase()}` + "\n";
        var options = {
          chat_id: msg.chat.id,
            message_id: msg.message_id,
          reply_markup: JSON.stringify({
            inline_keyboard: [
            [{ text: '◀️', callback_data: '11' },
            { text: '✅', callback_data: '12' },
            { text: '▶️', callback_data: '13' }],
            [{text: 'Назад', callback_data: "14"}]
            ]
          })
          }; 
      //}
      if(num > 1 && num <= max){
        num = num - 1;
      
        bot.editMessageText(`(${num}/${max}):\n${obj[num-1].name}\n${obj[num-1].description}\n${obj[num-1].schedule}`, options);
      }

    //  bot.sendMessage(msg.chat.id, `${obj[0].name} - ${obj[0].schedule}`, options);
    }
    getImposter();
  }
  if(action === '13'){
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    
    
    console.log(num);
    async function getImposter(){
      myHeaders = new fetch.Headers({
        'Authorization': tokena
        });
      let response = await fetch('https://kp-back.gesti.tech/api/courses', {headers: myHeaders, method: 'GET'});
      const obj = JSON.parse(await response.text());
      //let texta = "";
      //for (let course of obj){
        
      //  num = num + 1;
    //    texta = `+ course.name + ` + `- ${course.schedule.toLowerCase()}` + "\n";
        var options = {
          chat_id: msg.chat.id,
            message_id: msg.message_id,
          reply_markup: JSON.stringify({
            inline_keyboard: [
            [{ text: '◀️', callback_data: '11' },
            { text: '✅', callback_data: '12' },
            { text: '▶️', callback_data: '13' }],
            [{text: 'Назад', callback_data: "14"}]
            ]
          })
          }; 
      //}
      if(num >= 1 && num < max){
        num = num + 1;
        console.log(num);
      
        bot.editMessageText(`(${num}/${max}):\n${obj[num-1].name}\n${obj[num-1].description}\n${obj[num-1].schedule}`, options);
      }

    //  bot.sendMessage(msg.chat.id, `${obj[0].name} - ${obj[0].schedule}`, options);
    }
    getImposter();
  }




  if(action === '12'){ 
    num = 0;
    max = 0;
    // https://kp-back.gesti.tech/api/courses/attend
    async function getImposter(){
      myHeaders = new fetch.Headers({
        'Authorization': tokena
        });
      fetch('https://kp-back.gesti.tech/api/courses/attend', {headers: myHeaders, method: 'POST', body: num});
      
      const msg = callbackQuery.message;
      var options = {
          chat_id: msg.chat.id,
          message_id: msg.message_id,
          reply_markup: JSON.stringify({
          inline_keyboard: [
          [{ text: 'Расписание', callback_data: '1' },
          { text: 'Список курсов', callback_data: '2' }],
          [{ text: 'Мои курсы', callback_data: '3' }]
          ]
        })
        };
        console.log('adasdas');
        bot.editMessageText(`Ваша заявка успешно добавлена, ожидайте подтвеждения от администрации`, options);
    }
    getImposter()
  }
  
  
  });

bot.onText(/\/id (.+)/, (msg, match) => {

	async function getImposter(gid, ida){
		let response = await fetch(`https://kp-back.gesti.tech/api/user?id=${gid}`, {method: 'GET'});
		if(response.status != "200"){
		  bot.sendMessage(ida, 'Ваш ID не верен');
		}
		else{
			bot.sendMessage(ida, 'Ваш ID введен')
		}
	}



  const chatId = msg.chat.id;
  const resp = match[1];
  let isFound = false;
  let path = "tokens.json";
  getImposter(resp, chatId);


  


  const user = {"tgid": chatId, "vkid": resp};
  let data = fs.readFileSync(path, "utf8");
  let users = JSON.parse(data);
  for(var i=0; i<users.length; i++){
	if(users[i].tgid == chatId){
		users[i].vkid = resp;
		isFound = true;
		break;
	}
}
	if(isFound == false){
		users.push(user);
	}
	data = JSON.stringify(users);
	fs.writeFileSync(path, data);
	

})