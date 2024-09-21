
const premiumUnlockedContent = document.getElementById("premium");
const paymentForm = document.getElementById("payment");


let minIntervalInput;
let maxIntervalInput;
let limitInput;

var startButton = document.getElementById("button-start");
const logsButton = document.getElementById("button-logs");

const twitterDiv = document.getElementById("twitter");

const resultsDiv = document.getElementById("results");

const actionSpan = document.getElementById("span-action");
const countSpan = document.getElementById("span-count");
const targetSpan = document.getElementById("span-target");

const progressBar = document.getElementById("progress");

var stopButton = document.getElementById("button-stop");
var rcheckbox = document.getElementById('retweet');
var lcheckbox = document.getElementById('like');
var fcheckbox = document.getElementById('follow');
var replycheckbox = document.getElementById('reply');
var inputReplyText = document.getElementsByName('reply')[0];
var lines;


/*
const startButton = document.getElementById("button-start");
const logsButton = document.getElementById("button-logs");
const stopButton = document.getElementById("button-stop");


var rcheckbox = document.getElementById('retweet');
var lcheckbox = document.getElementById('like');
var fcheckbox = document.getElementById('follow');
var replycheckbox = document.getElementById('reply');
var inputReplyText = document.getElementsByName('reply')[0];
var lines;
*/








logsButton.addEventListener("click", () => {
    window.location.href = "./logs.html";
});

