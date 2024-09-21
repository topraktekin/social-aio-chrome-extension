const maxClicks = document.getElementById("max_clicks");
const minDelay = document.getElementById("min_delay");
const maxDelay = document.getElementById("max_delay");


const type = document.getElementById("type_lic");
const expDate = document.getElementById("exp_date");



const saveButton = document.getElementById("save_config");
const resetButton = document.getElementById("reset_config");

document.addEventListener("DOMContentLoaded", function() {
	chrome.storage.sync.get('settings', (result) => {
	  if (result.settings) {
		  maxClicks.value = result.settings.action_click;
		  minDelay.value = result.settings.min_delay;
		  maxDelay.value = result.settings.max_delay;
	  }
	});
	chrome.storage.sync.get('account', (result) => {
		if(result.account){
			type.innerHTML = result.account.license_type;
			expDate.innerHTML = result.account.exp_date.substring(0, 10);
		}
	});
});

saveButton.addEventListener("click", async function (evt) {
  const storage = await chrome.storage.local.get();
	const newSettings = {
	  action_click: maxClicks.value,
	  min_delay: minDelay.value,
	  max_delay: maxDelay.value
	};
	chrome.storage.sync.set({settings: newSettings}, () => {
		
	});
	
});

resetButton.addEventListener("click", async function (evt) {
 
	const defaultSettings = {
	  action_click: 10,
	  min_delay: 5,
	  max_delay: 10
	};
	chrome.storage.sync.set({settings: defaultSettings}, () => {
		alert('Settings restore default.');
	});
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
		document.getElementById('error_payment').textContent = data.message;
		document.getElementById('error_payment').style.display = 'flex';
	}else{
		document.getElementById('error_payment').style.display = 'none';
		const detail = {
		  license_type: data.type,
		  exp_date: data.exp
		};
		chrome.storage.sync.set({account: detail}, () => {});
	}
	return data.active;
    //return true;
  } catch (e) {
    return false;
  }
}
/*
activateButton.addEventListener("click", async function (evt){
	
	const licenseKey = document.getElementById("key").value;
  if (
	typeof licenseKey === "undefined" ||
	licenseKey === null ||
	licenseKey.length === 0
  ) {
	document.getElementById('error_payment').textContent = "Please Enter Activation Key";
	document.getElementById('error_payment').style.display = 'none';
    return;
	}
	
	
  const validLicense = await verifyLicense(licenseKey);

  if (validLicense) {
    chrome.storage.local.set({
      license: licenseKey,
      lastLicenseCheck: new Date().toISOString(),
    });
	document.getElementById('activate_key_div').style.display = 'none';
	document.getElementById('generic_warn').style.display = 'none';
	document.getElementById('thanks_div').style.display = 'flex';
	document.getElementById('account_detail').style.display = 'flex';
	//buttons
	saveButton.disabled = false;
	resetButton.disabled = false;
  }
  
});
*/