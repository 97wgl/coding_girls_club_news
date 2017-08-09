/**
 * Created by junjunboy on 8/8/17.
 */
window.onload=function () {
    let container=document.getElementById('container');
    let list=document.getElementById('list');
    let buttons=document.getElementById('buttons').getElementsByTagName('span');
    let prev=document.getElementById('prev');
    let next=document.getElementById('next');
    let  index=1;
    function showButtons() {
        for(let i=0;i<buttons.length;i++){
            if(buttons[i].className==='on'){
                buttons[i].className='';
            }
        }
        buttons[index-1].className='on';
    }
    function animat(offset) {
        let newLeft=parseInt(list.style.left)+offset;
        list.style.left=newLeft+'px';
        if(newLeft>-950){
            list.style.left=-4750+'px';
        }
        if(newLeft<-4750){
            list.style.left=-950+'px';
        }
    }
    next.onclick=function () {
        if(index===5){
            index=1;
        }
        else {
            index+=1;
        }
        showButtons();
        animat(-950);
    };
    prev.onclick=function () {
        if(index===1){
            index=5;
        }
        else {
            index-=1;
        }
        showButtons();
       animat(+950);
    }
};