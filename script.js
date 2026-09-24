const INSTAGRAM_USERNAME="";
const plans={
esencial:{tag:"Web Esencial · Desde 249 €",name:"Web Esencial",title:"La web que hace que tu negocio parezca tan profesional como es.",copy:"Pensada para negocios que necesitan una presencia clara, cuidada y fácil de entender. El objetivo no es llenar la pantalla de cosas: es que quien entre sepa quién eres, qué haces y cómo contactarte.",demo:"Ejemplo: barbería, clínica, profesional independiente, pequeño negocio local o servicio.",demoUrl:"demos/esencial.html",preview:"essential",items:["Diseño adaptado a tu marca","Inicio comercial y presentación","Servicios o carta visual","Contacto, ubicación y redes","Diseño responsive móvil","Preparada para publicar"]},
profesional:{tag:"Web Profesional · Desde 449 €",name:"Web Profesional",title:"Más contenido. Más confianza. Más motivos para elegirte.",copy:"Para empresas que necesitan explicar mejor su propuesta y cuidar cada parte del recorrido del cliente. Añadimos secciones, movimiento visual y recursos que ayudan a presentar el negocio con más fuerza.",demo:"Ejemplo: restaurante, gimnasio, club, academia, empresa de servicios o marca personal avanzada.",demoUrl:"demos/profesional.html",preview:"professional",items:["Todo lo incluido en Esencial","Secciones y páginas adicionales","Animaciones y microinteracciones","Galerías y formularios","Casos, proyectos o portfolio","Estructura orientada a conversión"]},
tienda:{tag:"Tienda Online · Desde 649 €",name:"Tienda Online",title:"Tu escaparate abierto todos los días, a cualquier hora.",copy:"Diseñamos una experiencia de compra coherente con tu marca para que el producto sea el protagonista y comprar resulte sencillo.",demo:"Ejemplo: ropa, complementos, coleccionismo, merchandising o productos propios.",demoUrl:"demos/tienda.html",preview:"shop",items:["Diseño de tienda personalizado","Catálogo y fichas de producto","Carrito y proceso de compra","Gestión de pedidos","Filtros y colecciones","Funciones extra según catálogo"]},
avanzada:{tag:"Web Avanzada · Desde 899 €",name:"Web Avanzada",title:"Cuando una web ya tiene que hacer cosas por ti.",copy:"Para proyectos que necesitan cuentas de usuario, zonas privadas, automatizaciones, datos o comportamientos específicos.",demo:"Ejemplo: portal de clientes, área privada de socios, reservas complejas, paneles o herramientas online.",demoUrl:"demos/avanzada.html",preview:"dashboard",items:["Registro e inicio de sesión","Perfiles y zonas privadas","Paneles personalizados","Automatizaciones","Base de datos e integraciones","Lógica específica del negocio"]},
especial:{tag:"Proyecto Especial · Presupuesto personalizado",name:"Proyecto Especial",title:"Si tu idea no cabe en una plantilla, mejor.",copy:"Aquí entran las plataformas y experiencias online que requieren plantear arquitectura, usuarios, reglas y funciones desde cero. El precio depende de todo lo que tenga que hacer el sistema.",demo:"Ejemplo: comunidad con perfiles y chat, plataforma de compraventa, subastas, rifas, marketplace o juego online sencillo.",demoUrl:"demos/especial.html",preview:"community",items:["Usuarios, perfiles y roles","Chat e interacción entre usuarios","Tiendas y marketplaces","Subastas, rifas y sistemas propios","Juegos sencillos online","Panel de administración y moderación"]}
};
const modal=document.querySelector("#planModal"),content=document.querySelector("#modalContent"),toast=document.querySelector("#toast");
function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3200)}
function galleryMarkup(key,p){
 const captions={
  esencial:["Portada limpia para presentar el negocio","Secciones sencillas para servicios y contacto","Versión móvil adaptada"],
  profesional:["Portada de mayor impacto visual","Más secciones, contenido y confianza","Experiencia responsive más completa"],
  tienda:["Catálogo y navegación de productos","Fichas, categorías y llamadas a compra","Compra cómoda también desde móvil"],
  avanzada:["Panel y zona privada de usuario","Datos, reservas y automatizaciones","Flujos personalizados según el negocio"],
  especial:["Comunidad y perfiles de usuario","Marketplace, subastas o rifas","Experiencias y funciones hechas a medida"]
 };
 return `<div class="gallery-wrap">
   <div class="gallery-head"><div><strong>Ejemplo visual</strong><br><span>Desliza, usa la rueda o las flechas</span></div><div class="gallery-controls"><button class="gallery-btn gallery-prev" aria-label="Anterior">‹</button><button class="gallery-btn gallery-next" aria-label="Siguiente">›</button></div></div>
   <div class="gallery-viewport" data-gallery="${key}">
     ${[1,2,3].map((n,i)=>`<div class="gallery-slide"><img src="assets/previews/${key}-${n}.svg?v=5" alt="Ejemplo ${p.name} ${n}"><div class="gallery-caption">${captions[key][i]}</div></div>`).join("")}
   </div>
   <div class="gallery-dots"><i class="active"></i><i></i><i></i></div>
 </div>`;
}
function wireGallery(root){
 const viewport=root.querySelector(".gallery-viewport"); if(!viewport) return;
 const slides=[...viewport.querySelectorAll(".gallery-slide")];
 const dots=[...root.querySelectorAll(".gallery-dots i")];
 const go=dir=>viewport.scrollBy({left:dir*viewport.clientWidth*.9,behavior:"smooth"});
 root.querySelector(".gallery-prev").addEventListener("click",()=>go(-1));
 root.querySelector(".gallery-next").addEventListener("click",()=>go(1));
 viewport.addEventListener("wheel",e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();viewport.scrollLeft+=e.deltaY;}},{passive:false});
 const sync=()=>{const center=viewport.scrollLeft+viewport.clientWidth/2;let best=0,dist=Infinity;slides.forEach((s,i)=>{const c=s.offsetLeft+s.offsetWidth/2,d=Math.abs(c-center);if(d<dist){dist=d;best=i}});dots.forEach((d,i)=>d.classList.toggle("active",i===best));};
 viewport.addEventListener("scroll",()=>requestAnimationFrame(sync));
}
async function contactPlan(key){const p=plans[key];const message=`Hola, he visto vuestra web de SoroByte y me interesa el plan "${p.name}". Me gustaría contaros mi idea y pedir presupuesto.`;try{await navigator.clipboard.writeText(message)}catch(e){}if(INSTAGRAM_USERNAME){window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`,"_blank");showToast("Mensaje copiado. Pégalo en el DM y envíalo.");}else{showToast(`Mensaje de "${p.name}" copiado. El DM se activará cuando añadamos el Instagram definitivo.`);}}
document.querySelectorAll(".contact-plan").forEach(btn=>btn.addEventListener("click",()=>contactPlan(btn.dataset.plan)));
document.querySelectorAll(".open-detail").forEach(btn=>btn.addEventListener("click",()=>{const key=btn.dataset.plan,p=plans[key];content.innerHTML=`<span class="modal-sub">${p.tag}</span><h2 class="modal-title">${p.title}</h2><p class="modal-copy">${p.copy}</p>${galleryMarkup(key,p)}<h3>Qué incluye este nivel</h3><div class="modal-grid">${p.items.map(i=>`<div class="modal-chip">✓ ${i}</div>`).join("")}</div><div class="modal-actions"><a class="btn btn-ghost" href="${p.demoUrl}?v=5" target="_blank">Entrar en la demo</a><button class="btn modal-contact" data-plan="${key}">Quiero este plan</button></div><p class="modal-copy" style="margin-top:24px">La demo es solo un ejemplo visual. La web final se diseña a medida con la identidad, colores y necesidades de cada negocio.</p>`;content.querySelector(".modal-contact").addEventListener("click",()=>contactPlan(key));wireGallery(content);modal.classList.add("active");modal.setAttribute("aria-hidden","false");}));
function closeModal(){modal.classList.remove("active");modal.setAttribute("aria-hidden","true")}
document.querySelector(".modal-close").addEventListener("click",closeModal);
document.querySelector(".modal-backdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
const glow=document.querySelector(".cursor-glow");if(glow){document.addEventListener("mousemove",e=>{glow.style.cssText=`position:fixed;left:${e.clientX-180}px;top:${e.clientY-180}px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(53,242,127,.055),transparent 65%);pointer-events:none;z-index:-1`})}