function httpsRequest(url){

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

function httpsPost(url, jsonData){
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

module.exports.httpsRequest = httpsRequest
module.exports.httpsPost = httpsPost