const INSTAGRAM_USERNAME="";

const plans={
  esencial:{name:"Esencial"},
  profesional:{name:"Pro"},
  tienda:{name:"Active"},
  avanzada:{name:"Master"},
  especial:{name:"Custom"}
};

const toast=document.querySelector("#toast");

function showToast(msg){
  if(!toast) return;
  toast.textContent=msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),3200);
}

async function contactPlan(key){
  const p=plans[key];
  const message=`Hola, he visto vuestra web de SoroByte y me interesa el plan "${p.name}". Me gustaría contaros mi idea y pedir presupuesto.`;
  try{await navigator.clipboard.writeText(message)}catch(e){}
  if(INSTAGRAM_USERNAME){
    window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`,"_blank");
    showToast("Mensaje copiado. Pégalo en el DM y envíalo.");
  }else{
    showToast(`Mensaje de "${p.name}" copiado. El DM se activará cuando añadamos el Instagram definitivo.`);
  }
}

document.querySelectorAll(".contact-plan").forEach(btn=>{
  btn.addEventListener("click",()=>contactPlan(btn.dataset.plan));
});

const glow=document.querySelector(".cursor-glow");
if(glow){
  document.addEventListener("mousemove",e=>{
    glow.style.cssText=`position:fixed;left:${e.clientX-180}px;top:${e.clientY-180}px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(53,242,127,.055),transparent 65%);pointer-events:none;z-index:-1`;
  });
}

// SoroCare payment links: paste the final Revolut subscription URLs here.
const SOROCARE_PAYMENT_LINKS={
  basic:"",
  pro:"",
  advanced:""
};

const SOROCARE_NAMES={
  basic:"Basic · 29 €/mes",
  pro:"Pro · 59 €/mes",
  advanced:"Advanced · 99 €/mes"
};

function openCareSubscription(key){
  const url=SOROCARE_PAYMENT_LINKS[key];
  if(url){
    window.open(url,"_blank","noopener");
    return;
  }
  showToast(`El pago de SoroCare ${SOROCARE_NAMES[key]} está preparado y se activará al conectar Revolut.`);
}

document.querySelectorAll(".care-subscribe").forEach(btn=>{
  btn.addEventListener("click",()=>openCareSubscription(btn.dataset.care));
});
