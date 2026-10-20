// Datos falsos con los que arranca el modo demo. Todo vive en memoria (ver
// db.js): cualquier cambio hecho desde la interfaz se pierde al reiniciar el
// servidor y se vuelve a este estado inicial.
//
// Contraseña de todos los usuarios demo: DEMO_PASSWORD.

export const DEMO_PASSWORD = "demo1234";

const roles = [
  { id: 1, nombre: "Root" },
  { id: 2, nombre: "Administrador" },
  { id: 3, nombre: "Analista" },
  { id: 4, nombre: "Arquitecto" },
  { id: 5, nombre: "Ingeniero" },
  { id: 6, nombre: "Asistente" },
  { id: 7, nombre: "Analista Admin" },
  { id: 8, nombre: "Contador" },
  { id: 9, nombre: "Arquitecto Admin" },
  { id: 10, nombre: "Ingeniero Admin" },
];

// estado 0 = debe cambiar la contraseña en el próximo inicio de sesión.
const usuarios = [
  { id: 1, nombre: "Ana", apellido1: "Rodríguez", apellido2: "Mora", correo_electronico: "admin@ipsum.demo", rol_id: 2, activated: 1, estado: 1 },
  { id: 2, nombre: "Carlos", apellido1: "Jiménez", apellido2: "Solano", correo_electronico: "carlos@ipsum.demo", rol_id: 3, activated: 1, estado: 1 },
  { id: 3, nombre: "María", apellido1: "Fernández", apellido2: "Rojas", correo_electronico: "maria@ipsum.demo", rol_id: 7, activated: 1, estado: 1 },
  { id: 4, nombre: "Luis", apellido1: "Vargas", apellido2: "Chaves", correo_electronico: "luis@ipsum.demo", rol_id: 4, activated: 1, estado: 1 },
  { id: 5, nombre: "Sofía", apellido1: "Castro", apellido2: "Méndez", correo_electronico: "sofia@ipsum.demo", rol_id: 9, activated: 1, estado: 1 },
  { id: 6, nombre: "Jorge", apellido1: "Solís", apellido2: "Ureña", correo_electronico: "jorge@ipsum.demo", rol_id: 5, activated: 1, estado: 1 },
  { id: 7, nombre: "Daniela", apellido1: "Quesada", apellido2: "Arias", correo_electronico: "daniela@ipsum.demo", rol_id: 3, activated: 1, estado: 1 },
  { id: 8, nombre: "Pedro", apellido1: "Navarro", apellido2: "Brenes", correo_electronico: "nuevo@ipsum.demo", rol_id: 3, activated: 1, estado: 0 },
  { id: 9, nombre: "Rebeca", apellido1: "Salas", apellido2: "Vindas", correo_electronico: "rebeca@ipsum.demo", rol_id: 10, activated: 1, estado: 1 },
  { id: 10, nombre: "Óscar", apellido1: "Pérez", apellido2: "León", correo_electronico: "oscar@ipsum.demo", rol_id: 4, activated: 0, estado: 1 },
].map((u) => ({ ...u, password: DEMO_PASSWORD }));

const etapas = [
  "Recepción de documentos",
  "Análisis de la familia",
  "Estudio técnico del terreno",
  "Diseño de planos",
  "Presupuesto y avalúo",
  "Envío a la entidad",
  "Aprobado por la entidad",
  "Envío al BANHVI (Registrado por Entidad)",
  "Aprobado por el BANHVI",
  "En construcción",
  "Facturado",
].map((nombre, index) => ({ id: index + 1, nombre, activated: 1 }));

// A qué roles se notifica al pasar un proyecto a cada etapa.
const stageNotificationRoles = {
  1: ["Analista"],
  2: ["Analista"],
  3: ["Arquitecto", "Ingeniero"],
  4: ["Arquitecto"],
  5: ["Analista", "Arquitecto"],
  6: ["Analista"],
  7: ["Analista", "Arquitecto"],
  8: ["Analista"],
  9: ["Analista", "Arquitecto", "Ingeniero"],
  10: ["Ingeniero"],
  11: [],
};

