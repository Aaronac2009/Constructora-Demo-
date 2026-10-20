import { getDb, nextId } from "./db";
import { slugify } from "./seed";

// Backend simulado: replica los endpoints que el frontend llama vía
// process.env.BACKEND_URL, con la misma forma de respuesta, pero leyendo y
// escribiendo en la base en memoria de db.js. Lo usa mock/installFetch.js.

const ADMIN_ROLES = [1, 2, 7, 9, 10];
const ROLE_GROUPS = {
  Analista: [3, 7],
  Arquitecto: [4, 9],
  Ingeniero: [5, 10],
};

const ok = (body = { ok: true }) => ({ status: 200, body });
const fail = (status, msg) => ({ status, body: { msg } });

const eq = (a, b) => a != null && b != null && String(a) === String(b);
const findById = (list, id) => list.find((row) => eq(row.id, id));

function fullName(person) {
  if (!person) return null;
  return `${person.nombre ?? person.Nombre ?? ""} ${person.apellido1 || ""}`.trim();
}

function publicUser(user) {
  const { password: _password, estado: _estado, ...rest } = user;
  return rest;
}

function usersWithRoles(roleIds) {
  return getDb()
    .usuarios.filter((u) => roleIds.includes(Number(u.rol_id)))
    .map(publicUser);
}

// --- Archivos subidos -------------------------------------------------------

async function storeFile(file, folder) {
  const db = getDb();
  const id = nextId("file");
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name || `archivo-${id}`;
  db.files[id] = { buffer, type: file.type || "application/octet-stream", name };
  return {
    img_link: `/mock-files/${id}`,
    img_route: `/${folder}/${name}`,
    fileId: id,
  };
}

function removeFileByLink(link) {
  const match = /^\/mock-files\/(\d+)/.exec(link || "");
  if (match) delete getDb().files[match[1]];
}

// --- Proyectos ---------------------------------------------------------------

function projectRow(project) {
  const { generics, usuarios } = getDb();
  const { basics, location, admin, people } = project;
  const bono = findById(generics.tipos_bono, basics.bono_id);
  const variante = findById(generics.variantes_bono, basics.variante_bono_id);

  return {
    id: project.id,
    nombre: project.nombre,
    slug: project.slug,
    activo: project.activo,
    created_at: project.created_at,
    etapa_id: project.etapa_id,
    descripcion: basics.descripcion,
    bono_id: basics.bono_id === "" ? null : Number(basics.bono_id),
    bono: bono?.nombre ?? null,
    variante_bono_id: basics.variante_bono_id === "" ? null : Number(basics.variante_bono_id),
    variante_bono: variante?.nombre ?? null,
    grupo: findById(generics.grupos_proyectos, basics.grupo_id)?.nombre ?? null,
    provincia: location.provincia,
    canton: location.canton,
    distrito: location.distrito,
    otro: location.otro,
    google_url: location.google_url,
    entidad: findById(generics.entidades, admin.entidad_id)?.nombre ?? null,
    centro_negocio: findById(generics.centros_negocios, admin.centro_negocio_id)?.nombre ?? null,
    presupuesto: admin.presupuesto,
    p_constructor: fullName(findById(generics.constructores, people.constructor_id)),
    promotor: fullName(findById(generics.promotores_ipsum, people.promotor_id)),
    fiscal: fullName(findById(generics.fiscales, people.fiscal_id)),
    analista_id: people.analista_id || null,
    analista: fullName(findById(usuarios, people.analista_id)),
    arquitecto_id: people.arquitecto_id || null,
    arquitecto: fullName(findById(usuarios, people.arquitecto_id)),
    ingeniero_id: people.ingeniero_id || null,
    ingeniero: fullName(findById(usuarios, people.ingeniero_id)),
  };
}

function getProject(id) {
  return findById(getDb().proyectos, id);
}

function projectMembers(projectId) {
  return getDb().miembros.filter((m) => eq(m.proyecto_id, projectId));
}

function projectData(id) {
  const project = getProject(id);
  if (!project) return fail(404, "Proyecto no encontrado");

  return ok({
    projectName: { nombre: project.nombre, slug: project.slug },
    basicsData: { ...project.basics },
    familiesData: projectMembers(id),
    locationsData: { ...project.location },
    adminsData: { ...project.admin },
    peopleData: { ...project.people },
    stagesData: { etapa_id: project.etapa_id },
  });
}

// --- Notificaciones ----------------------------------------------------------

function createNotification(data) {
  const db = getDb();
  db.notificaciones.push({
    id: nextId("notificacion"),
    leido: 0,
    oculto: 0,
    created_at: new Date().toISOString(),
    ...data,
  });
}

