Moralis.initialize("xifi4795ifkvjiAJWI9OeJ91eWIzqcI0BSILKRsU") //Application ID
Moralis.serverURL = "https://owafmgkloina.usemoralis.com:2053/server"


Moralis.User.currentAsync()
    .then(function (user) {
        if (user) {
            console.log(user)
            // do something with the user or/and UI state
        } else {
            console.log(user)
            // user is not logged in
        }
    })
    .catch(function (error) {
        console.log(error)
        // catch any errors
    });

async function login() {
    Moralis.Web3.authenticate().then(user => {
        if (!user) return false;
        user.set("name", document.getElementById('username').value);
        user.set("email", document.getElementById('email').value);
        user.save();
        deactivateControls();
        populate()
    }).catch((e) => {
        console.log(e)
    })
}


function deactivateControls() {
    document.getElementById('login').setAttribute("disabled", null);
    document.getElementById('username').setAttribute("disabled", null);
    document.getElementById('email').setAttribute("disabled", null);
}


async function populate() {
    const balances = await Moralis.Web3API.account.getTokenBalance({ chain: chainToQuery }).then(buildTableBalances);
    const nft = await Moralis.Web3API.account.getNFTs({ chain: chainToQuery }).then(buildTableNFT);
    const transtactions = await Moralis.Web3API.native.getTransactions({ chain: chainToQuery }).then(buildTableTransaction)
}

function buildTableBalances(data) {
    documnent.getElementById("resultBalances").innerHTML = `<table class="table table-dark table-striped" id="balanceTable">`
    const table = documnent.getElementById("balancesTable");
    const rowHeader = `<thead>
    <tr>
    <th>Token</th>
    <th>Symbol</th>
    <th>Balance</th>
    </tr>
    </thead>`
    table.innerHTML += rowHeader;
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
        <td>${data[i].name}</td>
        <td>${data[i].symbol}</td>
        <td>${data[i].balance / 10 ** 18}</td>
        </tr>`
        table.innerHTML += row
    }
}

function buildTableNFT(_data) {
    let data = _data.result
    documnent.getElementById("resultNFT").innerHTML = `<table class="table table-dark table-striped" id="nftTable">`
    const table = documnent.getElementById("nftTable");
    const rowHeader = `<thead>
    <tr>
    <th>ID</th>
    <th>Type</th>
    <th>Contract</th>
    </tr>
    </thead>`
    table.innerHTML += rowHeader;
    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
        <td>${data[i].token_id}</td>
        <td>${data[i].contract_type}</td>
        <td>${data[i].contract_address}</td>
        </tr>`
        table.innerHTML += row
    }
}

function buildTableTransaction(_data) {
    const current = ethereum.selectedAddress;
    let data = _data.result
    documnent.getElementById("resultTransactions").innerHTML = `<table class="table table-dark table-striped" id="transactionsTable">`
    const table = documnent.getElementById("transactionsTable");
    const rowHeader = `<thead>
    <tr>
    <th>Type</th>
    <th>From/To</th>
    <th>Value</th>
    </tr>
    </thead>`
    table.innerHTML += rowHeader;
    for (let i = 0; i < data.length; i++) {
        let type = "";
        if (data[i].from_address === current) {
            type = "Outgoing";
            fromTo = data[i].to_address;
        } else {
            type = "Incoming";
            fromTo = data[i].from_address;
        }
        let row = `<tr>
        <td>${type}</td>
        <td>${fromTo}</td>
        <td>${data[i].balance / 10 ** 18}</td>
        </tr>`
        table.innerHTML += row
    }
}