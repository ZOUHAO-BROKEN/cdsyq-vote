export function wxAPIPromise(func, obj){
	return new Promise((resolve, reject) => {
		func({
			...obj,
			success: resolve,
			fail: reject
		})
	})
}

export function httpPost(url, data){
	return new Promise(function(resolve, reject){
		wx.request({
			url: url,
			data: jsonData,
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			success(res){
				resolve(res);
			},
			fail(err){
				reject(err);
			}
		})
	})
}

export function httpGet(url){
	return new Promise(function(resolve, reject){
		let header = {
			'content-type': 'application/json'
		}

		wx.request({
			url: url,
			header: {
    				'content-type': 'application/json' // 默认值
    			},
    			success(res){
					//console.log(res);
					resolve(res);
				},
				fail(err){
					reject(err);
				}
			});

	})
}

//module.export.wxAPIPromise = wxAPIPromise
