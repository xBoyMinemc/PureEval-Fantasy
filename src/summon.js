function summonArray(total) {
	// 非结构性修改，但确实更不费解了
	return Array.from({ length: total }, (_, i) => 'a' + i);
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
// 虽然我认为已经是相当好的情况
function summon(total,fn){
	//total  预期接受的参数总量,fn  量够后调用的函数
	const Yume = (...args) => (
		Reflect.defineProperty( fn, 'length', {    'value': total-args.length  }), // <0?
		fn.apply(null,args)
	);

	Reflect.defineProperty( Yume, 'length', {    'value': total  });    // 为了length

	return Yume
}




function summonWithName(list, fn) {
	return Function('a0', list, `return a0(${list.join(',')})`).bind(null, fn);
}

export { summon, summonWithName };
