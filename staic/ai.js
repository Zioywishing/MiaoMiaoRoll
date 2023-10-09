ai = () => {
    var a,index;
    res = ai_player_strategy()
	if(res == null){
		res = [[],0]
	}
    a = res[0]
    index = res[1]
	if (_status.status_name2 == "rollDice") {
		//ai锁骰子
        if(a == null){
            a = []
        }
		// for (var i = 0; i < 6; ++i) {
		// 	if (Math.random() > 0.5) {
		// 		a.push(i);
		// 	}
		// }
		for (var i = 0; i < a.length; ++i) {
			setTimeout("dice_click({target:$('#dropTable" + a[i] + " .dropTable_dice')[0]})", i * 100);
		}
		setTimeout(click_dropTable6, 500);
	} else if (_status.status_name2 == "changeMagnification") {
		//ai加倍率
		for (var i = 0; i < index; i += 1) {
			setTimeout("increaseMagnification_click({target:$('#player_increaseMagnification')[0]})", 100 * i);
		}
		setTimeout("changeMagnification_mouseleave({target:$('#player_increaseMagnification')[0]})", 500);
		setTimeout(click_dropTable6, 500);
	}
};

//ai玩家
function ai_player() {
	var player = init_player();
	player.is_ai = true;
	player.is_local = false;
	player.ipAddr = ["", ""];
	player.money = _status.setting.initMoney;
	player.avatar_img = _status.playerImg;
	game_randomImg();
	add_avatar(player);
	_status.players.push(player);
	_status.game_me.push(player);
}

//arr1的差集
function findDifference(arr1, arr2) {
	// 使用filter方法从arr1中筛选出不在arr2中的元素，即arr1的差集
	const difference = arr1.filter(item => !arr2.includes(item));
	return difference;
}
//两个数组求并集
function findUnion(arr1, arr2) {
	// 使用Set数据结构来去除重复元素
	const set = new Set([...arr1, ...arr2]);
	// 将Set转换回数组
	const union = [...set];
	return union;
}
//查找数组不重复的数的下标
function findUniqueIndexes(arr) {
	const indexMap = {};

	for (let i = 0; i < arr.length; i++) {
		const num = arr[i];
		if (indexMap[num] === undefined) {
			indexMap[num] = i;
		} else {
			delete indexMap[num];
		}
	}

	return Object.values(indexMap);
}
//查找数组中重复数的下标
function findAllDuplicateIndexes(arr) {
	const indexMap = {};
	const duplicateIndexes = [];

	for (let i = 0; i < arr.length; i++) {
		const num = arr[i];
		if (indexMap[num] === undefined) {
			indexMap[num] = [i];
		} else {
			indexMap[num].push(i);
		}
	}

	for (const key in indexMap) {
		if (indexMap[key].length > 1) {
			duplicateIndexes.push(...indexMap[key]);
		}
	}

	return duplicateIndexes;
}
//顺子查找
function findStraightIndices(arr) {
	const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
	const straightIndices = [];
	let currentStreak = [sortedArr[0]];

	for (let i = 1; i < sortedArr.length; i++) {
		if (sortedArr[i] === sortedArr[i - 1] + 1) {
			currentStreak.push(sortedArr[i]);
		} else {
			if (currentStreak.length >= 4) {
				// 如果当前顺子长度大于等于4，将其下标保存到结果数组中
				for (let j = 0; j < currentStreak.length; j++) {
					straightIndices.push(arr.indexOf(currentStreak[j]));
				}
			}
			currentStreak = [sortedArr[i]];
		}
	}

	// 检查最后一个顺子
	if (currentStreak.length >= 4) {
		for (let j = 0; j < currentStreak.length; j++) {
			straightIndices.push(arr.indexOf(currentStreak[j]));
		}
	}

	return straightIndices;
}

