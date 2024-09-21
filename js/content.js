window.addEventListener("load", function (evt) {
    chrome.storage.local.set({
        activeState: null,
    });
});


function likeAndRetweetreplyAction(state){
    if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();

	
			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Like & Retweeted & Reply: "+state.limit+" - "+dateTimeString+"\n";
	
			const updatedNote = oldNote + '\n' + newNote;


			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }
	if(state.remaining % 2 === 0 ){
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		let array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
		let count = 0;
		let interval2 = setInterval(() => {
			if (array.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					array[0].childNodes[0].childNodes[0].click();
				}, 200);
				setTimeout(() => {
					document.querySelector('div[data-testid="retweetConfirm"]').click();
				}, 500);
				if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
			} else {
			
				window.scrollBy(0, window.innerHeight);
				count++;
				array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
				if (count == 11) {
					clearInterval(interval2);
					chrome.storage.local.set({
						activeState: null,
						savedState: null,
					});
					return;
				}
			}
		}, 100);
		
	}else if (state.remaining % 3 === 0) {
	let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
	var replyButtonParent = document.querySelector('button[data-testid="reply"]').parentNode;
	var tweetAnchor =replyButtonParent.parentNode.parentNode.parentNode.parentNode;
	let array = tweetAnchor.querySelectorAll('a');
	var tweetLink = array[2].toString();
	var hrefValue = getTweetIdFromUrl(tweetLink)
	if (hrefValue && hrefValue.length > 1) {
		//console.log(hrefValue);
		tweetID = hrefValue;
	}


	let interval2 = setInterval(() => {
		if (replyButtonParent.length !== 0) {
			window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
			setTimeout(() => {
				var replyButtonParent = document.querySelector('button[data-testid="reply"]');
				replyButtonParent.click();
				replyButtonParent.remove();
	

			}, 2000);
			setTimeout(() => {
				if(state.reply_text == "" && !state.reply_array && state.reply_array.length === 0 ){
					my_reply_text = generateSimpleSentence();
				}else if(!state.reply_array || state.reply_array.length === 0 ){
					
					my_reply_text = state.reply_text
				}else{
					
					const randomIndex = Math.floor(Math.random() * state.reply_array.length);
					my_reply_text = state.reply_array[randomIndex];
				}
				
				var r = document.querySelector('[data-testid="tweetTextarea_0"]'),
				i = new DataTransfer;
				i.setData("text/plain", my_reply_text), null == r || r.dispatchEvent(new ClipboardEvent("paste", {
					dataType: "text/plain",
					data: my_reply_text,
					bubbles: !0,
					clipboardData: i,
					cancelable: !0
				}))
			}, 2500);
			setTimeout(() => {
				var tweetButton = document.querySelector('[data-testid="tweetButton"]');
				tweetButton.click();
			}, 4000);

			if (replyButtonParent.childNodes[0].childNodes[0]) clearInterval(interval2);
			
		}
	}, 100);

	}else{
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		let array = Array.from(document.body.querySelectorAll('button[data-testid="like"]'));
		let count = 0;
		let interval2 = setInterval(() => {
			if (array.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					array[0].childNodes[0].childNodes[0].click();
				}, 200);

				if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
			} else {
				window.scrollBy(0, window.innerHeight);
				count++;
				array = Array.from(document.querySelectorAll('button[data-testid="like"]'));
				if (count == 11) {
					clearInterval(interval2);
					chrome.storage.local.set({
						activeState: null,
						savedState: null,
					});
					return;
				}
			}
		}, 100);
		
	}
   return true;
}

