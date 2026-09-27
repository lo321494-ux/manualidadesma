export type VideoItem = {
  title: string;
  shortTitle: string;
  description: string;
  duration?: string;
  image: string;
  videoIds: string[];
  date?: string;
};

export const lessons: VideoItem[] = [
  { title: "Qué es el crochet, materiales y punto cadena", shortTitle: "Primeros pasos", description: "Conoce qué es el crochet, los materiales esenciales y aprende a crear el nudo deslizado y tu primera cadena.", duration: "18 min", image: "https://tejidoa.lovable.app/__l5e/assets-v1/8e2feb59-8b7a-40d5-836d-8730632537cd/lesson-1.jpg", videoIds: ["aDY0kpf7nqc"] },
  { title: "Punto bajo", shortTitle: "Punto bajo", description: "Practica uno de los puntos esenciales y aprende a subir de una vuelta a otra.", duration: "12 min", image: "https://tejidoa.lovable.app/assets/lesson-2-pro-BIPS1c4V.jpg", videoIds: ["E9_CwouUEYs"] },
  { title: "Punto deslizado, raso o enano", shortTitle: "Punto deslizado", description: "Domina el punto ideal para cerrar vueltas, unir piezas y desplazarte por el tejido.", duration: "10 min", image: "https://tejidoa.lovable.app/assets/lesson-3-pro-JWn4RO-4.jpg", videoIds: ["9wGCWXD6Hdw"] },
  { title: "Medio punto alto, punto medio, medio mono o media vareta", shortTitle: "Medio punto alto", description: "Añade altura y textura a tus tejidos con una puntada versátil y sencilla.", duration: "14 min", image: "https://tejidoa.lovable.app/assets/lesson-4-pro-BS5KhnOp.jpg", videoIds: ["nVk8ij6o6YE"] },
  { title: "Punto alto, vareta o mono", shortTitle: "Punto alto", description: "Aprende a construir tejidos ligeros y flexibles con el clásico punto alto.", duration: "13 min", image: "https://tejidoa.lovable.app/assets/lesson-5-pro-yx-5-BnN.jpg", videoIds: ["Wxx1KppB4Dw"] },
  { title: "Cómo empezar un tejido a crochet sin cadeneta de inicio", shortTitle: "Sin cadeneta", description: "Descubre una alternativa práctica para comenzar con una base más elástica.", duration: "11 min", image: "https://tejidoa.lovable.app/__l5e/assets-v1/5566a828-ae16-4664-b5a7-84adcd83e9eb/lesson-6.jpg", videoIds: ["Tpw9YKy8lO4"] },
  { title: "Cómo iniciar un tejido circular, cadeneta y anillo mágico", shortTitle: "Anillo mágico", description: "Inicia piezas circulares limpias, desde flores hasta tus primeros amigurumis.", duration: "19 min", image: "https://tejidoa.lovable.app/__l5e/assets-v1/edd4a863-4a74-4cd5-829c-0140585d3df8/lesson-7.jpg", videoIds: ["6phw9igbq-M"] },
  { title: "Aumentos y disminuciones", shortTitle: "Dar forma", description: "Controla el volumen y la silueta de cada pieza aumentando o reduciendo puntos.", duration: "17 min", image: "https://tejidoa.lovable.app/__l5e/assets-v1/25c1d686-ddde-4588-b2ad-a2bbbff3c6e9/lesson-8.jpg", videoIds: ["6g0F0eAlxGU"] },
  { title: "Punto alto doble, triple y con más hebras", shortTitle: "Puntos de altura", description: "Amplía tu repertorio con puntos altos de mayor longitud y caída.", duration: "16 min", image: "https://tejidoa.lovable.app/assets/lesson-9-pro-BHzlsI9Z.jpg", videoIds: ["FLyOV46m6Ig"] },
  { title: "Bufanda con capucha de gato", shortTitle: "Proyecto final", description: "Integra todo lo aprendido en una bufanda con capucha de gato, aplicando las lecciones anteriores.", duration: "28 min", image: "https://tejidoa.lovable.app/__l5e/assets-v1/4b9bad30-7745-494d-9f71-3e291e84b5ca/lesson-10.jpg", videoIds: ["F3CW0YBL0-o"] },
];