function ai_player_strategy() {
	console.log(_status.activePlayer);
	var p = _status.activePlayer;
	var dices = p.dices;
	var locked_dices = p.locked_dices;
	nums = dices.concat();
	nums.sort();
	console.log(dices);
	var prepareToRoll = [];
	var dictionary = {};
	var dictionary_init = {};
	for (var i = 0; i < dices.length; ++i) {
		dictionary_init[i] = dices[i];
	}
	// 将字典的属性和值提取到数组中
	var entries = Object.entries(dictionary_init);
	// 使用自定义的比较函数对属性和值的数组进行排序
	entries.sort(function (a, b) {
		return a[1] - b[1];
	});
	// 遍历排序后的数组并输出属性和对应的值
	for (var i = 0; i < entries.length; i++) {
		var key = entries[i][0];
		var value = entries[i][1];
		dictionary[key] = value;
		console.log(key, value);
	}
	//
	var numCount = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0
	};
	for (var i of dices) {
		numCount[i]++;
	}
	//双对子
	var c2a = 0;
	//对子
	var c2 = 0;
	//三连
	var c3 = 0;
	//四连
	var c4 = 0;
	//五连
	var c5 = 0;
	var hulu = 0;
	var dashunzi = 0;
	var xiaoshunzi = 0;
	for (var key in numCount) {
		i = numCount[key];
		if (i == 2) {
			c2++;
		} else if (i == 3) {
			c3++;
		} else if (i == 4) {
			c4++;
		} else if (i == 5) {
			c5++;
		}
	}

	if (c2 == 1 && c3 == 1) {
		hulu += 1;
	} else if (c2 == 2) {
		c2a += 1;
	}
	var shunziCount = 0;
	var shunziCount_max = 0;
	var number = -1;
	for (var i of nums) {
		if (i == number + 1) {
			shunziCount++;
			number++;
		} else if (i != number){
			number = i;
			shunziCount_max = Math.max(shunziCount_max, shunziCount);
			shunziCount = 0;
		}
	}
	shunziCount_max = Math.max(shunziCount_max, shunziCount);
	if (shunziCount_max == 3) {
		dashunzi += 1;
	} else if (shunziCount_max == 4) {
		xiaoshunzi += 1;
	}
	//没手牌的情况下
	if (locked_dices.length == 0) {
		console.log("没手牌的情况下");
		//判断手牌
		if (c5 == 1) {
			duplicateIndexes = findAllDuplicateIndexes(dices);
			console.log(duplicateIndexes);
			return [duplicateIndexes,3]
		}
        else if (dashunzi == 1) {
			prepareToRoll = [0, 1, 2, 3, 4];
			return [prepareToRoll,3]
		}
        else if ( c2 == 2 || c4 == 1 || c3 == 1) {
			duplicateIndexes = findAllDuplicateIndexes(dices);
			console.log(duplicateIndexes);
			return [duplicateIndexes,1]
		}
        else if (xiaoshunzi == 1) {
			prepareToRoll = findStraightIndices(dices);
			return [prepareToRoll,1]
		} else if (c2 == 1) {
			duplicateIndexes = findAllDuplicateIndexes(dices);
			console.log(duplicateIndexes);
			return [duplicateIndexes,0]
		}
	} else {
		//判断手牌
		console.log("有手牌的情况下");
		if (c5 == 1 ) {
			duplicateIndexes = findAllDuplicateIndexes(dices);
			console.log(findDifference(duplicateIndexes, locked_dices));
			return [findDifference(duplicateIndexes, locked_dices),3]
		} else if (dashunzi == 1) {
			prepareToRoll = [0, 1, 2, 3, 4];
			console.log(findDifference(prepareToRoll, locked_dices));
			return [findDifference(prepareToRoll, locked_dices),3]
		}
        else if ( c2 == 2 || c4 == 1 || c3 == 1) {
			duplicateIndexes = findAllDuplicateIndexes(dices);
			console.log(findDifference(duplicateIndexes, locked_dices));
			return [findDifference(duplicateIndexes, locked_dices),1]
        }
        else if (xiaoshunzi == 1) {
			prepareToRoll = findStraightIndices(dices);
			console.log(findDifference(prepareToRoll, locked_dices));
			return [findDifference(prepareToRoll, locked_dices),1]
		} else if (c2 == 1) {
			duplicateIndexes = findAllDuplicateIndexes(dices);
			console.log(findDifference(duplicateIndexes, locked_dices));
			return [findDifference(duplicateIndexes, locked_dices),0]
		}
	}
}