const tipos_bono = [
  { id: 1, nombre: "Bono Ordinario", activated: 1 },
  { id: 2, nombre: "Artículo 59", activated: 1 },
  { id: 3, nombre: "Bono Crédito", activated: 1 },
  { id: 4, nombre: "Construcción en Lote Propio", activated: 1 },
  { id: 5, nombre: "RAMT (Reparación, Ampliación y Mejoras)", activated: 1 },
];

const variantes_bono = [
  { id: 1, nombre: "Adulto Mayor Ordinario", tipo_bono_id: 1, activated: 1 },
  { id: 2, nombre: "Familia", tipo_bono_id: 1, activated: 1 },
  { id: 3, nombre: "Adulto Mayor", tipo_bono_id: 2, activated: 1 },
  { id: 4, nombre: "Discapacidad", tipo_bono_id: 2, activated: 1 },
  { id: 5, nombre: "Extrema Necesidad", tipo_bono_id: 2, activated: 1 },
  { id: 6, nombre: "Crédito con Bono", tipo_bono_id: 3, activated: 1 },
  { id: 7, nombre: "Lote Propio", tipo_bono_id: 4, activated: 1 },
  { id: 8, nombre: "Mejoras", tipo_bono_id: 5, activated: 1 },
];

const grupos_proyectos = [
  { id: 1, nombre: "Grupo Norte 2026", descripcion: "Proyectos de la zona norte" },
  { id: 2, nombre: "Feria de Vivienda", descripcion: "Casos captados en la feria de agosto" },
  { id: 3, nombre: "Referidos", descripcion: "Familias referidas por otros clientes" },
];

const entidades = [
  { id: 1, nombre: "Mutual Central", direccion: "San José centro", telefono: "2222-1000", correo_electronico: "vivienda@mutualcentral.demo" },
  { id: 2, nombre: "Banco Comunal", direccion: "Alajuela, frente al parque", telefono: "2440-2000", correo_electronico: "bonos@bancocomunal.demo" },
  { id: 3, nombre: "Cooperativa del Sur", direccion: "Pérez Zeledón", telefono: "2771-3000", correo_electronico: "info@coopesur.demo" },
  { id: 4, nombre: "Financiera Horizonte", direccion: "Heredia, Barreal", telefono: "2260-4000", correo_electronico: "contacto@horizonte.demo" },
];

const centros_negocios = [
  { id: 1, entidad_id: 1, nombre: "Centro de Negocios Paseo Colón", direccion: "Paseo Colón", telefono: "2222-1010", correo_electronico: "paseocolon@mutualcentral.demo" },
  { id: 2, entidad_id: 1, nombre: "Centro de Negocios Cartago", direccion: "Cartago centro", telefono: "2551-1020", correo_electronico: "cartago@mutualcentral.demo" },
  { id: 3, entidad_id: 2, nombre: "Sucursal Alajuela", direccion: "Alajuela centro", telefono: "2440-2010", correo_electronico: "alajuela@bancocomunal.demo" },
  { id: 4, entidad_id: 2, nombre: "Sucursal San Carlos", direccion: "Ciudad Quesada", telefono: "2460-2020", correo_electronico: "sancarlos@bancocomunal.demo" },
  { id: 5, entidad_id: 3, nombre: "Oficina San Isidro", direccion: "San Isidro de El General", telefono: "2771-3010", correo_electronico: "sanisidro@coopesur.demo" },
  { id: 6, entidad_id: 4, nombre: "Oficina Heredia", direccion: "Heredia centro", telefono: "2260-4010", correo_electronico: "heredia@horizonte.demo" },
];