function retweetAndReply(state){
	if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();

	
			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Retweet & Reply: "+state.limit+" - "+dateTimeString+"\n";
	
			const updatedNote = oldNote + '\n' + newNote;


			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }
	if(state.remaining % 2 === 0 ){
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		let array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
		let count = 0;
		let interval2 = setInterval(() => {
			if (array.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					array[0].childNodes[0].childNodes[0].click();
				}, 200);
				setTimeout(() => {
					document.querySelector('div[data-testid="retweetConfirm"]').click();
				}, 500);
				if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
			} else {
				window.scrollBy(0, window.innerHeight);
				count++;
				array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
				if (count == 11) {
					clearInterval(interval2);
					chrome.storage.local.set({
						activeState: null,
						savedState: null,
					});
					return;
				}
			}
		}, 100);
		
		
	}else{
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		var replyButtonParent = document.querySelector('button[data-testid="reply"]').parentNode;
		var tweetAnchor =replyButtonParent.parentNode.parentNode.parentNode.parentNode;
		let array = tweetAnchor.querySelectorAll('a');
		var tweetLink = array[2].toString();
		var hrefValue = getTweetIdFromUrl(tweetLink)
		if (hrefValue && hrefValue.length > 1) {
			//console.log(hrefValue);
			tweetID = hrefValue;
		}
	
	
		let interval2 = setInterval(() => {
			if (replyButtonParent.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					var replyButtonParent = document.querySelector('button[data-testid="reply"]');
					replyButtonParent.click();
					replyButtonParent.remove();
		
	
				}, 2000);
				setTimeout(() => {
					if(state.reply_text == "" && !state.reply_array && state.reply_array.length === 0 ){
						my_reply_text = generateSimpleSentence();
					}else if(!state.reply_array || state.reply_array.length === 0 ){
						my_reply_text = state.reply_text
					}else{
						const randomIndex = Math.floor(Math.random() * state.reply_array.length);
						my_reply_text = state.reply_array[randomIndex];
					}
					
					var r = document.querySelector('[data-testid="tweetTextarea_0"]'),
					i = new DataTransfer;
					i.setData("text/plain", my_reply_text), null == r || r.dispatchEvent(new ClipboardEvent("paste", {
						dataType: "text/plain",
						data: my_reply_text,
						bubbles: !0,
						clipboardData: i,
						cancelable: !0
					}))
				}, 2500);
				setTimeout(() => {
					var tweetButton = document.querySelector('[data-testid="tweetButton"]');
					tweetButton.click();
				}, 4000);
	
				if (replyButtonParent.childNodes[0].childNodes[0]) clearInterval(interval2);
				
			}
		}, 100);
	}
	return true;
}

function likeAndReply(state){
	if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();

	
			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Like & Reply: "+state.limit+" - "+dateTimeString+"\n";
	
			const updatedNote = oldNote + '\n' + newNote;


			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }
	if(state.remaining % 2 === 0 ){
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		let array = Array.from(document.body.querySelectorAll('button[data-testid="like"]'));
		let count = 0;
		let interval2 = setInterval(() => {
			if (array.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					array[0].childNodes[0].childNodes[0].click();
				}, 200);

				if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
			} else {
				window.scrollBy(0, window.innerHeight);
				count++;
				array = Array.from(document.querySelectorAll('button[data-testid="like"]'));
				if (count == 11) {
					clearInterval(interval2);
					chrome.storage.local.set({
						activeState: null,
						savedState: null,
					});
					return;
				}
			}
		}, 100);
		
	}else{
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		var replyButtonParent = document.querySelector('button[data-testid="reply"]').parentNode;
		var tweetAnchor =replyButtonParent.parentNode.parentNode.parentNode.parentNode;
		let array = tweetAnchor.querySelectorAll('a');
		var tweetLink = array[2].toString();
		var hrefValue = getTweetIdFromUrl(tweetLink)
		if (hrefValue && hrefValue.length > 1) {
			//console.log(hrefValue);
			tweetID = hrefValue;
		}
	
	
		let interval2 = setInterval(() => {
			if (replyButtonParent.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					var replyButtonParent = document.querySelector('button[data-testid="reply"]');
					replyButtonParent.click();
					replyButtonParent.remove();
		
	
				}, 2000);
				setTimeout(() => {
					if(state.reply_text == "" && !state.reply_array && state.reply_array.length === 0 ){
						my_reply_text = generateSimpleSentence();
					}else if(!state.reply_array || state.reply_array.length === 0 ){
						my_reply_text = state.reply_text
					}else{
						const randomIndex = Math.floor(Math.random() * state.reply_array.length);
						my_reply_text = state.reply_array[randomIndex];
					}
					
					var r = document.querySelector('[data-testid="tweetTextarea_0"]'),
					i = new DataTransfer;
					i.setData("text/plain", my_reply_text), null == r || r.dispatchEvent(new ClipboardEvent("paste", {
						dataType: "text/plain",
						data: my_reply_text,
						bubbles: !0,
						clipboardData: i,
						cancelable: !0
					}))
				}, 2500);
				setTimeout(() => {
					var tweetButton = document.querySelector('[data-testid="tweetButton"]');
					tweetButton.click();
				}, 4000);
	
				if (replyButtonParent.childNodes[0].childNodes[0]) clearInterval(interval2);
				
			}
		}, 100);
	}
	return true;
}