async function verifyLicense(licenseKey) {
    try {
      const body = {
        app: "twitter_bot",
        licenseKey: licenseKey,
      };
      const response = await fetch("https://kynikos.click/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

		if(data.status == "error"){
			document.getElementById('error_index').textContent = data.message;
			document.getElementById('error_index').style.display = 'flex';
		}
      return data.active;
    } catch (e) {
      return false;
    }
  }
  /*
  window.addEventListener("load", async function (evt) {
    const storage = await chrome.storage.local.get();
    const lastLicenseCheck = storage.lastLicenseCheck;
    let validLicense = false;
    if (lastLicenseCheck) {
      const lastCheckDate = new Date(lastLicenseCheck);
      const now = new Date();
      if (
        now.toISOString().substring(0, 10) !==
        lastCheckDate.toISOString().substring(0, 10)
      ) {
        validLicense = await verifyLicense(storage.license);
        if (validLicense) {
          chrome.storage.local.set({
            lastLicenseCheck: now.toISOString(),
          });
        }
      } else {
        validLicense = true;
      }
    } else {
      validLicense = await verifyLicense(storage.license);
    }
    if (!validLicense) {
      //window.location.href = "./payment.html";
    }

    if (storage.config) {
        minIntervalInput = storage.config.minInterval;
        maxIntervalInput = storage.config.maxInterval;
        limitInput = storage.config.limit;
    }

});
*/
function validate_url(url, action){
	if (!url || typeof url !== 'string') {
	
		return [false, "URL not valid"];
	}
	if(action == "like" || action == "retweet" || action == "mixed"){

		
		const twitterProfilePattern = /^(https?:\/\/)?(www\.)?x\.com\/(#!\/)?[a-zA-Z0-9_]{1,15}(\/\w+)*$/;
		const twitterHashtagPattern = /^(https?:\/\/)?(www\.)?x\.com\/hashtag\/[a-zA-Z0-9_]+$/;
		const twitterSearchPattern = /^(https?:\/\/)?(www\.)?x\.com\/search\?q=[^&]+/;
		const twitterFollowerPattern = /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9_]{1,15}\/(followers|followers_you_follow|verified_followers|following)$/;


		if (twitterFollowerPattern.test(url)) {
		
			return [false, "Invalid Twitter URL\n To use the Like/Retweet feature:\n\n1. Go to a brand/person/list profile/search result with user list (e.g. x.com/home OR x.com/elonmusk)\n2.Click on Start Bot"];
		}else if (twitterProfilePattern.test(url) || twitterHashtagPattern.test(url) || twitterSearchPattern.test(url)) {
       
        
		return [true, null];
		} else {
			
				return [false, "Invalid Twitter URL\n To use the Like/Retweet feature:\n\n1. Go to a brand/person/list profile/search result with user list (e.g. x.com/home OR x.com/elonmusk)\n2.Click on Start Bot"];
		} 
	}else if(action == "follow"){
		const twitterFollowerPattern = /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9_]{1,15}\/(followers|followers_you_follow|verified_followers|following)$/;
		if (twitterFollowerPattern.test(url)) {
			return [true, null]; 
		} else {
			return [false, "To use the Follow feature:\n\n1. Go to a brand/person/list profile/search result with user list (e.g. x.com/NBA/followers)\n2. Open its Followers or Following (a dialog should pop-up)\n3. Now click on Start Bot"];
		}
	}else if(action == "reply" || action == "mixed_reply" || action == "like_reply" || action == "retweet_reply"){
		
        const twitterHomePagePattern = /^https?:\/\/(?:www\.)?x\.com\/home$/;
		if (!twitterHomePagePattern.test(url)) {
			//return [true, null]; 
			//need double check
			const patternTwt = /^(https?:\/\/)?(www\.)?x\.com\/(#!\/)?[a-zA-Z0-9_]+(\/[a-zA-Z0-9_]+)*\/?$/;

			if (patternTwt.test(url)) {
				return [true, null]; 
			} else {
				return [false, "Invalid Twitter URL\n To use the Like/Retweet/Reply feature:\n\n1. Go to a brand/person/list profile/search result with user list (e.g. x.com/home OR x.com/elonmusk)\n2.Click on Start Bot"];
			}
		} else {
			return [false, "To use the Reply feature:\n\n1. Go to a brand/person/list profile/search result with user list (e.g. x.com/NBA)\n2.  Now click on Start BotTo use the Reply feature:\n\n1. Go to a brand/person/list profile/search result with user list (e.g. x.com/NBA)\n2.  Now click on Start Bot"];
		}

		
    }
}



startButton.addEventListener("click",async function (evt) {

    const storage = await chrome.storage.local.get();
	action = "";
	
	chrome.storage.sync.get('settings', (result) => {
	 if (result.settings) {
		
		
		minIntervalInput = result.settings.min_delay;
		maxIntervalInput = result.settings.max_delay;
		limitInput = result.settings.action_click;
		
	  }else{
		  alert("settings get error please re-install extension");
		  return;
		  
	  }
	});
	
	if (rcheckbox.checked && !lcheckbox.checked && !replycheckbox.checked) {
		action = "retweet";
	}else if (!rcheckbox.checked && lcheckbox.checked && !replycheckbox.checked) {
		action = "like";
	}else if (rcheckbox.checked && lcheckbox.checked & !replycheckbox.checked) {
		action = "mixed";
	}else if(!rcheckbox.checked && lcheckbox.checked & replycheckbox.checked){
        action = "like_reply";
        if (inputReplyText) {
            var inputValue = inputReplyText.value;

      
            if (inputValue === "") {
              
                inputValue == "none";
            } else {
               

            }
        } else {

        }
    }else if(rcheckbox.checked && !lcheckbox.checked & replycheckbox.checked){
        action = "retweet_reply";
        if (inputReplyText) {
            var inputValue = inputReplyText.value;

      
            if (inputValue === "") {
              
                inputValue == "none";
            } else {
               

            }
        } else {

        }
    }else if (rcheckbox.checked && lcheckbox.checked & replycheckbox.checked) {
		action = "mixed_reply";
        if (inputReplyText) {
            var inputValue = inputReplyText.value;

      
            if (inputValue === "") {
              
                inputValue == "none";
            } else {
               

            }
        } else {

        }
	}else if(fcheckbox.checked){
		action = "follow";
	}else if(replycheckbox.checked){
        action = "reply";
        if (inputReplyText) {
            var inputValue = inputReplyText.value;

      
            if (inputValue === "") {
              
                inputValue == "none";
            } else {
               

            }
        } else {

        }
    }else {
		document.getElementById("error_checkbox").style.display = "flex";
		return;
	}
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
	
		let url = tabs[0].url;


		const [isValid, errorMessage] = validate_url(url, action);
		if (isValid) {
			 if (storage.activeState) {
				console.log("wait for the other action to finish");

				return;
			}
			  setTimeout(function() {
			if (parseInt(minIntervalInput) > parseInt(maxIntervalInput)) {
				alert("Maximum delay must be greater than minimum delay.");
			} else {
				document.getElementById("error_checkbox").style.display = "none";
				chrome.storage.local.set({
					config: {
						minInterval: parseInt(minIntervalInput),
						maxInterval: parseInt(maxIntervalInput),
						limit: parseInt(limitInput),
					},
				});

				chrome.storage.local.set({
					activeState: {
						timestamp: new Date().getTime(),
						action: action,
						reply_array: lines,
						reply_text: inputValue,
						minInterval: parseInt(minIntervalInput),
						maxInterval: parseInt(maxIntervalInput),
						limit: parseInt(limitInput),
						remaining: parseInt(limitInput),
					},
				});
			}
			  }, 500); 
		} else {
			chrome.storage.local.set({
				activeState: null,
				savedState: null,
			});
			alert(errorMessage);
			return;
		}
	});
	
});


stopButton.addEventListener("click", async function (evt) {
	
    chrome.storage.local.set({
        activeState: null,
    });
});