const analistas_entidades = [
  { id: 1, entidad_id: 1, nombre: "Gabriela", apellido1: "Montero", apellido2: "Sáenz", correo_electronico: "gmontero@mutualcentral.demo", telefono: "8811-2233" },
  { id: 2, entidad_id: 1, nombre: "Esteban", apellido1: "Calderón", apellido2: "Ruiz", correo_electronico: "ecalderon@mutualcentral.demo", telefono: "8822-3344" },
  { id: 3, entidad_id: 2, nombre: "Patricia", apellido1: "Hidalgo", apellido2: "Vega", correo_electronico: "phidalgo@bancocomunal.demo", telefono: "8833-4455" },
  { id: 4, entidad_id: 3, nombre: "Ricardo", apellido1: "Umaña", apellido2: "Porras", correo_electronico: "rumana@coopesur.demo", telefono: "8844-5566" },
  { id: 5, entidad_id: 4, nombre: "Lucía", apellido1: "Esquivel", apellido2: "Camacho", correo_electronico: "lesquivel@horizonte.demo", telefono: "8855-6677" },
];

// La columna real de constructores es "Nombre" (ver const.js); se guarda
// también "nombre" porque así lo devuelve /formValues.
const constructores = [
  { id: 1, nombre: "Constructora", Nombre: "Constructora", apellido1: "Hermanos Araya", apellido2: "", telefono: "2290-1111", correo_electronico: "obras@hnosaraya.demo" },
  { id: 2, nombre: "Manuel", Nombre: "Manuel", apellido1: "Zúñiga", apellido2: "Badilla", telefono: "8701-2222", correo_electronico: "mzuniga@obras.demo" },
  { id: 3, nombre: "Edificaciones", Nombre: "Edificaciones", apellido1: "del Valle", apellido2: "", telefono: "2250-3333", correo_electronico: "info@edvalle.demo" },
];

const fiscales = [
  { id: 1, nombre: "Rodrigo", apellido1: "Alfaro", apellido2: "Cordero", telefono: "8890-1234", correo_electronico: "ralfaro@fiscal.demo" },
  { id: 2, nombre: "Silvia", apellido1: "Murillo", apellido2: "Ramírez", telefono: "8890-5678", correo_electronico: "smurillo@fiscal.demo" },
];

const promotores_ipsum = [
  { id: 1, nombre: "Andrea", apellido1: "Barrantes", apellido2: "Soto" },
  { id: 2, nombre: "Felipe", apellido1: "Rojas", apellido2: "Campos" },
  { id: 3, nombre: "Karla", apellido1: "Villalobos", apellido2: "Mora" },
];

const tipos_propietario = [
  { id: 1, nombre: "Cédula física" },
  { id: 2, nombre: "Cédula jurídica" },
  { id: 3, nombre: "DIMEX" },
];

// ---------------------------------------------------------------------------
// Proyectos