function likeAndRetweetTweets(state) {
    if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();

	
			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Like And Retweeted: "+state.limit+" - "+dateTimeString+"\n";
	
			const updatedNote = oldNote + '\n' + newNote;


			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }
	if(state.remaining % 2 === 0 ){
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		let array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
		let count = 0;
		let interval2 = setInterval(() => {
			if (array.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					array[0].childNodes[0].childNodes[0].click();
				}, 200);
				setTimeout(() => {
					document.querySelector('div[data-testid="retweetConfirm"]').click();
				}, 500);
				if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
			} else {
			
				window.scrollBy(0, window.innerHeight);
				count++;
				array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
				if (count == 11) {
					clearInterval(interval2);
					chrome.storage.local.set({
						activeState: null,
						savedState: null,
					});
					return;
				}
			}
		}, 100);
		
	}else{
		let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
		let array = Array.from(document.body.querySelectorAll('button[data-testid="like"]'));
		let count = 0;
		let interval2 = setInterval(() => {
			if (array.length !== 0) {
				window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
				setTimeout(() => {
					array[0].childNodes[0].childNodes[0].click();
				}, 200);

				if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
			} else {
				window.scrollBy(0, window.innerHeight);
				count++;
				array = Array.from(document.querySelectorAll('button[data-testid="like"]'));
				if (count == 11) {
					clearInterval(interval2);
					chrome.storage.local.set({
						activeState: null,
						savedState: null,
					});
					return;
				}
			}
		}, 100);
		
	}
   return true;

}

function replyAction(state){
	if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();

			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Reply: "+state.limit+" - "+dateTimeString+"\n";
			
			const updatedNote = oldNote + '\n' + newNote;

			
			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }
	let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
	var replyButtonParent = document.querySelector('button[data-testid="reply"]').parentNode;
	var tweetAnchor =replyButtonParent.parentNode.parentNode.parentNode.parentNode;
	let array = tweetAnchor.querySelectorAll('a');
	let interval2 = setInterval(() => {
		if (replyButtonParent.length !== 0) {
			window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
			setTimeout(() => {
				
				var replyButtonParent = document.querySelector('button[data-testid="reply"]');
				replyButtonParent.click();
				replyButtonParent.remove();
	

			}, 1000);
			setTimeout(() => {
				if(state.reply_text == "" && !state.reply_array && state.reply_array.length === 0 ){
					my_reply_text = generateSimpleSentence();
				}else if(!state.reply_array || state.reply_array.length === 0 ){
					my_reply_text = state.reply_text
				}else{
					const randomIndex = Math.floor(Math.random() * state.reply_array.length);
					my_reply_text = state.reply_array[randomIndex];
				}
				
				var r = document.querySelector('[data-testid="tweetTextarea_0"]'),
				i = new DataTransfer;
				i.setData("text/plain", my_reply_text), null == r || r.dispatchEvent(new ClipboardEvent("paste", {
					dataType: "text/plain",
					data: my_reply_text,
					bubbles: !0,
					clipboardData: i,
					cancelable: !0
				}))
			}, 1500);
			setTimeout(() => {
				var tweetButton = document.querySelector('[data-testid="tweetButton"]');
				tweetButton.click();
			}, 3000);

			if (replyButtonParent.childNodes[0].childNodes[0]) clearInterval(interval2);
			
		}
	}, 100);
	return true;
}

function getTweetIdFromUrl(url) {

    var parts = url.split('/');

    return parts[parts.length - 1];
}

function generateSimpleSentence() {
    var subjects = ["I", "You", "He", "She", "It", "We", "You", "They"];
    var verbs = ["write", "go", "come", "do", "eat", "read", "sleep"];
    var objects = ["book", "house", "car", "food", "movie", "exam", "dog"];


    var subject = subjects[Math.floor(Math.random() * subjects.length)];
    var verb = verbs[Math.floor(Math.random() * verbs.length)];
    var object = objects[Math.floor(Math.random() * objects.length)];


    var sentence = subject + " " + verb + " " + object + ".";

    return sentence;
}

function isTweetIDExist(tweetID, callback) {

    chrome.storage.local.get("tweetIDs", function(data) {
        var existingTweetIDs = data.tweetIDs || []; 
        var isExist = existingTweetIDs.includes(tweetID);

        callback(false);
    });
}

function updateTweetIDs(newTweetIDs) {
   
    chrome.storage.local.get("tweetIDs", function(data) {
        var existingTweetIDs = data.tweetIDs || []; 
        existingTweetIDs = existingTweetIDs.concat(newTweetIDs);

        chrome.storage.local.set({ "tweetIDs": existingTweetIDs }, function() {
        });
    });
}

function followAction(state){
	if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();

			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Followed: "+state.limit+" - "+dateTimeString+"\n";
			
			const updatedNote = oldNote + '\n' + newNote;

			
			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }

	let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
    let array = Array.from(document.querySelectorAll("[data-testid='UserCell']"));
	let count = 0;
	let indexEle = state.limit - state.remaining;

	if(indexEle > array.length){

		return false;
	}
	let interval2 = setInterval(() => {
	if (array.length !== 0) {

		window.scrollTo(0, array[indexEle].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
		setTimeout(() => {
			let r = array[indexEle].querySelector('[role="button"]');
			if(r.innerText === "Follow"){
				r.click();
			}
			
			
		}, 200);
		if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
	} else {

		window.scrollBy(0, window.innerHeight);
		count++;
		array = Array.from(document.querySelectorAll('div[data-testid="caret"]'));
		if (count == 11) {
			clearInterval(interval2);
			chrome.storage.local.set({
				activeState: null,
				savedState: null,
			});
			return;
		}
	}
    }, 100);
    return true;
}