function notificationRow(n) {
  const { usuarios } = getDb();
  return {
    ...n,
    proyecto_nombre: getProject(n.proyecto_id)?.nombre ?? null,
    remitente_nombre: fullName(findById(usuarios, n.remitente_usuario_id)),
    destinatario_nombre: fullName(findById(usuarios, n.usuario_id)),
  };
}

function sortByDateDesc(list) {
  return [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// --- Rutas -------------------------------------------------------------------

const routes = [
  // Autenticación
  ["POST", "/login", ({ body }) => {
    const user = getDb().usuarios.find(
      (u) => u.correo_electronico.toLowerCase() === String(body.email || "").trim().toLowerCase(),
    );
    if (!user || user.activated == 0 || user.password !== body.password) {
      return fail(401, "Usuario o contraseña incorrectos");
    }
    return ok({
      id: user.id,
      nombre: fullName(user),
      rol_id: user.rol_id,
      requiresPasswordChange: user.estado == 0,
    });
  }],

  ["POST", "/changePassword", ({ body }) => {
    const user = findById(getDb().usuarios, body.id);
    if (!user) return fail(404, "Usuario no encontrado");
    if (user.password !== body.currentPassword) {
      return fail(400, "La contraseña actual no es correcta");
    }
    user.password = body.newPassword;
    user.estado = 1;
    return ok({ id: user.id, nombre: fullName(user), rol_id: user.rol_id });
  }],

  ["POST", "/forgotPassword", ({ body }) => {
    const term = String(body.email || "").trim().toLowerCase();
    const user = getDb().usuarios.find((u) => u.correo_electronico.toLowerCase() === term);
    if (!user) return ok({ noUser: true });
    // En el demo no se envía ningún correo: solo se simula el éxito.
    return ok({ ok: true });
  }],

  // Catálogos
  ["GET", "/generics/:table", ({ params }) => {
    const db = getDb();
    if (params.table === "etapas") return ok(db.etapas);
    const rows = db.generics[params.table];
    if (!rows) return fail(404, `Tabla desconocida: ${params.table}`);
    return ok(rows);
  }],

  ["POST", "/insertGenerics", ({ body }) => {
    const { table, ...fields } = body;
    const rows = getDb().generics[table];
    if (!rows) return fail(400, `Tabla desconocida: ${table}`);
    const insertId = rows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    const row = { id: insertId, activated: 1, ...fields };
    if (table === "constructores") row.nombre = row.Nombre;
    rows.push(row);
    return ok({ insertId });
  }],

  ["POST", "/updateGenerics", ({ body }) => {
    const { table, id, ...fields } = body;
    const rows = getDb().generics[table];
    const row = rows && findById(rows, id);
    if (!row) return fail(404, "Registro no encontrado");
    Object.assign(row, fields);
    if (table === "constructores" && fields.Nombre !== undefined) row.nombre = fields.Nombre;
    return ok();
  }],

  ["GET", "/formValues", () => {
    const { generics } = getDb();
    const active = (rows) => rows.filter((r) => r.activated != 0);
    return ok({
      basicFormValues: {
        bonos: active(generics.tipos_bono),
        varbonos: active(generics.variantes_bono).map((v) => ({ ...v, bono_id: v.tipo_bono_id })),
        grupos: generics.grupos_proyectos,
      },
      adminFormValues: {
        entidades: generics.entidades,
        centros_negocio: generics.centros_negocios,
        analista_entidades: generics.analistas_entidades,
      },
      peopleFormValues: {
        constructores: generics.constructores,
        promotores: generics.promotores_ipsum,
        fiscales: generics.fiscales,
        analistas: usersWithRoles(ROLE_GROUPS.Analista),
        arquitectos: usersWithRoles(ROLE_GROUPS.Arquitecto),
        ingenieros: usersWithRoles(ROLE_GROUPS.Ingeniero),
      },
    });
  }],

  ["GET", "/stageNotificationRoles", () => ok(getDb().stageNotificationRoles)],

  // Proyectos
  ["GET", "/allProjects", () => ok(getDb().proyectos.map(projectRow))],

  ["POST", "/new", ({ body }) => {
    const db = getDb();
    const creator = findById(db.usuarios, body.creatorUserId);
    const nombre = String(body.projectName || "").trim() || "Proyecto sin nombre";
    const id = nextId("proyecto");

    // El creador queda asignado según su rol, para que un no-admin pueda
    // seguir editando el proyecto que acaba de crear.
    const rol = Number(creator?.rol_id);
    const people = {
      constructor_id: "",
      arquitecto_id: ROLE_GROUPS.Arquitecto.includes(rol) ? creator.id : "",
      promotor_id: "",
      analista_id: ROLE_GROUPS.Analista.includes(rol) ? creator.id : "",
      ingeniero_id: ROLE_GROUPS.Ingeniero.includes(rol) ? creator.id : "",
      fiscal_id: "",
    };

    db.proyectos.push({
      id,
      nombre,
      slug: `${slugify(nombre)}-${id}`,
      activo: 1,
      created_at: new Date().toISOString(),
      etapa_id: 1,
      basics: { bono_id: "", variante_bono_id: "", grupo_id: "", descripcion: "", fis: false },
      location: { provincia: "", canton: "", distrito: "", otro: "", tipo_propietario: "", propietario: "", plano_catastro: "", finca: "", google_url: "" },
      admin: { entidad_id: "", centro_negocio_id: "", analista_entidad_id: "", presupuesto: "", avaluo: "", apc: "", cfia: "" },
      people,
    });

    db.usuarios
      .filter((u) => ADMIN_ROLES.includes(Number(u.rol_id)) && u.activated != 0 && !eq(u.id, creator?.id))
      .forEach((admin) =>
        createNotification({
          tipo: "proyecto_creado",
          proyecto_id: id,
          remitente_usuario_id: creator?.id ?? null,
          usuario_id: admin.id,
          titulo: "Nuevo proyecto creado",
          mensaje: `Se creó el proyecto "${nombre}".`,
        }),
      );

    return ok({ projectId: id });
  }],

  ["GET", "/projectData/:id", ({ params }) => projectData(params.id)],

  ["POST", "/updateProjectStatus", ({ body }) => {
    const project = getProject(body.proyecto_id);
    if (!project) return fail(404, "Proyecto no encontrado");
    project.activo = body.activo ? 1 : 0;
    return ok();
  }],

  ["POST", "/insertBasics", ({ body }) => saveSection(body, "basics", body.basicsForm)],
  ["POST", "/insertLocations", ({ body }) => saveSection(body, "location", body.locationForm)],
  ["POST", "/insertAdmins", ({ body }) => saveSection(body, "admin", body.adminForm)],
  ["POST", "/insertPeople", ({ body }) => saveSection(body, "people", body.peopleForm)],

  ["POST", "/changeStage", ({ body }) => {
    const db = getDb();
    const project = getProject(body.projectID);
    const etapa = findById(db.etapas, body.etapa_id);
    if (!project || !etapa) return fail(404, "Proyecto o etapa no encontrados");
    project.etapa_id = etapa.id;

    const roles = db.stageNotificationRoles[etapa.id] || [];
    const recipients = new Set();
    roles.forEach((role) => {
      const userId = project.people[`${role.toLowerCase()}_id`];
      if (userId) recipients.add(String(userId));
    });
    recipients.forEach((userId) =>
      createNotification({
        tipo: "cambio_etapa",
        proyecto_id: project.id,
        remitente_usuario_id: body.remitente_usuario_id,
        usuario_id: Number(userId),
        titulo: `Cambio de etapa: ${etapa.nombre}`,
        mensaje: `El proyecto "${project.nombre}" pasó a la etapa "${etapa.nombre}".`,
      }),
    );
    return ok();
  }],

  // Familia
  ["GET", "/projectFamilies/:id", ({ params }) => ok(projectMembers(params.id))],

  ["POST", "/insertMember", ({ body }) => {
    const { img_file: _file, ...member } = body;
    getDb().miembros.push({
      ...member,
      db_id: nextId("miembro"),
      proyecto_id: Number(member.proyecto_id),
      id_link: "",
      id_route: "",
    });
    return ok();
  }],

  ["POST", "/updateMember", ({ body }) => {
    const { img_file: _file, ...member } = body;
    const existing = getDb().miembros.find((m) => eq(m.db_id, member.db_id));
    if (!existing) return fail(404, "Familiar no encontrado");
    Object.assign(existing, member, { id_link: existing.id_link, id_route: existing.id_route });
    return ok();
  }],

  ["POST", "/insertMemberFile", async ({ form }) => {
    const member = getDb().miembros.find(
      (m) => eq(m.proyecto_id, form.get("proyecto_id")) && eq(m.id, form.get("id")),
    );
    if (!member) return fail(404, "Familiar no encontrado");
    const file = form.get("file");
    if (!file || typeof file === "string") return fail(400, "Falta el archivo");
    removeFileByLink(member.id_link);
    const stored = await storeFile(file, `${form.get("path")}/cedulas`);
    member.id_link = stored.img_link;
    member.id_route = stored.img_route;
    return ok();
  }],

  ["POST", "/deleteMemberPhoto", ({ body }) => {
    const member = getDb().miembros.find((m) => eq(m.db_id, body.db_id));
    if (!member) return fail(404, "Familiar no encontrado");
    removeFileByLink(member.id_link);
    member.id_link = "";
    member.id_route = "";
    return ok();
  }],

  // Fotos del proyecto
  ["GET", "/projectImages/:id", ({ params }) =>
    ok(getDb().projectImages.filter((img) => eq(img.proyecto_id, params.id)))],

  ["POST", "/addProjectPhoto", async ({ form }) => {
    const files = form.getAll("files").filter((f) => typeof f !== "string");
    const proyectoId = Number(form.get("proyecto_id"));
    for (const file of files) {
      const stored = await storeFile(file, `${form.get("path")}/fotos`);
      getDb().projectImages.push({ id: nextId("imagen"), proyecto_id: proyectoId, img_link: stored.img_link, img_route: stored.img_route });
    }
    return ok({ message: `${files.length} foto(s) subida(s) correctamente` });
  }],

  ["POST", "/deleteProjectPhoto", ({ body }) => {
    const db = getDb();
    const image = db.projectImages.find((img) => img.img_route === body.img_route);
    if (!image) return fail(404, "Imagen no encontrada");
    removeFileByLink(image.img_link);
    db.projectImages = db.projectImages.filter((img) => img !== image);
    return ok();
  }],

  // Fotos de ubicación
  ["GET", "/locationImages/:id", ({ params }) =>
    ok(getDb().locationImages.filter((img) => eq(img.proyecto_id, params.id)))],

  ["POST", "/addLocationImage", async ({ form }) => {
    const files = form.getAll("files").filter((f) => typeof f !== "string");
    const proyectoId = Number(form.get("proyecto_id"));
    for (const file of files) {
      const stored = await storeFile(file, `${form.get("path")}/ubicacion`);
      getDb().locationImages.push({ id: nextId("imagen"), proyecto_id: proyectoId, img_link: stored.img_link, img_route: stored.img_route });
    }
    return ok();
  }],

  ["POST", "/deleteLocationImage", ({ body }) => {
    const db = getDb();
    const image = db.locationImages.find(
      (img) => img.img_route === body.img_route && eq(img.proyecto_id, body.proyecto_id),
    );
    if (!image) return fail(404, "Imagen no encontrada");
    removeFileByLink(image.img_link);
    db.locationImages = db.locationImages.filter((img) => img !== image);
    return ok();
  }],

  // Bitácora del proyecto (notas)
  ["GET", "/getBitacora/:id", ({ params }) => {
    const { notas, usuarios } = getDb();
    const rows = notas
      .filter((n) => eq(n.proyecto_id, params.id))
      .sort((a, b) => a.fecha_ingreso.localeCompare(b.fecha_ingreso) || a.id - b.id)
      .map((n) => ({ ...n, usuario: fullName(findById(usuarios, n.usuario_id)) }));
    // El stored procedure original devuelve [filas, metadatos].
    return ok([rows, {}]);
  }],

  ["POST", "/addBitacora", ({ body }) => {
    if (!String(body.descripcion || "").trim()) return fail(400, "La descripción es obligatoria");
    getDb().notas.push({
      id: nextId("nota"),
      proyecto_id: Number(body.proyecto_id),
      usuario_id: Number(body.usuario_id),
      tipo: body.tipo || "Análisis",
      descripcion: body.descripcion,
      fecha_ingreso: body.fecha_ingreso || new Date().toISOString().slice(0, 10),
    });
    return ok();
  }],

  // Notificaciones
  ["GET", "/notifications/:userId", ({ params }) => {
    const mine = getDb().notificaciones.filter((n) => eq(n.usuario_id, params.userId) && !n.oculto);
    return ok({
      notifications: sortByDateDesc(mine).map(notificationRow),
      unreadCount: mine.filter((n) => !n.leido).length,
    });
  }],

  ["GET", "/allNotifications", () => ok(sortByDateDesc(getDb().notificaciones).map(notificationRow))],

  ["POST", "/insertNotification", ({ body }) => {
    if (!body.destinatario_usuario_id) return fail(400, "Falta el destinatario");
    createNotification({
      tipo: "manual",
      proyecto_id: Number(body.proyecto_id),
      remitente_usuario_id: body.remitente_usuario_id,
      usuario_id: Number(body.destinatario_usuario_id),
      titulo: body.asunto,
      mensaje: body.mensaje,
    });
    return ok();
  }],

  ["POST", "/markNotificationRead", ({ body }) => {
    const n = getDb().notificaciones.find((x) => eq(x.id, body.id) && eq(x.usuario_id, body.usuario_id));
    if (n) n.leido = 1;
    return ok();
  }],

  ["POST", "/markAllNotificationsRead", ({ body }) => {
    getDb().notificaciones.filter((n) => eq(n.usuario_id, body.usuario_id)).forEach((n) => (n.leido = 1));
    return ok();
  }],

  // Borrar desde la campanita solo la oculta para ese usuario; la bitácora
  // general (admins) sigue mostrándola.
  ["POST", "/deleteNotification", ({ body }) => {
    const n = getDb().notificaciones.find((x) => eq(x.id, body.id) && eq(x.usuario_id, body.usuario_id));
    if (n) n.oculto = 1;
    return ok();
  }],

  ["POST", "/deleteAllNotifications", ({ body }) => {
    getDb().notificaciones.filter((n) => eq(n.usuario_id, body.usuario_id)).forEach((n) => (n.oculto = 1));
    return ok();
  }],

  // Usuarios
  ["GET", "/selectUsers", () => {
    const db = getDb();
    return ok({ usuarios: db.usuarios.map(publicUser), roles: db.roles });
  }],

  ["POST", "/insertUser", ({ body }) => {
    const db = getDb();
    const email = String(body.correo_electronico || "").trim().toLowerCase();
    if (db.usuarios.some((u) => u.correo_electronico.toLowerCase() === email)) {
      return fail(400, "Ya existe un usuario con ese correo");
    }
    if (!body.rol_id) return fail(400, "Debe seleccionar un rol");
    db.usuarios.push({
      id: nextId("usuario"),
      nombre: body.nombre,
      apellido1: body.apellido1,
      apellido2: body.apellido2 || "",
      correo_electronico: email,
      rol_id: Number(body.rol_id),
      activated: 1,
      estado: 0,
      password: "demo1234",
    });
    return ok();
  }],

  ["POST", "/updateUsers", ({ body }) => {
    const user = findById(getDb().usuarios, body.id);
    if (!user) return fail(404, "Usuario no encontrado");
    const { id: _id, ...fields } = body;
    Object.assign(user, fields, { rol_id: Number(fields.rol_id ?? user.rol_id) });
    return ok();
  }],

  ["POST", "/deleteUser", ({ body }) => {
    const user = findById(getDb().usuarios, body.id);
    if (!user) return fail(404, "Usuario no encontrado");
    user.activated = 0;
    return ok();
  }],
];

function saveSection(body, key, form) {
  const project = getProject(body.proyecto_id);
  if (!project) return fail(404, "Proyecto no encontrado");
  if (!form || typeof form !== "object") return fail(400, "Formulario vacío");
  project[key] = { ...project[key], ...form };
  return ok();
}

function matchRoute(method, pathname) {
  const parts = pathname.split("/").filter(Boolean);
  for (const [routeMethod, pattern, handler] of routes) {
    if (routeMethod !== method) continue;
    const patternParts = pattern.split("/").filter(Boolean);
    if (patternParts.length !== parts.length) continue;

    const params = {};
    const matches = patternParts.every((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = decodeURIComponent(parts[i]);
        return true;
      }
      return part === parts[i];
    });
    if (matches) return { handler, params };
  }
  return null;
}

// Recibe un Request ya armado y devuelve un Response, igual que lo haría el
// backend real.
export async function handleMockRequest(request, basePath) {
  const url = new URL(request.url);
  const pathname = url.pathname.slice(basePath.length) || "/";
  const method = request.method.toUpperCase();
  const route = matchRoute(method, pathname);

  if (!route) {
    console.warn(`[mock-backend] ruta sin simular: ${method} ${pathname}`);
    return Response.json({ msg: `Ruta no simulada: ${method} ${pathname}` }, { status: 404 });
  }

  const contentType = request.headers.get("content-type") || "";
  let body = {};
  let form = null;
  if (method !== "GET") {
    if (contentType.includes("multipart/form-data")) {
      form = await request.formData();
    } else if (contentType.includes("application/json")) {
      body = await request.json().catch(() => ({}));
    }
  }

  // Pequeña latencia para que los indicadores de carga se vean como con un
  // backend real.
  await new Promise((resolve) => setTimeout(resolve, 120 + Math.random() * 180));

  try {
    const result = await route.handler({ params: route.params, body, form });
    return Response.json(result.body, { status: result.status });
  } catch (error) {
    console.error(`[mock-backend] error en ${method} ${pathname}`, error);
    return Response.json({ msg: "Error interno del backend simulado" }, { status: 500 });
  }
}