const projectSeeds = [
  { nombre: "Familia Araya Gómez", bono: 2, variante: 3, grupo: 1, etapa: 4, prov: ["Alajuela", "San Carlos", "Quesada"], coords: [10.3238, -84.4271], entidad: [2, 4, 3], people: { analista: 2, arquitecto: 4, ingeniero: 6, constructor: 1, promotor: 1, fiscal: 1 }, presupuesto: "13950000", dias: 64 },
  { nombre: "Familia Brenes Solano", bono: 1, variante: 2, grupo: 2, etapa: 2, prov: ["San José", "Desamparados", "San Miguel"], coords: [9.8735, -84.0604], entidad: [1, 1, 1], people: { analista: 7, arquitecto: 5, ingeniero: 9, constructor: 2, promotor: 2, fiscal: 2 }, presupuesto: "9800000", dias: 21 },
  { nombre: "Familia Chacón Ulate", bono: 4, variante: 7, grupo: null, etapa: 6, prov: ["Cartago", "Paraíso", "Orosi"], coords: [9.7979, -83.8566], entidad: [1, 2, 2], people: { analista: 2, arquitecto: 4, ingeniero: 6, constructor: 3, promotor: 3, fiscal: 1 }, presupuesto: "15200000", dias: 110 },
  { nombre: "Familia Durán Picado", bono: 2, variante: 4, grupo: 3, etapa: 9, prov: ["Heredia", "Barva", "San Pablo"], coords: [10.0215, -84.1217], entidad: [4, 6, 5], people: { analista: 3, arquitecto: 5, ingeniero: 9, constructor: 1, promotor: 1, fiscal: 2 }, presupuesto: "14100000", dias: 180 },
  { nombre: "Familia Esquivel Mora", bono: 5, variante: 8, grupo: null, etapa: 10, prov: ["Puntarenas", "Esparza", "Espíritu Santo"], coords: [9.9922, -84.6648], entidad: [2, 3, 3], people: { analista: 7, arquitecto: 4, ingeniero: 6, constructor: 2, promotor: 2, fiscal: 1 }, presupuesto: "6500000", dias: 220 },
  { nombre: "Familia Fallas Céspedes", bono: 1, variante: 1, grupo: 1, etapa: 11, prov: ["San José", "Pérez Zeledón", "San Isidro de El General"], coords: [9.3754, -83.7035], entidad: [3, 5, 4], people: { analista: 2, arquitecto: 5, ingeniero: 9, constructor: 3, promotor: 3, fiscal: 2 }, presupuesto: "12750000", dias: 320 },
  { nombre: "Familia Guzmán Rojas", bono: 3, variante: 6, grupo: 2, etapa: 1, prov: ["Alajuela", "Grecia", "Tacares"], coords: [10.0583, -84.3069], entidad: [2, 3, 3], people: { analista: 3, arquitecto: null, ingeniero: null, constructor: null, promotor: 1, fiscal: null }, presupuesto: "", dias: 3 },
  { nombre: "Familia Herrera Vílchez", bono: 2, variante: 5, grupo: 3, etapa: 5, prov: ["Guanacaste", "Liberia", "Liberia"], coords: [10.6346, -85.4377], entidad: [1, 1, 2], people: { analista: 7, arquitecto: 4, ingeniero: 6, constructor: 1, promotor: 2, fiscal: 1 }, presupuesto: "13950000", dias: 95 },
  { nombre: "Familia Ibarra Sequeira", bono: 4, variante: 7, grupo: null, etapa: 3, prov: ["Limón", "Pococí", "Guápiles"], coords: [10.2153, -83.7848], entidad: [4, 6, 5], people: { analista: 2, arquitecto: 5, ingeniero: 9, constructor: 2, promotor: 3, fiscal: 2 }, presupuesto: "11300000", dias: 40 },
  { nombre: "Familia Jara Montes", bono: 1, variante: 2, grupo: 1, etapa: 7, prov: ["Cartago", "La Unión", "Tres Ríos"], coords: [9.9019, -83.9906], entidad: [1, 2, 1], people: { analista: 3, arquitecto: 4, ingeniero: 6, constructor: 3, promotor: 1, fiscal: 1 }, presupuesto: "10400000", dias: 150 },
  { nombre: "Familia Leiva Cordero", bono: 2, variante: 3, grupo: 2, etapa: 8, prov: ["Puntarenas", "Buenos Aires", "Buenos Aires"], coords: [9.1676, -83.3345], entidad: [3, 5, 4], people: { analista: 7, arquitecto: 5, ingeniero: 9, constructor: 1, promotor: 2, fiscal: 2 }, presupuesto: "13950000", dias: 170 },
  { nombre: "Familia Madrigal Pineda", bono: 5, variante: 8, grupo: null, etapa: 2, prov: ["Heredia", "Santo Domingo", "Santo Tomás"], coords: [9.9813, -84.0889], entidad: [4, 6, 5], people: { analista: 2, arquitecto: null, ingeniero: 6, constructor: null, promotor: 3, fiscal: null }, presupuesto: "4200000", dias: 12, activo: 0 },
  { nombre: "Familia Núñez Valverde", bono: 1, variante: 1, grupo: 3, etapa: 4, prov: ["Guanacaste", "Nicoya", "Nicoya"], coords: [10.1483, -85.452], entidad: [2, 3, 3], people: { analista: 3, arquitecto: 4, ingeniero: 9, constructor: 2, promotor: 1, fiscal: 1 }, presupuesto: "12100000", dias: 58 },
  { nombre: "Familia Obando Rivera", bono: 2, variante: 4, grupo: 1, etapa: 6, prov: ["San José", "Aserrí", "Aserrí"], coords: [9.8584, -84.0912], entidad: [1, 1, 2], people: { analista: 7, arquitecto: 5, ingeniero: 6, constructor: 3, promotor: 2, fiscal: 2 }, presupuesto: "14300000", dias: 125 },
];

