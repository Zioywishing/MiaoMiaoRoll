miao_init = ()=>{
    //隐藏ai幕布
    $('#aiCurtain').hide()

    //右键提示功能
    document.oncontextmenu = function(e){
        //点击右键后要执行的代码
        //.......
        return false;//阻止浏览器的默认弹窗行为
    }
}
