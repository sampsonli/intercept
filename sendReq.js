/**
 * Created by sampson on 2016/11/24.
 */

let fetch = require('node-fetch');
let co = require('co');

let user_ck = 'e4e4156123a77c6ca059bf3ba64371d9';
let fid = 'NqDiMu11M0DsQdzx'
function send() {
    co(function *() {
        while (true){
            fid = yield fetchId(fid,user_ck);
            console.log(fid);
            yield wait(780);
        }
    }).catch(function (e) {
        console.error(e);
        send()
    })
}
send();


function wait(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time)
    })
}

function fetchId(fightid,user_ck) {
    let qs = ['bj=0', `fid=${fightid}`,`v=${Date.now()}`].join('&');
    console.log(qs);
    return fetch('http://tuohuang.yiliansj.com/qiuxian/ajax?act=pf', {method:'POST',  body: qs, headers: {
        Cookie: `user_ck=${user_ck}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko)' +
        ' Chrome/39.0.2171.95 Safari/537.36 MicroMessenger/6.5.2.501 NetType/WIFI WindowsWechat',
        Referer: 'http://tuohuang.yiliansj.com/qiuxian/home',
        'Content-Type': 'application/x-www-form-urlencoded'

} }).then(function (resp) {
        return resp.json()
    }).then(function (json) {
        // console.log(json)
        if(json.code=='100'){
            return json.data.fightId
        }else {
            throw new Error(json.msg)
        }

    })

}