const descripciones = [
  "Construcción de vivienda nueva de 42 m² con dos dormitorios.",
  "Familia con adulto mayor, requiere rampa de acceso y baño adaptado.",
  "Terreno propio con topografía irregular, pendiente de estudio de suelos.",
  "Caso prioritario por condición de hacinamiento.",
  "Reparación de techo y cambio de instalación eléctrica.",
];

const otrasSenas = [
  "200 m norte de la escuela, casa color verde.",
  "Frente a la plaza de deportes, portón negro.",
  "Calle de lastre, última casa a mano derecha.",
  "Contiguo a la pulpería La Esquina.",
];

const familias = [
  [
    { tipo_miembro: "Jefa de hogar", nombre: "Rosa", apellido2: "Méndez", ingresos: "180000", tipo_ingresos: "Informal", telefono: "8612-3344", email: "rosa.familia@correo.demo", adulto: 0, discapacidad: 0 },
    { tipo_miembro: "Hijo", nombre: "Kevin", apellido2: "Méndez", ingresos: "", tipo_ingresos: "", telefono: "", email: "", adulto: 0, discapacidad: 0 },
    { tipo_miembro: "Madre", nombre: "Elena", apellido2: "Salazar", ingresos: "80000", tipo_ingresos: "Pensión", telefono: "", email: "", adulto: 1, discapacidad: 0 },
  ],
  [
    { tipo_miembro: "Jefe de familia", nombre: "Mario", apellido2: "Corrales", ingresos: "320000", tipo_ingresos: "Asalariado", telefono: "8723-4455", email: "", adulto: 0, discapacidad: 0 },
    { tipo_miembro: "Cónyuge", nombre: "Laura", apellido2: "Segura", ingresos: "150000", tipo_ingresos: "Informal", telefono: "8723-9988", email: "laura.s@correo.demo", adulto: 0, discapacidad: 0 },
    { tipo_miembro: "Hija", nombre: "Valeria", apellido2: "Segura", ingresos: "", tipo_ingresos: "", telefono: "", email: "", adulto: 0, discapacidad: 1 },
  ],
  [
    { tipo_miembro: "Jefe de hogar", nombre: "José", apellido2: "Alvarado", ingresos: "95000", tipo_ingresos: "Pensión", telefono: "8834-5566", email: "", adulto: 1, discapacidad: 0 },
    { tipo_miembro: "Esposa", nombre: "Carmen", apellido2: "Ramírez", ingresos: "", tipo_ingresos: "", telefono: "", email: "", adulto: 1, discapacidad: 0 },
  ],
];

const notasSeed = [
  { tipo: "Análisis", descripcion: "Se recibieron los documentos de identidad de toda la familia." },
  { tipo: "Técnico", descripcion: "Visita al terreno realizada. El acceso es por calle de lastre en buen estado." },
  { tipo: "Análisis", descripcion: "Pendiente constancia salarial actualizada del jefe de hogar." },
  { tipo: "Técnico", descripcion: "Se ajustó el diseño para incluir rampa de acceso." },
];

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function daysAgo(days, hour = 10) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 15, 0, 0);
  return date;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function randomCedula(seed) {
  const n = (seed * 7919) % 10000;
  return `${(seed % 7) + 1}-${String(1000 + ((seed * 37) % 9000)).padStart(4, "0")}-${String(n).padStart(4, "0")}`;
}

