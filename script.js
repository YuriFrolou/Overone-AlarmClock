const form=document.querySelector('.form');
const clock=document.querySelector('.clock');
const formInput=document.querySelector('.form__input');

const audio=new Audio('./audio/alarm.mp3');
audio.loop=true;

formInput.setAttribute('min',formatDate(new Date()));

form.addEventListener('submit',(e)=>{
e.preventDefault();
const formData=new FormData(form);
const date=formData.get('date');
e.currentTarget.style.display='none';
clock.style.display='flex';
let diff=diffDate(date);
let counter=0;

const interval=setInterval(()=>{
   diff-=1000;
   const diffValues=diffFormat(diff);
   clock.innerHTML=`<p class="clock-text">Осталось:</p>${diffValues.days}д. ${diffValues.hours}ч. ${diffValues.minutes}м. ${diffValues.seconds}с.`;

   if(counter>=diff){
     clearInterval(interval);
    audio.play();
    setTimeout(()=>{
    audio.pause();
    },5000);
    
   }
   counter++;

},1000);

});

function diffDate(nextDate){
const currentDate=Date.now();
const diff=Number(new Date(nextDate).getTime())-Number(currentDate);
return diff;
}

function diffFormat(diff){
    const seconds = Math.floor(Math.abs(diff) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
return{
    days:days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
}
}

// const date = new Date();
// date.setSeconds(date.getSeconds() - 1);

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            date.getMonth() < 9 ? '0' + (Number(date.getMonth()) + 1) : Number(date.getMonth()) + 1,
            date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        ].join('-')+'T'+date.getHours()+':'+date.getMinutes()
    );
}