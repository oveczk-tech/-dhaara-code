(function () {
    var style = document.createElement('style');
    style.textContent = `
        @media (min-width: 768px) {
            .h4.homepage-group-title,
            .products-related-header {
                font-size: 1.5em !important;
                text-align: center;
            }

            .p-detail-inner h1 {
                font-size: 1.5em !important;
            }
        }        
    `;
    document.head.appendChild(style);
})();
document.addEventListener('DOMContentLoaded',function(){

[
['#parameter-id-5','.dhaara-size-buttons',['S','M','L','XL']],
['select[data-parameter-name="Tloušťka v mm"]','.dhaara-thickness-buttons'],
['select[data-parameter-name="Délka"]','.dhaara-length-buttons']
].forEach(function(x){

var s=document.querySelector(x[0]);if(!s)return;
var w=document.createElement('div');w.className=x[1].slice(1);

Array.from(s.options).filter(function(o){return o.value}).sort(function(a,b){
return x[2]?x[2].indexOf(a.text.trim())-x[2].indexOf(b.text.trim()):a.index-b.index
}).forEach(function(o){

var b=document.createElement('button');b.type='button';b.dataset.value=o.value;b.textContent=o.textContent.trim().replace(/\s*mm$/i,'');if(o.selected)b.classList.add('active');b.onclick=function(){
if(b.classList.contains('is-unavailable'))return;
s.value=o.value;
s.dispatchEvent(new Event('change',{bubbles:true}));
w.querySelectorAll('button').forEach(function(b){b.classList.remove('active')});
b.classList.add('active');
};

w.appendChild(b);
});

s.parentNode.insertBefore(w,s.nextSibling);
s.style.position='absolute';
s.style.left='-9999px';

function updateAvailability(){
var data=window.shoptet&&window.shoptet.variantsSplit&&window.shoptet.variantsSplit.necessaryVariantData;
if(typeof data==='string'){try{data=JSON.parse(data)}catch(e){return}}
if(!data)return;
Array.from(s.options).filter(function(o){return o.value}).forEach(function(o){
var v=data[(s.getAttribute('data-parameter-id')||'5')+'-'+o.value];
var b=Array.from(w.querySelectorAll('button')).find(function(b){return b.dataset.value===o.value});
if(b&&v)b.classList.toggle('is-unavailable',v.isNotSoldOut===false);
});
}
updateAvailability();
s.addEventListener('change',function(){setTimeout(updateAvailability,100)});

});
});
