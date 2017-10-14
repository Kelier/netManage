/*
* created by yanjiangnan 635073826@qq.com
* */

/**
 * nav路由
 */
let routing=['tbs','wss','pmdc','pcodf'],
    htmlview=['TBS.html','WSS.html','PMDC.html','PCODF.html'],
    routes=Array.from(routing,(x)=>{return x+'-nav'});
htmlview.forEach((x,i)=>{
    let liMaps=$("#"+routes[i])[0].children;
    for(let i=0;i<liMaps.length;i++){
        liMaps[i].addEventListener('click',()=>{window.location.href=x});
    }
});