const wp = "https://arteencrochet.com/wp-content/uploads";
export const amigurumis: VideoItem[] = [
  { title:"Virgen en Crochet Amigurumi paso a paso",shortTitle:"Virgen",description:"Una figura tejida llena de significado y creatividad.",image:`${wp}/2021/05/Virgen-en-crochet-768x432.jpg`,videoIds:["rlv6xChJNHM","pdtGzPM8BNA"]},
  { title:"Jesús amigurumi",shortTitle:"Jesús amigurumi",description:"Un proyecto especial que combina técnica, detalle y significado.",date:"24 JUN 2026",image:`${wp}/2026/06/jesus-amigurumi-768x576.jpg`,videoIds:[]},
  { title:"Ovejita amigurumi: cómo hacer una oveja funko a crochet paso a paso",shortTitle:"Ovejita amigurumi",description:"Una oveja funko a crochet con su característica cabeza cuadrada.",date:"8 ABR 2026",image:`${wp}/2026/04/Ovejita-Amigurumi-blog-768x576.jpg`,videoIds:["iGoDbsh3Ipk","jXVANFS5VjY","fsSgoiuDbrM","jQZ57n97vCA","qA3SwrqF7To"]},
  { title:"Llavero Calamar de Coraline amigurumi",shortTitle:"Calamar de Coraline",description:"Teje este pequeño llavero siguiendo el paso a paso.",date:"14 ABR 2025",image:`${wp}/2025/04/calamar_Coraline-768x432.png`,videoIds:[]},
  { title:"Spiderman Miles Morales Amigurumi",shortTitle:"Miles Morales",description:"Amigurumi inspirado en el Spiderverso, de 14 cm de alto.",date:"11 FEB 2025",image:`${wp}/2025/02/Spiderman-Miles-Morales-768x432.png`,videoIds:[]},
  { title:"Mew Amigurumi paso a paso",shortTitle:"Mew",description:"Teje un Pokémon Mew amigurumi de aproximadamente 16 cm.",date:"29 ENE 2025",image:`${wp}/2025/01/mew-amigurumi_THUMB-768x432.jpg`,videoIds:[]},
  { title:"Amigurumi vaca",shortTitle:"Vaca",description:"Paso a paso para realizar una vaca amigurumi de cabeza cuadrada.",date:"17 JUL 2024",image:`${wp}/2024/07/vaca-amigurumi-11-768x576.jpg`,videoIds:[]},
  { title:"Pesebre en crochet",shortTitle:"Pesebre",description:"Una versión paso a paso de un pesebre en crochet con personajes de cabeza cuadrada.",date:"25 MAY 2024",image:`${wp}/2024/05/pesebre-en-crochet-768x576.jpg`,videoIds:[]},
  { title:"Oveja amigurumi: tutorial paso a paso",shortTitle:"Oveja",description:"Uno de los proyectos más tiernos para tejer a crochet.",image:`${wp}/2024/05/oveja_amigurumi-768x576.jpg`,videoIds:[]},
  { title:"Tortuga amigurumi",shortTitle:"Tortuga",description:"Teje por partes una encantadora tortuga amigurumi.",image:`${wp}/2023/09/tortuga-amigurumi-768x432.jpg`,videoIds:[]},
  { title:"Estrella en crochet Mario Bros",shortTitle:"Estrella",description:"Un proyecto divertido inspirado en el mundo de Mario Bros.",image:`${wp}/2023/05/estrella-mario-bros-9-768x576.jpg`,videoIds:[]},
  { title:"Conejo Amigurumi",shortTitle:"Conejo",description:"Un conejo amigurumi perfecto para cualquier estación del año.",image:`${wp}/2023/04/conejo-amigurumi-768x432.png`,videoIds:["fPP5h5adZ70"]},
  { title:"Kirby Amigurumi a Crochet – Patrón Paso a Paso",shortTitle:"Kirby",description:"Un proyecto fácil y divertido para amantes de los videojuegos.",image:`${wp}/2022/06/kirby-1-768x432.jpg`,videoIds:["oelE9mcAYYo"]},
  { title:"Frailejón Ernesto Pérez a crochet",shortTitle:"Frailejón",description:"Un tutorial inspirado en la naturaleza para tejer paso a paso.",image:`${wp}/2022/03/frailejon-ernesto-perez-768x576.jpg`,videoIds:["RfT_Fy3jA_A"]},
  { title:"Cabeza de muñeco de nieve a crochet",shortTitle:"Muñeco de nieve",description:"Teje una esfera navideña con forma de muñeco de nieve.",image:`${wp}/2021/12/muneco-de-nieve-768x432.jpg`,videoIds:["NstrDgx6w3s","gZN--Zyel3w"]},
  { title:"Reno amigurumi paso a paso",shortTitle:"Reno",description:"Una adorable esfera navideña tejida a crochet.",image:`${wp}/2021/11/reno_navideno-768x432.jpg`,videoIds:["6bkSPaUuRPI","xJmv500oo70"]},
  { title:"Gato calabaza a crochet",shortTitle:"Gato Halloween",description:"Un gato calabaza ideal para celebrar Halloween.",image:`${wp}/2021/09/Gato-halloween-en-crochet-1-768x432.jpg`,videoIds:["7ZEKiY-FtSA"]},
  { title:"Gatitos amigurumi paso a paso",shortTitle:"Gatitos",description:"Gatitos amigurumi tiernos y fáciles explicados paso a paso.",image:`${wp}/2021/09/Gatitos-amigurumi-768x432.jpg`,videoIds:["DBpE04L1QBU"]},
  { title:"Cómo tejer un pollo amigurumi paso a paso",shortTitle:"Pollo",description:"Una manera hermosa y sencilla de iniciarte en los amigurumis.",image:`${wp}/2021/05/pollo_amigurumi-768x432.jpg`,videoIds:["CnGk_0u2mi0"]},
];