export function createSeed() {
  const proyectos = [];
  const miembros = [];
  const notas = [];
  const projectImages = [];
  const locationImages = [];
  const notificaciones = [];

  let memberDbId = 1;
  let noteId = 1;
  let imageId = 1;
  let notificationId = 1;

  projectSeeds.forEach((seed, index) => {
    const id = index + 1;
    const createdAt = daysAgo(seed.dias);
    const apellido1 = seed.nombre.replace("Familia ", "").split(" ")[0];

    proyectos.push({
      id,
      nombre: seed.nombre,
      slug: slugify(seed.nombre),
      activo: seed.activo ?? 1,
      created_at: createdAt.toISOString(),
      etapa_id: seed.etapa,
      basics: {
        bono_id: seed.bono,
        variante_bono_id: seed.variante,
        grupo_id: seed.grupo ?? "",
        descripcion: descripciones[index % descripciones.length],
        fis: index % 3 === 0,
      },
      location: {
        provincia: seed.prov[0],
        canton: seed.prov[1],
        distrito: seed.prov[2],
        otro: otrasSenas[index % otrasSenas.length],
        tipo_propietario: "Cédula física",
        propietario: randomCedula(id + 100),
        plano_catastro: `${(id % 7) + 1}-${String(200000 + id * 1371).slice(0, 6)}-2019`,
        finca: `${(id % 7) + 1}-${String(400000 + id * 2113).slice(0, 6)}-000`,
        google_url: `https://www.google.com/maps?q=${seed.coords[0]},${seed.coords[1]}`,
      },
      admin: {
        entidad_id: seed.entidad[0],
        centro_negocio_id: seed.entidad[1],
        analista_entidad_id: seed.entidad[2],
        presupuesto: seed.presupuesto,
        avaluo: seed.presupuesto ? String(Math.round(Number(seed.presupuesto) * 0.35)) : "",
        apc: seed.etapa >= 4 ? `APC-${2026}${String(id).padStart(4, "0")}` : "",
        cfia: seed.etapa >= 4 ? `OC-${980000 + id * 13}` : "",
      },
      people: {
        constructor_id: seed.people.constructor ?? "",
        arquitecto_id: seed.people.arquitecto ?? "",
        promotor_id: seed.people.promotor ?? "",
        analista_id: seed.people.analista ?? "",
        ingeniero_id: seed.people.ingeniero ?? "",
        fiscal_id: seed.people.fiscal ?? "",
      },
    });

    // Familia
    familias[index % familias.length].forEach((member, mIndex) => {
      const cedula = randomCedula(id * 10 + mIndex);
      const telefono = member.telefono;
      miembros.push({
        db_id: memberDbId++,
        proyecto_id: id,
        id: cedula,
        tipo_id: "Cédula",
        nombre: member.nombre,
        apellido1,
        apellido2: member.apellido2,
        tipo_miembro: member.tipo_miembro,
        ingresos: member.ingresos,
        tipo_ingresos: member.tipo_ingresos,
        email: member.email,
        telefono,
        adulto: member.adulto,
        discapacidad: member.discapacidad,
        is_contact: telefono ? 1 : 0,
        id_link: mIndex === 0 ? "/mock/cedula.svg" : "",
        id_route: mIndex === 0 ? `/${slugify(seed.nombre)}/cedula-${cedula}.svg` : "",
      });
    });

    // Bitácora: más entradas cuanto más avanzado el proyecto.
    const noteCount = Math.min(notasSeed.length, Math.max(1, Math.ceil(seed.etapa / 3)));
    for (let n = 0; n < noteCount; n++) {
      const autor = n % 2 === 0 ? seed.people.analista : seed.people.arquitecto || seed.people.analista;
      notas.push({
        id: noteId++,
        proyecto_id: id,
        usuario_id: autor,
        tipo: notasSeed[n].tipo,
        descripcion: notasSeed[n].descripcion,
        fecha_ingreso: isoDate(daysAgo(Math.max(0, seed.dias - n * 7 - 1))),
      });
    }

    // Fotos del proyecto y del terreno
    const photoCount = seed.etapa >= 3 ? 3 : seed.etapa >= 2 ? 1 : 0;
    for (let p = 0; p < photoCount; p++) {
      const file = `casa-${((index + p) % 4) + 1}.svg`;
      projectImages.push({
        id: imageId++,
        proyecto_id: id,
        img_link: `/mock/${file}`,
        img_route: `/${slugify(seed.nombre)}/fotos/${p + 1}-${file}`,
      });
    }
    if (seed.etapa >= 3) {
      for (let l = 0; l < 2; l++) {
        const file = `lote-${((index + l) % 2) + 1}.svg`;
        locationImages.push({
          id: imageId++,
          proyecto_id: id,
          img_link: `/mock/${file}`,
          img_route: `/${slugify(seed.nombre)}/ubicacion/${l + 1}-${file}`,
        });
      }
    }
  });

  // Notificaciones de ejemplo para que la campanita y la bitácora no
  // arranquen vacías.
  const notify = (data) =>
    notificaciones.push({
      id: notificationId++,
      leido: 0,
      oculto: 0,
      ...data,
    });

  notify({ tipo: "proyecto_creado", proyecto_id: 7, remitente_usuario_id: 3, usuario_id: 1, titulo: "Nuevo proyecto creado", mensaje: "Se creó el proyecto \"Familia Guzmán Rojas\".", created_at: daysAgo(3, 9).toISOString() });
  notify({ tipo: "cambio_etapa", proyecto_id: 2, remitente_usuario_id: 1, usuario_id: 7, titulo: "Cambio de etapa: Análisis de la familia", mensaje: "El proyecto \"Familia Brenes Solano\" pasó a la etapa \"Análisis de la familia\".", created_at: daysAgo(2, 14).toISOString() });
  notify({ tipo: "manual", proyecto_id: 1, remitente_usuario_id: 2, usuario_id: 1, titulo: "Revisión de planos", mensaje: "Ana, ¿me ayudás a revisar los planos antes de enviarlos a la entidad?", created_at: daysAgo(1, 11).toISOString() });
  notify({ tipo: "cambio_etapa", proyecto_id: 4, remitente_usuario_id: 3, usuario_id: 1, titulo: "Cambio de etapa: Aprobado por el BANHVI", mensaje: "El proyecto \"Familia Durán Picado\" pasó a la etapa \"Aprobado por el BANHVI\".", created_at: daysAgo(0, 8).toISOString() });
  notify({ tipo: "manual", proyecto_id: 3, remitente_usuario_id: 1, usuario_id: 2, titulo: "Documentos pendientes", mensaje: "Carlos, faltan las constancias de ingresos de la familia Chacón.", created_at: daysAgo(4, 16).toISOString(), leido: 1 });
  notify({ tipo: "cambio_etapa", proyecto_id: 9, remitente_usuario_id: 2, usuario_id: 4, titulo: "Cambio de etapa: Estudio técnico del terreno", mensaje: "El proyecto \"Familia Ibarra Sequeira\" pasó a la etapa \"Estudio técnico del terreno\".", created_at: daysAgo(5, 10).toISOString() });

  return {
    roles,
    usuarios,
    etapas,
    stageNotificationRoles,
    generics: {
      tipos_bono,
      variantes_bono,
      grupos_proyectos,
      entidades,
      centros_negocios,
      analistas_entidades,
      constructores,
      fiscales,
      promotores_ipsum,
      tipos_propietario,
    },
    proyectos,
    miembros,
    notas,
    projectImages,
    locationImages,
    notificaciones,
    // Archivos subidos desde la interfaz (fotos), servidos por
    // app/mock-files/[id]/route.js.
    files: {},
    counters: {
      usuario: usuarios.length + 1,
      proyecto: proyectos.length + 1,
      miembro: memberDbId,
      nota: noteId,
      imagen: imageId,
      notificacion: notificationId,
      file: 1,
    },
  };
}

export { slugify };