function retweetAction(state) {
    if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();


			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();


			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

			let oldNote = result.logs || '';
			newNote = "Total Tweet Retweeted: "+state.limit+" - "+dateTimeString+"\n";

			const updatedNote = oldNote + '\n' + newNote;


			chrome.storage.local.set({ 'logs': updatedNote }, function() {
			
			});
		});
        return false;
    }
    let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
    let array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
    let count = 0;
    let interval2 = setInterval(() => {
        if (array.length !== 0) {

            window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
            setTimeout(() => {
                array[0].childNodes[0].childNodes[0].click();
            }, 200);
            setTimeout(() => {
                document.querySelector('div[data-testid="retweetConfirm"]').click();
            }, 500);
            if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
        } else {

            window.scrollBy(0, window.innerHeight);
            count++;
            array = Array.from(document.querySelectorAll('button[data-testid="retweet"]'));
            if (count == 11) {
                clearInterval(interval2);
                chrome.storage.local.set({
                    activeState: null,
                    savedState: null,
                });
                return;
            }
        }
    }, 100);
    return true;
}

function likeAction(state){
	if (state.remaining === 0) {
		chrome.storage.local.get(['logs'], function(result) {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth() + 1; 
			const day = currentDate.getDate();


			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const seconds = currentDate.getSeconds();

			
			const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
		  let oldNote = result.logs || '';
		  newNote = "Total Liked: "+state.limit+" - "+dateTimeString+"\n";
		 
		  const updatedNote = oldNote + '\n' + newNote;
		  
	
		  chrome.storage.local.set({ 'logs': updatedNote }, function() {
		  

		  });
		});
        return false;
    }
    let homeHeight = Array.from(document.querySelectorAll('div[aria-label="Home timeline"]'))[0].childNodes[0].clientHeight;
    let array = Array.from(document.body.querySelectorAll('button[data-testid="like"]'));
    let count = 0;
    let interval2 = setInterval(() => {
        if (array.length !== 0) {
            window.scrollTo(0, array[0].getBoundingClientRect().top - 20 - homeHeight + window.scrollY);
            setTimeout(() => {
                array[0].childNodes[0].childNodes[0].click();
            }, 200);

            if (array[0].childNodes[0].childNodes[0]) clearInterval(interval2);
        } else {
            window.scrollBy(0, window.innerHeight);
            count++;
            array = Array.from(document.querySelectorAll('button[data-testid="like"]'));
            if (count == 11) {
                clearInterval(interval2);
                chrome.storage.local.set({
                    activeState: null,
                    savedState: null,
                });
                return;
            }
        }
    }, 100);
    return true;
}

function action(state) {
    if (state.action === "retweet"){
		return retweetAction(state);
	}else if (state.action === "like"){
		return likeAction(state);
	}else if (state.action === "mixed"){
		return likeAndRetweetTweets(state);
	}else if (state.action === "like_reply"){
		return likeAndReply(state);
	}else if (state.action === "retweet_reply"){
		return retweetAndReply(state);
	}else if(state.action === "follow"){
		return followAction(state);
	}else if(state.action === "reply"){
		return replyAction(state);
	}else if(state.action === "mixed_reply"){
		return likeAndRetweetreplyAction(state);
	}
    return;
}



chrome.storage.local.onChanged.addListener(async function (changes, namespace) {
	/*
  const expectedExtensionId = "pjbcokeiajlkicejjfioeoggjblmhoko";
  const redirectUrl = "https://chromewebstore.google.com/detail/pjbcokeiajlkicejjfioeoggjblmhoko";

  if (chrome.runtime.id !== expectedExtensionId) {
    console.error("extension id not valid!");

    if (confirm("This extension does not match the expected ID! Would you like to be redirected to the original extension page?")) {
      //window.location.href = redirectUrl; 
    } else {
      console.log("users declined redirect Url.");
    }
	//return;
  } else {
    console.log("Extension id valid and ready for usage.");
  }
  */
    if (changes.activeState) {
        const state = changes.activeState.newValue;
        if (state === null) {
            return;
        }

        const min = state.minInterval * 1000;
        const max = state.maxInterval * 1000;
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        await new Promise((r) => setTimeout(r, delay));

        const storage = await chrome.storage.local.get();

        if (storage.activeState !== null && storage.activeState.timestamp === state.timestamp) {
            if (action(state)) {
                let newState = state;
                newState.remaining = newState.remaining - 1;
                chrome.storage.local.set({
                    activeState: newState,
                    savedState: newState,
                });
            } else {
                chrome.storage.local.set({
                    activeState: null,
                    savedState: null,
                });
            }
        }
    }
});

