class UserService {
	var username;
	var password;
	
	/*
		var имеет большую область видимости, лучше использовать let
		тут автор, видимо, хотел обозначить структуру класса и прописать поля
		в таком случае и var и точка с запятой не нужны:
		
		username
		password
		
		поле password предполагается частным, тогда надо писать так:
		
		#password
	*/
	
	constructor(username, password) {
		this.username = username;
		this.password = password;
		/*
		значения полей, их наличие, типы никак не проверяются
		порядок значений в функции имеет значение. Можно документировать это через JSDoc или предавать объект, который будет деструктурироваться
		
		constructor({username, password}) {
		*/
	}

	get username() {
		return UserService.username;
		/*
		поле username не статическое, поэтому надо писать this.username
		если геттер только возвращает значение, то он не нужен
		*/
	}

	get password() {
		throw "You are not allowed to get password";
		/*
		поле password лучше сделать приватным (см.выше)
		кидать исключение только из-за обращения к полю класса - странно
		разный стиль кавычек в пределах одного файла
		*/
	}

	static authenticate_user() {
	/*
	метод работает с данными экземпляра класса, поэтому static тут лишнее	
	snake_case именование. Ничего критичного, но в js так не принято, да и выбивается из общего стиля
	*/
		let xhr = new XMLHttpRequest();
		/*
		можно использовать fetch вместо XMLHttpRequest
		*/
		xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' + UserService.username + '&password=' + UserService.password, true);
		/*
		поля username и password не статичные, поэтому надо писать `this.` вместо `UserService.`
		передача чувствительных данных в GET запросе.
		*/
		xhr.responseType = 'json';

		const result = false;

		xhr.onload = function() {
			if (xhr.status !== '200') {
				result = xhr.response;
				/*
				полученные данные никак не обрабатываются и не учитываются				
				данные возвращаются в формате json
				*/
			} else {
				result = true;
				/*
				одна и та же функция возвращает разные типы
				*/
			}
		};
		
		/*
		onerror никак не обрабатывается	
		*/


		/*
		сам запрос не выполнен
			xhr.send();
		*/
		return result;
	}
}

$('form #login').click(function() {
	var username = $('#username');
	var password = $('#password');
	
	var res = UserService(username, password).authenticate_user();
	/*
	нужно создать экземпляр UserService и с ним работать
	*/
	
	if (res == true) {
	/*
	 `== true` - лишнее
	 xhr.send() выполняется асинхронно (3й параметр true), поэтому res наверняка так и останется false и код не выполнится
	*/
		document.location.href = '/home';
	} else {
		alert(res.error);
		/*
		res.error - не факт что существует. res может быть false
		*/
	}
})