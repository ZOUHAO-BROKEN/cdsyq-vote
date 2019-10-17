import constants from './constants'
import {MODE} from './config';

export function wxAPIPromise(func, obj){
	return new Promise((resolve, reject) => {
		func({
			...obj,
			success: resolve,
			fail: function(err){
				wx.hideLoading();
				if(JSON.stringify(err).indexOf('scope unauthorized') == -1){
					wx.showModal({
			            title: '服务异常',
			            showCancel: false,
			            content: JSON.stringify(err),
			            success (res) {
			            
			        	}
		    		})
				}				
		    	reject(err);
			}
		})
	})
}

function getfullURL(api, type = defaultDomain){
	return constants[MODE][type] + api;
}

export function httpPost(api, jsonData, type = 'defaultDomain'){
	return new Promise(function(resolve, reject){
		wx.request({
			url: getfullURL(api, type),
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
				wx.hideLoading();
				
					wx.showModal({
			            title: '服务异常',
			            showCancel: false,
			            content: JSON.stringify(err),
			            success (res) {
			            
			        	}
		    		})
			}
		})
	})
}

export function httpGet(api, type = 'defaultDomain'){
	return new Promise(function(resolve, reject){
		let header = {
			'content-type': 'application/json'
		}

		wx.request({
			url: getfullURL(api, type),
			header: {
    				'content-type': 'application/json' // 默认值
    			},
    			success(res){
					//console.log(res);
					resolve(res);
				},
				fail(err){
					reject(err);
					wx.hideLoading();
					wx.showModal({
			            title: '服务异常',
			            showCancel: false,
			            content: JSON.stringify(err),
			            success (res) {
			            
			        	}
		    		})
				}
			});

	})
}