chrome.storage.local.onChanged.addListener(async function (changes, namespace) {
    if (changes.activeState) {
        const state = changes.activeState.newValue;

        if (state === null) {
            resultsDiv.classList.add("hidden");
            twitterDiv.classList.remove("hidden");
            progressBar.setAttribute("style", "width: 0%");
            const storage = await chrome.storage.local.get();

            return;
        } else {
            resultsDiv.classList.remove("hidden");
            twitterDiv.classList.add("hidden");

            actionSpan.textContent = "Bot running";
            countSpan.textContent = state.limit - state.remaining;
            targetSpan.textContent = state.limit;
			chrome.action.setBadgeText({
				text: "%"+(100 - (state.remaining / state.limit) * 100).toFixed(0).toString() 
			})
            progressBar.setAttribute("style", "width: " + (100 - (state.remaining / state.limit) * 100) + "%");
            return;
        }
    }
});




  window.addEventListener("load", async function (evt) {

	/*
	chrome.storage.local.set({
		activeState: null,
	});
	  */
	let url ="";
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		url = tabs[0].url;
	});
	
	setTimeout(function() {
	const patternTwitter = /^https:\/\/(www\.)?x\.com/;
	if(url != "" && patternTwitter.test(url)){

		document.getElementById("select-media").style.display = 'none';
		document.getElementById("twitter").style.display = 'block';
	}else{
	
	}
	}, 100); 

  document.getElementById('twitter-btn').addEventListener('click', function() {

	const patternTwitter = /^(https?:\/\/)?(www\.)?x\.com(\/)?$/;
	if(patternTwitter.test(url)){
		document.getElementById("select-media").style.display = 'none';
		document.getElementById("twitter").style.display = 'block';
	}else{
		window.open("https://x.com", '_blank'); 
	}
  });

 
  document.getElementById('facebook-btn').addEventListener('click', function() {

	const patternFacebook = /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.]{1,50}\/?$/;
	if(patternFacebook.test(url)){
		alert("Coming soon");
	}else{
		alert("Coming soon");
	}
  });


  document.getElementById('instagram-btn').addEventListener('click', function() {

	const patternInstagram = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}\/?$/;
	if(patternInstagram.test(url)){
		alert("Coming soon");
	}else{
		alert("Coming soon");
	}
  });

 
  document.getElementById('linkedin-btn').addEventListener('click', function() {

	const patternLinkedIn = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/[a-zA-Z0-9-]+|company\/[a-zA-Z0-9-]+)\/?$/;
	if(patternLinkedIn.test(url)){
		alert("Coming soon");
	}else{
		alert("Coming soon");
	}
  });
	
	
    var checkbox1 = document.getElementById('like');
    var checkbox2 = document.getElementById('retweet');
    var checkbox3 = document.getElementById('follow');
    var checkbox4 = document.getElementById('reply');

    checkbox1.addEventListener('change', function () {
		
        if (checkbox3.checked || checkbox4.checked) {
            if (!checkbox4.checked) {
                document.getElementById("reply_text").style.display = "none";
            }
            checkbox3.checked = false;
          
        }
    });

    checkbox2.addEventListener('change', function () {
        if (checkbox3.checked || checkbox4.checked) {
            if (!checkbox4.checked) {
                document.getElementById("reply_text").style.display = "none";
            }
            checkbox3.checked = false;
       
        }
    });

    checkbox3.addEventListener('change', function () {
        if (checkbox3.checked) {
            document.getElementById("reply_text").style.display = "none";
            checkbox1.checked = false;
            checkbox2.checked = false;
            checkbox4.checked = false;
        }
    });
	
    checkbox4.addEventListener('change',async function () {
		
			/*	
		const storage = await chrome.storage.local.get();
		const lastLicenseCheck = storage.lastLicenseCheck;
		let validLicense = false;
		if (lastLicenseCheck) {
		  const lastCheckDate = new Date(lastLicenseCheck);
		  const now = new Date();
		  if (
			now.toISOString().substring(0, 10) !==
			lastCheckDate.toISOString().substring(0, 10)
		  ) {
			validLicense = await verifyLicense(storage.license);
			if (validLicense) {
			  chrome.storage.local.set({
				lastLicenseCheck: now.toISOString(),
			  });
			}
		  } else {
			validLicense = true;
		  }
		} else {
		  validLicense = await verifyLicense(storage.license);
		}
		if (!validLicense) {
		  //window.location.href = "./payment.html";
		  alert("Reply function Only licensed version!");
		  checkbox4.checked = false;
		  return;
		}
		*/
        if (checkbox4.checked) {
            document.getElementById("reply_text").style.display = "flex";

            checkbox3.checked = false;
        }else{
            document.getElementById("reply_text").style.display = "none";
        }
    });
	


    const singleSentenceRadio = document.getElementById('singleSentence');
    const multipleSentencesRadio = document.getElementById('multipleSentences');
    const singleSentenceInput = document.getElementById('singleSentenceInput');
    const multipleSentencesInput = document.getElementById('multipleSentencesInput');
    const multiSentenceSelect = document.getElementById('multiSentenceSelect');
    const fileInput = document.getElementById('fileInput');


    singleSentenceRadio.addEventListener('change', function() {
        if (singleSentenceRadio.checked) {
            singleSentenceInput.style.display = 'block';
            multipleSentencesInput.style.display = 'none';
        }
    });

    multipleSentencesRadio.addEventListener('change', function() {
        if (multipleSentencesRadio.checked) {
            singleSentenceInput.style.display = 'none';
            multipleSentencesInput.style.display = 'block';
        }
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

      
		reader.onload = function() {
            const text = reader.result;
            lines = text.split('\n');
  
            lines.forEach(line => {
                const option = document.createElement('option');
                option.text = line;
                multiSentenceSelect.add(option);
            });
        };

        reader.readAsText(file);
    });

});