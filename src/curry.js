import { summon } from './summon.js';

function _curry(fun) {
	if (fun.length < 2) return fun;
	const result = summon(fun.length, (...args) => {
		if (args.length >= fun.length) return fun.call(null, ...args);
		else return curry(fun.bind(null, ...args));
	});
	result.origin = fun;
	// result.len = 0;
	return result;
}

//我做错了一些事情，等待新的推送
//我不知道，但使用两个参数位传递工具函数本身与被柯里化函数，这或许是性能危机的第一根稻草
function curry(fn) {
	const result = summon(fn.length, fn);
	//我不知道下面这行摆在哪里合适，就摆过来了
	Reflect.defineProperty( result, 'origin', {get 'value'(){return fn}});//  为了uncurry ,但我认为bind依旧相当不雅
	return result;
}




function uncurry(fun) {
	return fun.origin;
}

export { curry, uncurry };
