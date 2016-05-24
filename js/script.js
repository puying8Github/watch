/**
 * Created by ThinkPad User on 2016/5/23.
 */
var numClass={
    numIcon:function(num){
        var str='';
        if(num!=10){
           str="img/num_"+num+".png";
        }else{
            str="img/num_0.png";
        }

        return str;
    },
    numFun:function(className,num){
        var className=document.getElementsByClassName(className);
        if(num<10){
            className[0].style.backgroundImage='url(img/num_0.png)';
            className[1].style.backgroundImage='url('+this.numIcon(num)+')';
        }
        else if(num>=10){
            var decade=parseInt(num/10);//十位
            var unit=parseInt(num%10);//各位
            className[0].style.backgroundImage='url('+this.numIcon(decade)+')';
            className[1].style.backgroundImage='url('+this.numIcon(unit)+')';
        }

    },
    numFigures:function(num){
        var array=[];
        var n=num.toString().length;
        var n2=0;
        for(var i=n-1;i>=0;i--){
            //Math.pow(10,3);
            var number=parseInt((num-n2)/Math.pow(10,i));
            n2+=number*Math.pow(10,i);
            array[i]=number;
        }
        return array;
    }
};

(function(){
    //时钟表方法
    function NewTime(){
        var data=new Date();
        var h=data.getHours();
        var m=data.getMinutes();
        var s=data.getSeconds();
        numClass.numFun('py_hour',h);
        numClass.numFun('py_minute',m);
        numClass.numFun('pysecond',s);
    }
    function colonTime(){
        var colon=document.getElementsByClassName('py_colon');
        for(var i=0;i<colon.length;i++){

            if(colon[i].getAttribute('data-color')==1){
                colon[i].style.color="rgb( 0, 0, 0)";
                colon[i].setAttribute('data-color',0);
            }else{
                colon[i].style.color='rgb( 0, 255, 0)';
                colon[i].setAttribute('data-color',1)
            }
        }
    }
    function init(){
        setInterval(NewTime,1000);
        //colonTime();
        setInterval(colonTime,500);
    }
    init();
})();
(function(){
    //秒钟
    function init(){
        var timer,num=0;
        var Stopwatch=document.getElementById('Stopwatch');
        this.watchFun=function(){
            var n=num;
            Stopwatch.innerHTML='';
            if(num.toString().length>10){
                this.stop();
            }
            var arrayNum=numClass.numFigures(num);

            for(var i=0;i<arrayNum.length;i++){
                var obj=document.createElement('span');
                obj.style.backgroundImage='url('+numClass.numIcon(arrayNum[i])+')';
                Stopwatch.appendChild(obj)
            }
            num++;
        };
        this.stop=function(){
            clearInterval(timer);
        };
        this.start=function(){
            timer=setInterval(this.watchFun,100);
        };
        this.restart=function(){
            num=0;
            this.watchFun();
        }
    }
    var init=new init();
    document.getElementById('start').onclick=function(){
        if(this.innerHTML=="start"){
            this.innerHTML='stop';
            init.start();
        }else{
            this.innerHTML='start';
            init.stop();
        }
    };
    document.getElementById('restart').onclick=function(){
        init.restart();
    }


})();
