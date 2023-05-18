function summonArray(total) {
	// 非结构性修改，但确实更不费解了
	return Array.from({ length: total }, (_, i) => "a" + i);
	/* 
	return Array(total)
		.fill()
		.map((_, i) => 'a' + i);
	*/
}

function _summon(total, fn) {
	return Function(
		...summonArray(total + 1),
		'return a0.apply(this,Array.prototype.splice.call(arguments,1));'
	).bind(null, fn);
} 

// 不雅 
// 虽然我认为已经是相当好的情况，参数没有每次传递给原函数，构造一个绑定后的函数
//
function summon(total,fn){
	//total  预期接受的参数总量,fn  量够后调用的函数
	let Yume = ((Yume, fn, ...args) => (
		args.length
		?(
			total > args.length //已接收参数量 与 预期的参数量
			?(  //量不够
				Yume = Yume.bind(null, Yume, fn, ...args), //  把新旧参数都混上
				Reflect.defineProperty( Yume, 'length',  {     'value': total-args.length }),  // 为了length
				Reflect.defineProperty( Yume, 'origin',  { get 'value'(){return fn.bind(null,...args)}}), //  为了uncurry ,但我认为bind依旧相当不雅
				Yume //返回包装好贴上Yume标签的Yume工具函数
			):fn.apply(null, args) //参数够了，直接apply传参调用
			):Yume  //我不知道这是否符合规范，但参数不足情况下给个空参返回什么都不做的yume应该很合理
	  ));
	  Yume = Yume.bind(null, Yume, fn);
	  
	  Reflect.defineProperty( Yume, 'length', {    'value': total  });    // 为了length
	//   Reflect.defineProperty( Yume, 'origin', {get 'value'(){return fn}});//  为了uncurry ,但我认为bind依旧相当不雅
	  return Yume
	}




function summonWithName(list, fn) {
	return Function('a0', list, `return a0(${list.join(',')})`).bind(null, fn);
}

export { summon, summonWithName };
