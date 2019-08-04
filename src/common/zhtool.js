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

module.exports.httpsRequest = httpsRequest