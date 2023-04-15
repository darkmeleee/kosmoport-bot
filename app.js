const TelegramBot = require('node-telegram-bot-api')
const token = '6155987703:AAFxbDvH2EdIpy1YqfhyYrtLBaVVkbvlSI4'
const bot = new TelegramBot(token, { polling: true })
const fs = require("fs");
const { abort } = require('process');
var num
var userToken = "";

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	if(msg.text == "aboba"){
		var options = {
			reply_markup: JSON.stringify({
			  inline_keyboard: [
				[{ text: 'Расписание', callback_data: '1' },
				{ text: 'Список курсов', callback_data: '2' }],
				[{ text: 'Мои курсы', callback_data: '3' }]
			  ]
			})
		  };
	  bot.sendMessage(msg.chat.id, "answer.",options);
	}
  
  });

	bot.on('callback_query', function onCallbackQuery(callbackQuery) {
	const action = callbackQuery.data;
	const msg = callbackQuery.message;
	const opts = {
	  chat_id: msg.chat.id,
	  message_id: msg.message_id,
	};
  
	if (action === '3') {
		async function getImposter(){
			myHeaders = new Headers({
				'Authorization': `Bearer vk1.a.xb5YicvVh_hhvHcObIe_LwHDtRbdezxthx-GT0hJPT6B09FInieU0rtpKRpVWMeqTVmUvplkuU0obdrU1auxILM2IGtW9KHpKla6K0yt5RHaC-7KFhwz0U-maUw4PhVdmiVV4VtJ-_Xx686gmWFzbi2eTrHdzAgEoQcgKp1--8Bxq-55ebj_Jy-1_ITIbzMdgqk6G9ZXH_-p232jnufPEw`
			  });
			let response = await fetch('http://192.168.25.99:3000/api/courses/attending', {headers: myHeaders, method: 'GET'});
			const obj = JSON.parse(await response.text());
			let texta = "";
			var num = 0;
			for (let course of obj){
				num = num + 1;
				texta = texta +`${num}. `+ course.name + ` - ${course.schedule.toLowerCase()}` + "\n";
			}
			bot.sendMessage(msg.chat.id, texta);
		}
		getImposter();
	}
	if(action === '2'){
		async function getImposter(){
			myHeaders = new Headers({
				'Authorization': `Bearer vk1.a.xb5YicvVh_hhvHcObIe_LwHDtRbdezxthx-GT0hJPT6B09FInieU0rtpKRpVWMeqTVmUvplkuU0obdrU1auxILM2IGtW9KHpKla6K0yt5RHaC-7KFhwz0U-maUw4PhVdmiVV4VtJ-_Xx686gmWFzbi2eTrHdzAgEoQcgKp1--8Bxq-55ebj_Jy-1_ITIbzMdgqk6G9ZXH_-p232jnufPEw`
			  });
			let response = await fetch('http://192.168.25.99:3000/api/courses', {headers: myHeaders, method: 'GET'});
			const obj = JSON.parse(await response.text());
			//let texta = "";
			//for (let course of obj){
				
			//	num = num + 1;
		//		texta = `+ course.name + ` + `- ${course.schedule.toLowerCase()}` + "\n";
				var options = {
					reply_markup: JSON.stringify({
					  inline_keyboard: [[
						{ text: '<--', callback_data: '11' },
						{ text: '+', callback_data: '12' },
						{ text: '-->', callback_data: '13' }
					  ]]
					})
				  }; 
			//}
			bot.sendMessage(msg.chat.id, `${obj[0].name} - ${obj[0].schedule}`, options);
		}
		getImposter();
	}
  });

bot.onText(/\/token (.+)/, (msg, match) => {

	const chatId = msg.chat.id;

	bot.sendMessage(chatId, "https://oauth.vk.com/access_token?client_id=51615380&client_secret=6c55b27e6c55b27e6c55b27e236f4624ea66c556c55b27e086fd885e7cce4e68943bfb8&redirect_uri=http://mysite.ru&code=7a6fa4dff77a228eeda56603b8f53806c883f011c40b72630bb50df056f6479e52a");
})



