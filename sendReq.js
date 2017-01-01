/**
 * Created by sampson on 2016/11/24.
 */

let fetch = require('node-fetch');
let co = require('co');


function send() {
    co(function *() {
        while (true){
            yield postmsg();
            yield wait(100)
        }
    }).catch(function (e) {
        console.error(e);
        // send()
    })
}
send();


function wait(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time)
    })
}

function postmsg() {
    return fetch('http://m.client.10010.com/mobileService/lightCandlesFlow/businessTransact/lightCandlesSubmit.htm ', {method:'POST',  headers: {
            // POST /mobileService/lightCandlesFlow/businessTransact/lightCandlesSubmit.htm HTTP/1.1
    Host: 'm.client.10010.com',
    // Connection: keep-alive
    // X-Requested-With: XMLHttpRequest
    // Accept-Encoding: gzip, deflate
    // Accept-Language: zh-cn
    // Accept: application/json, text/javascript, */*; q=0.01
 Origin: 'http://m.client.10010.com',
 // Content-Length: 0
 // Connection: keep-alive
 "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C92 unicom{version:iphone_c@5.0}",
 "Referer": "http://m.client.10010.com/mobileService/lightCandlesFlow/lightCandlesMain.htm",
 Cookie: "_ga=GA1.4.1550968649.1445310840; c_sfbm=4g_1; mobileService=HHN7YypZYgTGNkr3RQngphKgLfwvzXqmp50RnyC082hjfVWBT4hG!-1191301852; route=b915e775102b40e6894a9eabb12d2f4c; a_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE0ODM4NTYyMzgsInRva2VuIjp7ImxvZ2luVXNlciI6IjEzMDg4ODYxMjU1IiwicmFuZG9tU3RyIjoieWhibTVTc0sxNDgzMjUxNDM4MzYxIn0sImlhdCI6MTQ4MzI1MTQzOH0.h7ZMfm7nc4HKqGR9zBlXkvQ_KSaiXturWHpwFc-7j-Yb3A70H_Wzh7L2ds64gQb8D0b8Kg_bFyUra1i8rb0PDA; c_id=79d6d78e7f620f82a28840a6d55c93324364c16b71dde1760cbcee4f68d0f973; c_mobile=13088861255; c_version=iphone_c@5.0; t3_token=548303bbd64e45f284ff31569608f499; u_account=13088861255; u_type=01; wo_family=2; city=051|; cw_mutual=7064d003eb3c8934e769e430ecf3d64a3ea08a8857fa5da050d280ddd768be6b3dfafd76ca6df8b7003e5be7d2e2f79a15be6f23170ba5c52565ca45a4407a0c; clientid=98|0; WT_FPC=id=2d2f0d869d39ccba8941445310839272:lv=1482483035518:ss=1482482897612; _n3fa_cid=acd902bdee874453c09d4973c0cc7e6c; _n3fa_ext=ft=1445310840; _n3fa_lvt_a9e72dfe4a54a20c3d6e671b3bad01d9=1480637524,1481529831,1482106104,1482482895; Hm_lvt_9208c8c641bfb0560ce7884c36938d9d=1480637574,1481529906,1482106104,1482483009; __utma=231252639.1550968649.1445310840.1450963730.1451529657.94; __utmv=231252639.Guangdong"








} }).then(function (resp) {
        return resp.text()

    }).then(function (json) {

        let result = {}
        try{
            result = JSON.parse(json)
        }catch (e){
            result = {msg : "太频繁"}
        }
        console.log(result)

    }).catch(e=>{
        console.log({msg: '错误'})
    })

}

