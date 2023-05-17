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

function summon(total,fn){
	const Yume =  ((Yume,fn,...args)=>(
			args.length
			?(
				total > args.length//还缺点参数
				?Object.defineProperties(Yume.bind(null,Yume,fn,...args), {'length': { 'value': total-args.length },'origin':{get value(){return fn.bind(null,...args)}}}) // 把新参数塞进新函数，写上正常length与uncurry用的origin
				:fn.apply(null,args) //忘记该写什么了，反正参数够了，通过apply带参调用
			):Yume // 传入参数个数为0 不做变动
		)) //魔法~ 为我而存在~
		return Object.defineProperties(Yume.bind(null,Yume,fn), {'length': { 'value': total },'origin':{get value(){return fn }}}) //为了length and curry
}




function summonWithName(list, fn) {
	return Function('a0', list, `return a0(${list.join(',')})`).bind(null, fn);
}

export { summon, summonWithName };
