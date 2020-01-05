//切换语言
let lang=$('.lang');
let lang_li=$('.lang li');              //选择a标签
lang_li.on('click',function(){         //委托点击事件
    $(this).addClass('lang_active');
    $(this).siblings().removeClass('lang_active');
    $('.lang > span').text($(this).text());
});

//设置底部内容最小宽度
let bot_container=$($('.container')[$('.container').length-1]);
let bot_left_con_width=$('.left_content').width();
let bot_right_con_width=$('.dl_content').width();
// console.log(bot_right_con_width);
bot_container.css('min-width',bot_left_con_width+bot_right_con_width+10+'px');
//幻灯片
let slide_width;

let slide=$('.slide');
let slide_content=$('.slide_content');
let slide_li=$(".slide_content li");

let list_a=$('.list a');
let list=$('.list');
//开关定时器，用于控制按钮逻辑
let flag=true;
let if_flag;
//幻灯片自适应屏幕大小
slide_width=slide.width();
function adaption(attr,val){
    slide_content.css(attr,val*3);
    slide_li.css(attr,val);
    slide.css(attr,val);
}
if(slide_width >= 1200&&slide_width <= 1920){
    adaption('width',slide_width);
}
else if(slide_width < 1200){
    adaption('width',1200);
    slide_width=1200;
}
else if(slide_width > 1920){
    adaption('width',1920);
    slide_width=1920;
}
//自动滚动
let index=0;
let slide_time;
slide_time=setInterval(function(){
    change_next();
},5000);
slide.mouseover(function(){
    clearInterval(slide_time);
});
slide.mouseout(function(){
    slide_time=setInterval(function(){
        change_next();
    },5000);
});


//延时函数
function change_next(){
    if(flag == false){ return false; }
    flag=false;
    index++;
    if(index > slide_li.length-1){
        index=0;
    }
    change_slide_css();
}
function change_prev(){
    if(flag == false){ return false; }
    flag=false;
    index--;
    if(index < 0){
        index=slide_li.length-1;
    }
    change_slide_css();
}

//定时器延时开始
function open_flag(){
    if_flag=setTimeout(function(){
        flag=true;
        clearTimeout(if_flag);
    },300);
}

function change_slide_css(){
    slide_content.css('margin-left',slide_width*index*-1);
    list_a.removeClass('li_active');
    $(list_a[index]).addClass('li_active');
    open_flag();
}

//设置按钮前进后退
let slide_next=$('.slide>span');
$(slide_next[1]).on('click',function(){
    change_next();
});
$(slide_next[0]).on('click',function(){
    change_prev();
});

//底部按钮
for(let i=0;i < list_a.length;i++){
    $(list_a[i]).on('click',function(){
        slide_content.css('margin-left',slide_width*i*-1);
        list_a.removeClass('li_active');
        $(this).addClass('li_active');
    });
}

//设置底部按钮自动水平居中
let list_width=list.width();
list.css('margin-left',-list_width/2);

//底部轮播图
let bot_con_width=$('.bot_slide_content>div');
let bot_slide_width=bot_con_width.width()*bot_con_width.length;
console.log(bot_slide_width);
$('.bot_slide_content').css('width',bot_slide_width);