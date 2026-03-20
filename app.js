'use strict';

// ── Constants ────────────────────────────────────────────────
const STAGES = ['Demo','Negociación','Instalación','Soporte','Consolidado'];
const STAGE_KEYS = ['demo','nego','install','support','consol'];
const STAGE_ICONS = ['🎯','💼','🔧','🎓','✅'];
const STAGE_COLORS = ['#8B5CF6','#F59E0B','#00A3E0','#EC4899','#00C389'];

const RESPONSIBLE = ['Ana García','Carlos López','Martina Torres','Diego Ruiz','Sofía Mendez'];

const CHECKLIST_ITEMS = [
  'Relevamiento de flota',
  'Firma de contrato',
  'Dispositivos recibidos',
  'Instalación completa',
  'Configuración plataforma',
  'Capacitación inicial',
  'Go-live confirmado',
];

// ── Initial dataset ──────────────────────────────────────────
const INITIAL_CLIENTS = [
  {
    id: 1, company: 'Logística Del Sur S.A.', contact: 'Roberto Fernández',
    email: 'roberto@logisur.com', phone: '+54 299 412-8800',
    stage: 'Instalación', responsible: 'Carlos López',
    startDate: '2025-01-10', closeDate: '2025-04-15',
    vehicles: 24, vehiclesInstalled: 18,
    value: 420000, notes: 'Cliente con alta urgencia. Flota mixta pesados y livianos.',
    checklist: [true,true,true,false,false,false,false],
    interactions: [
      { date: '2025-01-10', type: 'Demo', note: 'Demo realizada. Muy interesados.' },
      { date: '2025-02-01', type: 'Reunión', note: 'Revisión de cotización. Negocian precio.' },
      { date: '2025-03-05', type: 'Cierre', note: 'Contrato firmado. Inicio instalación.' },
    ],
    tickets: 2, capacitaciones: 0,
  },
  {
    id: 2, company: 'Transportes Patagonia', contact: 'Valeria Soto',
    email: 'vsoto@transpatagonia.com', phone: '+54 299 467-2210',
    stage: 'Demo', responsible: 'Ana García',
    startDate: '2025-03-01', closeDate: '2025-05-30',
    vehicles: 8, vehiclesInstalled: 0,
    value: 160000, notes: 'Empresa familiar. Primer contacto via LinkedIn.',
    checklist: [false,false,false,false,false,false,false],
    interactions: [
      { date: '2025-03-01', type: 'Demo', note: 'Demo agendada para la semana próxima.' },
    ],
    tickets: 0, capacitaciones: 0,
  },
  {
    id: 3, company: 'Minera Andina Corp.', contact: 'Hernán Castillo',
    email: 'hcastillo@minandina.com', phone: '+54 261 588-7700',
    stage: 'Consolidado', responsible: 'Martina Torres',
    startDate: '2024-08-15', closeDate: '2024-12-20',
    vehicles: 55, vehiclesInstalled: 55,
    value: 980000, notes: 'Cliente de alto valor. Muy satisfechos. Evalúan módulo extra.',
    checklist: [true,true,true,true,true,true,true],
    interactions: [
      { date: '2024-08-15', type: 'Demo', note: 'Demo ejecutiva con gerencia.' },
      { date: '2024-09-10', type: 'Cierre', note: 'Contrato marco firmado.' },
      { date: '2024-12-20', type: 'Go-live', note: 'Plataforma activa. Cliente operativo.' },
    ],
    tickets: 0, capacitaciones: 3,
  },
  {
    id: 4, company: 'Grupo Alimentos Norte', contact: 'Claudia Ríos',
    email: 'crios@galimentos.com', phone: '+54 381 422-9900',
    stage: 'Negociación', responsible: 'Diego Ruiz',
    startDate: '2025-02-14', closeDate: '2025-04-30',
    vehicles: 15, vehiclesInstalled: 0,
    value: 275000, notes: 'Comparan con competencia. Decisión final en 2 semanas.',
    checklist: [true,false,false,false,false,false,false],
    interactions: [
      { date: '2025-02-14', type: 'Demo', note: 'Demo exitosa. Solicitaron propuesta.' },
      { date: '2025-03-01', type: 'Propuesta', note: 'Cotización enviada por email.' },
    ],
    tickets: 0, capacitaciones: 0,
  },
  {
    id: 5, company: 'Servicios Urbanos S.R.L.', contact: 'Pablo Morales',
    email: 'pmorales@surb.com.ar', phone: '+54 351 311-4455',
    stage: 'Soporte', responsible: 'Sofía Mendez',
    startDate: '2024-11-01', closeDate: '2025-02-15',
    vehicles: 32, vehiclesInstalled: 32,
    value: 576000, notes: 'Algunos problemas de adopción. Requiere capacitaciones adicionales.',
    checklist: [true,true,true,true,true,true,false],
    interactions: [
      { date: '2024-11-01', type: 'Demo', note: 'Demo y cierre en misma reunión.' },
      { date: '2025-01-10', type: 'Instalación', note: 'Instalación completada.' },
      { date: '2025-02-15', type: 'Soporte', note: 'Ticket de adopción. Usuarios no usan la app.' },
    ],
    tickets: 3, capacitaciones: 1,
  },
  {
    id: 6, company: 'Constructora Del Valle', contact: 'Mariana Blanco',
    email: 'mblanco@convalle.com', phone: '+54 299 533-1122',
    stage: 'Instalación', responsible: 'Carlos López',
    startDate: '2025-01-20', closeDate: '2025-03-28',
    vehicles: 12, vehiclesInstalled: 5,
    value: 220000, notes: 'Instalación retrasada por inaccesibilidad de vehículos en obra.',
    checklist: [true,true,true,false,false,false,false],
    interactions: [
      { date: '2025-01-20', type: 'Cierre', note: 'Contrato firmado.' },
      { date: '2025-02-10', type: 'Instalación', note: 'Inicio instalación. Parcial.' },
    ],
    tickets: 1, capacitaciones: 0,
  },
  {
    id: 7, company: 'Emprendimientos Río Negro', contact: 'Lucas Pereyra',
    email: 'lpereyra@ern.com', phone: '+54 299 488-3300',
    stage: 'Demo', responsible: 'Ana García',
    startDate: '2025-03-10', closeDate: '2025-06-01',
    vehicles: 6, vehiclesInstalled: 0,
    value: 108000, notes: 'PyME. Primer producto de telemetría. Muy receptivos.',
    checklist: [false,false,false,false,false,false,false],
    interactions: [
      { date: '2025-03-10', type: 'Contacto', note: 'Llamada inicial. Se agenda demo.' },
    ],
    tickets: 0, capacitaciones: 0,
  },
  {
    id: 8, company: 'Frío Express S.A.', contact: 'Natalia Suárez',
    email: 'nsuarez@frioexpress.com', phone: '+54 11 4823-0077',
    stage: 'Negociación', responsible: 'Martina Torres',
    startDate: '2025-02-20', closeDate: '2025-05-10',
    vehicles: 20, vehiclesInstalled: 0,
    value: 360000, notes: 'Requieren integración con ERP propio. Punto crítico a resolver.',
    checklist: [true,false,false,false,false,false,false],
    interactions: [
      { date: '2025-02-20', type: 'Demo', note: 'Demo técnica con IT del cliente.' },
      { date: '2025-03-05', type: 'Reunión', note: 'Discusión de integración API.' },
    ],
    tickets: 0, capacitaciones: 0,
  },
  {
    id: 9, company: 'Agro Neuquén Ltda.', contact: 'Facundo Gómez',
    email: 'fgomez@agronq.com', phone: '+54 299 421-6688',
    stage: 'Consolidado', responsible: 'Diego Ruiz',
    startDate: '2024-06-01', closeDate: '2024-10-30',
    vehicles: 18, vehiclesInstalled: 18,
    value: 320000, notes: 'Excelente adopción. NPS 9/10.',
    checklist: [true,true,true,true,true,true,true],
    interactions: [
      { date: '2024-06-01', type: 'Demo', note: 'Primer contacto.' },
      { date: '2024-10-30', type: 'Go-live', note: 'Consolidado sin incidentes.' },
    ],
    tickets: 0, capacitaciones: 4,
  },
  {
    id: 10, company: 'Transporte Cordillerano', contact: 'Esteban Vidal',
    email: 'evidal@transcord.com', phone: '+54 261 399-5544',
    stage: 'Soporte', responsible: 'Sofía Mendez',
    startDate: '2024-12-01', closeDate: '2025-03-01',
    vehicles: 40, vehiclesInstalled: 40,
    value: 720000, notes: 'Flota completamente instalada. En proceso de capacitación masiva.',
    checklist: [true,true,true,true,true,false,false],
    interactions: [
      { date: '2024-12-01', type: 'Cierre', note: 'Contrato firmado.' },
      { date: '2025-02-01', type: 'Instalación', note: 'Instalación finalizada.' },
      { date: '2025-03-01', type: 'Capacitación', note: 'Sesión 1 de 3 completada.' },
    ],
    tickets: 1, capacitaciones: 1,
  },
];

// ── State ────────────────────────────────────────────────────
let state = {
  clients: [],
  currentView: 'dashboard',
  selectedClientId: null,
  activeTab: 'comercial',
  filters: { stage: '', responsible: '', search: '' },
  calendarMonth: new Date().getMonth(),
  calendarYear: new Date().getFullYear(),
  draggedId: null,
};

// ── Persistence ──────────────────────────────────────────────
function saveState() {
  try { localStorage.setItem('geo_onb_clients', JSON.stringify(state.clients)); } catch(e) {}
}
function loadState() {
  try {
    const saved = localStorage.getItem('geo_onb_clients');
    state.clients = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_CLIENTS));
  } catch(e) {
    state.clients = JSON.parse(JSON.stringify(INITIAL_CLIENTS));
  }
}

// ── Helpers ──────────────────────────────────────────────────
function daysInStage(client) {
  const d = new Date() - new Date(client.startDate);
  return Math.floor(d / 86400000);
}
function isLate(client) {
  return new Date(client.closeDate) < new Date() && client.stage !== 'Consolidado';
}
function progress(client) {
  const done = client.checklist.filter(Boolean).length;
  return Math.round((done / CHECKLIST_ITEMS.length) * 100);
}
function stageKey(stage) {
  return STAGE_KEYS[STAGES.indexOf(stage)] || 'demo';
}
function stageColor(stage) {
  return STAGE_COLORS[STAGES.indexOf(stage)] || '#8B5CF6';
}
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}
function progressClass(pct) {
  if (pct < 25) return 'low';
  if (pct < 60) return 'mid';
  if (pct < 90) return 'high';
  return 'done';
}
function fmtDate(d) {
  if (!d) return '—';
  const [y,m,day] = d.split('-');
  return `${day}/${m}/${y}`;
}
function genId() { return Date.now() + Math.floor(Math.random()*1000); }

// ── Render helpers ───────────────────────────────────────────
function badge(stage) {
  const key = stageKey(stage);
  return `<span class="badge badge-${key}">${stage}</span>`;
}
function badgeRisk() {
  return `<span class="badge badge-risk">⚠ Atrasado</span>`;
}

function progressBar(pct) {
  return `<div class="progress-wrap">
    <div class="progress-bar"><div class="progress-fill ${progressClass(pct)}" style="width:${pct}%"></div></div>
    <span class="progress-pct">${pct}%</span>
  </div>`;
}

// ── Navigation ───────────────────────────────────────────────
function navigate(view, clientId = null) {
  state.currentView = view;
  state.selectedClientId = clientId;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  document.querySelectorAll('.view').forEach(el => {
    el.classList.toggle('active', el.id === `view-${view}`);
  });
  const titles = {
    dashboard: 'Dashboard', clients: 'Gestión de Clientes',
    kanban: 'Pipeline Kanban', calendar: 'Calendario',
    detail: state.selectedClientId ? state.clients.find(c=>c.id===state.selectedClientId)?.company : 'Detalle',
  };
  document.getElementById('page-title').textContent = titles[view] || '';

  if (view === 'dashboard') renderDashboard();
  if (view === 'clients')   renderClients();
  if (view === 'kanban')    renderKanban();
  if (view === 'calendar')  renderCalendar();
  if (view === 'detail' && clientId) renderDetail(clientId);
}

// ── Dashboard ────────────────────────────────────────────────
function renderDashboard() {
  const clients = state.clients;
  const counts = {};
  STAGES.forEach(s => counts[s] = clients.filter(c => c.stage === s).length);

  // KPIs
  const kpiEl = document.getElementById('kpi-grid');
  kpiEl.innerHTML = STAGES.map((s,i) => `
    <div class="kpi-card ${STAGE_KEYS[i]}" onclick="navigate('clients')">
      <div class="kpi-icon">${STAGE_ICONS[i]}</div>
      <div class="kpi-value">${counts[s]}</div>
      <div class="kpi-label">${s}</div>
    </div>
  `).join('');

  // Chart
  const max = Math.max(...Object.values(counts), 1);
  document.getElementById('dash-chart').innerHTML = STAGES.map((s,i) => `
    <div class="bar-wrap">
      <div class="bar ${i===4?'':'navy'}" style="height:${Math.round((counts[s]/max)*68)+4}px"></div>
      <div class="bar-label">${s.slice(0,4)}</div>
    </div>
  `).join('');

  // Recent clients
  const recent = [...clients].sort((a,b) => new Date(b.startDate)-new Date(a.startDate)).slice(0,5);
  document.getElementById('recent-clients').innerHTML = recent.map(c => `
    <div class="client-list-item" onclick="navigate('detail',${c.id})">
      <div class="cli-avatar" style="background:${stageColor(c.stage)}">${initials(c.company)}</div>
      <div class="cli-info">
        <div class="cli-name">${c.company}</div>
        <div class="cli-sub">${c.responsible} · ${badge(c.stage)}</div>
      </div>
      <div class="cli-right">
        <div class="cli-days">${daysInStage(c)}d</div>
        ${isLate(c)?'<div style="color:var(--risk);font-size:11px;font-weight:700">ATRASADO</div>':''}
      </div>
    </div>
  `).join('');

  // Alerts
  const late   = clients.filter(c => isLate(c));
  const noDemo = clients.filter(c => c.stage === 'Demo' && daysInStage(c) > 7);
  const noAct  = clients.filter(c => daysInStage(c) > 14 && !['Consolidado'].includes(c.stage) && c.interactions.length < 2);
  const alertsEl = document.getElementById('alerts-list');
  const alerts = [
    ...late.map(c => `<div class="alert-item"><span class="alert-icon">🔴</span><div class="alert-text"><strong>${c.company}</strong><span>Instalación atrasada · Cierre estimado ${fmtDate(c.closeDate)}</span></div></div>`),
    ...noDemo.map(c => `<div class="alert-item warn"><span class="alert-icon">🟡</span><div class="alert-text"><strong>${c.company}</strong><span>Demo sin seguimiento por más de 7 días</span></div></div>`),
    ...noAct.map(c => `<div class="alert-item info"><span class="alert-icon">🔵</span><div class="alert-text"><strong>${c.company}</strong><span>Sin actividad registrada en ${daysInStage(c)} días</span></div></div>`),
  ];
  alertsEl.innerHTML = alerts.length
    ? alerts.join('')
    : `<div class="empty-state"><div class="empty-icon">✅</div><p>Sin alertas activas</p></div>`;
}

// ── Clients table ────────────────────────────────────────────
function renderClients() {
  const { stage, responsible, search } = state.filters;
  let list = state.clients.filter(c => {
    if (stage       && c.stage       !== stage)       return false;
    if (responsible && c.responsible !== responsible) return false;
    if (search && !c.company.toLowerCase().includes(search.toLowerCase()) &&
        !c.contact.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const tbody = document.getElementById('clients-tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">🔍</div><p>Sin resultados</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(c => {
    const pct   = progress(c);
    const late  = isLate(c);
    return `<tr>
      <td>
        <div class="td-company">${late?'⚠ ':''}${c.company}</div>
        <div class="td-contact">${c.contact}</div>
      </td>
      <td>${badge(c.stage)}${late?' '+badgeRisk():''}</td>
      <td>${c.responsible}</td>
      <td>${fmtDate(c.startDate)}</td>
      <td class="${late?'risk-flag':''}">${fmtDate(c.closeDate)}</td>
      <td class="td-days">${daysInStage(c)}d</td>
      <td style="min-width:140px">${progressBar(pct)}</td>
      <td>
        <div class="actions">
          <button class="btn btn-ghost btn-sm" onclick="navigate('detail',${c.id})">Ver</button>
          <button class="btn btn-ghost btn-sm" onclick="openEditModal(${c.id})">Editar</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function applyFilters() {
  state.filters.stage       = document.getElementById('filter-stage').value;
  state.filters.responsible = document.getElementById('filter-resp').value;
  state.filters.search      = document.getElementById('filter-search').value;
  renderClients();
}

// ── Detail view ──────────────────────────────────────────────
function renderDetail(id) {
  const c = state.clients.find(cl => cl.id === id);
  if (!c) return;
  const pct  = progress(c);
  const late = isLate(c);

  document.getElementById('det-header').innerHTML = `
    <div class="detail-avatar">${initials(c.company)}</div>
    <div class="detail-info">
      <div class="detail-company">${c.company} ${late ? badgeRisk() : ''}</div>
      ${badge(c.stage)}
      <div class="detail-meta">
        <span class="detail-meta-item">👤 ${c.contact}</span>
        <span class="detail-meta-item">📧 ${c.email}</span>
        <span class="detail-meta-item">📞 ${c.phone}</span>
        <span class="detail-meta-item">👨‍💼 ${c.responsible}</span>
      </div>
    </div>
    <div class="detail-actions">
      <button class="btn btn-ghost" onclick="openEditModal(${c.id})">✏ Editar</button>
      <button class="btn btn-primary" onclick="openChangeStageModal(${c.id})">Cambiar Etapa</button>
    </div>
  `;

  // Timeline
  const stageIdx = STAGES.indexOf(c.stage);
  document.getElementById('det-timeline').innerHTML = STAGES.map((s, i) => {
    const isDone    = i < stageIdx;
    const isActive  = i === stageIdx;
    const isPending = i > stageIdx;
    const dotClass  = isDone ? 'done' : isActive ? 'active' : 'pending';
    const lineClass = isDone ? 'done' : '';
    const icon      = isDone ? '✓' : isActive ? STAGE_ICONS[i] : '';
    return `<div class="tl-item">
      <div class="tl-left">
        <div class="tl-dot ${dotClass}">${icon}</div>
        ${i < STAGES.length-1 ? `<div class="tl-line ${lineClass}"></div>` : ''}
      </div>
      <div class="tl-content">
        <div class="tl-title ${isPending?'pending':''}">${s}</div>
        <div class="tl-date">${isDone ? 'Completado' : isActive ? 'En progreso' : 'Pendiente'}</div>
      </div>
    </div>`;
  }).join('');

  // Tab: Comercial
  document.getElementById('tab-comercial').innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><div class="section-title">Información Comercial</div></div>
        <div class="info-grid">
          <div class="info-item"><label>Valor del negocio</label><span>$${c.value.toLocaleString()}</span></div>
          <div class="info-item"><label>Fecha inicio</label><span>${fmtDate(c.startDate)}</span></div>
          <div class="info-item"><label>Cierre estimado</label><span class="${late?'risk-flag':''}">${fmtDate(c.closeDate)}</span></div>
          <div class="info-item"><label>Días en etapa</label><span>${daysInStage(c)} días</span></div>
        </div>
        <div class="info-item" style="margin-top:8px">
          <label>Notas</label>
          <span>${c.notes || '—'}</span>
        </div>
      </div>
      <div class="card">
        <div class="section-header"><div class="section-title">Historial de Interacciones</div></div>
        <div style="display:flex;flex-direction:column;gap:8px;max-height:240px;overflow-y:auto">
          ${c.interactions.length ? c.interactions.map(i => `
            <div style="display:flex;gap:10px;padding:8px;background:var(--bg);border-radius:8px">
              <div style="flex-shrink:0;font-size:11px;color:var(--text-muted);font-family:'DM Mono',monospace;white-space:nowrap">${fmtDate(i.date)}</div>
              <div>
                <div style="font-size:12px;font-weight:700;color:var(--navy);margin-bottom:2px">${i.type}</div>
                <div style="font-size:12px;color:var(--text-muted)">${i.note}</div>
              </div>
            </div>
          `).join('') : '<p style="color:var(--text-muted);font-size:13px">Sin interacciones registradas.</p>'}
        </div>
      </div>
    </div>
  `;

  // Tab: Operaciones
  const circumference = 2 * Math.PI * 34;
  const pctVeh = c.vehicles > 0 ? Math.round((c.vehiclesInstalled / c.vehicles) * 100) : 0;
  const dashOffset = circumference - (pctVeh / 100) * circumference;
  document.getElementById('tab-operaciones').innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><div class="section-title">Estado de Instalación</div></div>
        <div class="vehicle-stat">
          <div class="vehicle-circle">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle class="vc-bg" cx="40" cy="40" r="34"/>
              <circle class="vc-fill" cx="40" cy="40" r="34"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${dashOffset}"/>
            </svg>
            <div class="vc-text">${c.vehiclesInstalled}<small>/ ${c.vehicles}</small></div>
          </div>
          <div>
            <div style="font-size:22px;font-weight:800;color:var(--navy)">${pctVeh}%</div>
            <div style="font-size:12px;color:var(--text-muted)">Vehículos instalados</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${c.vehicles - c.vehiclesInstalled} restantes</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat-box"><div class="val">${c.vehicles}</div><div class="lbl">Total flota</div></div>
          <div class="stat-box"><div class="val">${c.vehiclesInstalled}</div><div class="lbl">Instalados</div></div>
          <div class="stat-box"><div class="val">${c.vehicles - c.vehiclesInstalled}</div><div class="lbl">Pendientes</div></div>
        </div>
      </div>
      <div class="card">
        <div class="section-header"><div class="section-title">Checklist de Instalación</div></div>
        <div class="checklist">
          ${CHECKLIST_ITEMS.map((item, i) => `
            <div class="check-item">
              <div class="check-box ${c.checklist[i]?'checked':'unchecked'}" onclick="toggleCheck(${c.id},${i})" style="cursor:pointer">
                ${c.checklist[i]?'✓':''}
              </div>
              <span style="${c.checklist[i]?'text-decoration:line-through;color:var(--text-muted)':''}">${item}</span>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:12px">${progressBar(pct)}</div>
      </div>
    </div>
  `;

  // Tab: Soporte
  document.getElementById('tab-soporte').innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><div class="section-title">Estado de Soporte</div></div>
        <div class="stat-row">
          <div class="stat-box"><div class="val" style="color:${c.tickets>0?'var(--risk)':'var(--consol)'}">${c.tickets}</div><div class="lbl">Tickets abiertos</div></div>
          <div class="stat-box"><div class="val">${c.capacitaciones}</div><div class="lbl">Capacitaciones</div></div>
          <div class="stat-box"><div class="val">${pct}%</div><div class="lbl">Adopción estimada</div></div>
        </div>
        <div style="margin-top:8px">
          <label style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--text-muted);margin-bottom:6px">Nivel de adopción</label>
          ${progressBar(pct)}
        </div>
      </div>
      <div class="card">
        <div class="section-header"><div class="section-title">Observaciones</div></div>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.6">${c.notes || 'Sin observaciones.'}</p>
      </div>
    </div>
  `;

  activateTab('comercial');
}

function activateTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
}

function toggleCheck(clientId, idx) {
  const c = state.clients.find(cl => cl.id === clientId);
  if (!c) return;
  c.checklist[idx] = !c.checklist[idx];
  saveState();
  renderDetail(clientId);
}

// ── Kanban ───────────────────────────────────────────────────
function renderKanban() {
  const board = document.getElementById('kanban-board');
  board.innerHTML = STAGES.map((stage, si) => {
    const clients = state.clients.filter(c => c.stage === stage);
    return `
      <div class="kanban-col" data-stage="${stage}"
        ondragover="event.preventDefault();event.currentTarget.querySelector('.kanban-cards').classList.add('drag-over')"
        ondragleave="event.currentTarget.querySelector('.kanban-cards').classList.remove('drag-over')"
        ondrop="dropCard(event,'${stage}')">
        <div class="kanban-col-header">
          <div class="kanban-dot" style="background:${STAGE_COLORS[si]}"></div>
          <div class="kanban-col-title">${stage}</div>
          <div class="kanban-count">${clients.length}</div>
        </div>
        <div class="kanban-cards">
          ${clients.length ? clients.map(c => {
            const pct  = progress(c);
            const late = isLate(c);
            return `<div class="kanban-card" draggable="true"
              data-id="${c.id}"
              ondragstart="dragStart(event,${c.id})"
              ondragend="dragEnd(event)"
              onclick="navigate('detail',${c.id})">
              <div class="kc-company">${late?'⚠ ':''}${c.company}</div>
              <div class="kc-contact">${c.contact}</div>
              <div class="kc-progress">${progressBar(pct)}</div>
              <div class="kc-footer">
                <span class="kc-days">${daysInStage(c)}d · ${c.responsible.split(' ')[0]}</span>
                ${late ? '<span class="kc-risk">⚠</span>' : ''}
              </div>
            </div>`;
          }).join('') : `<div class="empty-state" style="padding:24px 12px"><div class="empty-icon" style="font-size:28px">${STAGE_ICONS[si]}</div><p style="font-size:12px">Sin clientes</p></div>`}
        </div>
      </div>
    `;
  }).join('');
}

function dragStart(e, id) {
  state.draggedId = id;
  e.currentTarget.classList.add('dragging');
}
function dragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  document.querySelectorAll('.kanban-cards').forEach(el => el.classList.remove('drag-over'));
}
function dropCard(e, stage) {
  e.preventDefault();
  document.querySelectorAll('.kanban-cards').forEach(el => el.classList.remove('drag-over'));
  if (!state.draggedId) return;
  const c = state.clients.find(cl => cl.id === state.draggedId);
  if (c && c.stage !== stage) {
    c.stage = stage;
    saveState();
    renderKanban();
  }
  state.draggedId = null;
}

// ── Calendar ─────────────────────────────────────────────────
function renderCalendar() {
  const { calendarMonth: month, calendarYear: year } = state;
  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  document.getElementById('cal-month-label').textContent = `${monthNames[month]} ${year}`;

  const firstDay  = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month+1, 0).getDate();
  const today     = new Date();

  // Build events map  key = day number
  const events = {};
  state.clients.forEach(c => {
    const addEv = (dateStr, type, label) => {
      if (!dateStr) return;
      const d = new Date(dateStr);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!events[day]) events[day] = [];
        events[day].push({ type, label });
      }
    };
    if (c.stage === 'Demo')        addEv(c.startDate,  'demo',    c.company);
    if (c.stage === 'Instalación') addEv(c.closeDate,  'install', c.company);
    if (c.stage === 'Soporte')     addEv(c.closeDate,  'support', c.company);
  });

  const cells = [];
  // Empty leading cells
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) cells.push('<div class="cal-cell empty"></div>');

  for (let d = 1; d <= daysCount; d++) {
    const isToday = today.getDate()===d && today.getMonth()===month && today.getFullYear()===year;
    const dayEvs  = events[d] || [];
    cells.push(`
      <div class="cal-cell ${isToday?'today':''}">
        <div class="cal-date">${d}</div>
        ${dayEvs.slice(0,2).map(ev=>`<div class="cal-event ${ev.type}" title="${ev.label}">${ev.label.slice(0,12)}${ev.label.length>12?'…':''}</div>`).join('')}
        ${dayEvs.length > 2 ? `<div style="font-size:10px;color:var(--text-muted)">+${dayEvs.length-2} más</div>` : ''}
      </div>
    `);
  }

  document.getElementById('cal-grid').innerHTML = cells.join('');
}

function calPrev() {
  if (state.calendarMonth === 0) { state.calendarMonth = 11; state.calendarYear--; }
  else state.calendarMonth--;
  renderCalendar();
}
function calNext() {
  if (state.calendarMonth === 11) { state.calendarMonth = 0; state.calendarYear++; }
  else state.calendarMonth++;
  renderCalendar();
}

// ── Modal: new/edit client ───────────────────────────────────
function openNewModal() {
  document.getElementById('modal-title').textContent = 'Nuevo Cliente';
  document.getElementById('modal-client-id').value = '';
  document.getElementById('f-company').value    = '';
  document.getElementById('f-contact').value    = '';
  document.getElementById('f-email').value      = '';
  document.getElementById('f-phone').value      = '';
  document.getElementById('f-stage').value      = 'Demo';
  document.getElementById('f-resp').value       = RESPONSIBLE[0];
  document.getElementById('f-start').value      = new Date().toISOString().slice(0,10);
  document.getElementById('f-close').value      = '';
  document.getElementById('f-vehicles').value   = '';
  document.getElementById('f-value').value      = '';
  document.getElementById('f-notes').value      = '';
  document.getElementById('modal-overlay').classList.add('open');
}

function openEditModal(id) {
  const c = state.clients.find(cl => cl.id === id);
  if (!c) return;
  document.getElementById('modal-title').textContent = 'Editar Cliente';
  document.getElementById('modal-client-id').value   = id;
  document.getElementById('f-company').value    = c.company;
  document.getElementById('f-contact').value    = c.contact;
  document.getElementById('f-email').value      = c.email;
  document.getElementById('f-phone').value      = c.phone;
  document.getElementById('f-stage').value      = c.stage;
  document.getElementById('f-resp').value       = c.responsible;
  document.getElementById('f-start').value      = c.startDate;
  document.getElementById('f-close').value      = c.closeDate;
  document.getElementById('f-vehicles').value   = c.vehicles;
  document.getElementById('f-value').value      = c.value;
  document.getElementById('f-notes').value      = c.notes;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function saveClient() {
  const id = document.getElementById('modal-client-id').value;
  const data = {
    company:     document.getElementById('f-company').value.trim(),
    contact:     document.getElementById('f-contact').value.trim(),
    email:       document.getElementById('f-email').value.trim(),
    phone:       document.getElementById('f-phone').value.trim(),
    stage:       document.getElementById('f-stage').value,
    responsible: document.getElementById('f-resp').value,
    startDate:   document.getElementById('f-start').value,
    closeDate:   document.getElementById('f-close').value,
    vehicles:    parseInt(document.getElementById('f-vehicles').value) || 0,
    value:       parseInt(document.getElementById('f-value').value)    || 0,
    notes:       document.getElementById('f-notes').value.trim(),
  };
  if (!data.company || !data.contact) { alert('Empresa y contacto son requeridos.'); return; }

  if (id) {
    const c = state.clients.find(cl => cl.id === parseInt(id));
    if (c) Object.assign(c, data);
  } else {
    state.clients.push({
      id: genId(), ...data,
      vehiclesInstalled: 0,
      checklist: Array(CHECKLIST_ITEMS.length).fill(false),
      interactions: [],
      tickets: 0, capacitaciones: 0,
    });
  }

  saveState();
  closeModal();
  if (state.currentView === 'dashboard') renderDashboard();
  if (state.currentView === 'clients')   renderClients();
  if (state.currentView === 'kanban')    renderKanban();
  if (state.currentView === 'detail' && parseInt(id)) renderDetail(parseInt(id));
}

// ── Modal: change stage ──────────────────────────────────────
function openChangeStageModal(id) {
  const c = state.clients.find(cl => cl.id === id);
  if (!c) return;
  document.getElementById('cs-client-id').value = id;
  document.getElementById('cs-stage').value = c.stage;
  document.getElementById('cs-overlay').classList.add('open');
}
function closeStageModal() {
  document.getElementById('cs-overlay').classList.remove('open');
}
function saveStage() {
  const id    = parseInt(document.getElementById('cs-client-id').value);
  const stage = document.getElementById('cs-stage').value;
  const c     = state.clients.find(cl => cl.id === id);
  if (c) { c.stage = stage; saveState(); }
  closeStageModal();
  renderDetail(id);
}

// ── Global search ────────────────────────────────────────────
function globalSearch(val) {
  if (!val.trim()) return;
  state.filters.search = val;
  navigate('clients');
  document.getElementById('filter-search').value = val;
  applyFilters();
}

// ── Responsible filter options ───────────────────────────────
function populateFilters() {
  const respSel = document.getElementById('filter-resp');
  RESPONSIBLE.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r; opt.textContent = r;
    respSel.appendChild(opt);
  });

  const csSel = document.getElementById('cs-stage');
  STAGES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    csSel.appendChild(opt);
  });

  const fStageSel = document.getElementById('f-stage');
  STAGES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    fStageSel.appendChild(opt);
  });

  const fRespSel = document.getElementById('f-resp');
  RESPONSIBLE.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r; opt.textContent = r;
    fRespSel.appendChild(opt);
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  populateFilters();

  // Sidebar nav
  document.querySelectorAll('.nav-item[data-view]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.view));
  });

  // Global search
  document.getElementById('global-search').addEventListener('input', e => {
    if (e.target.value.length > 1) globalSearch(e.target.value);
  });

  // Filters
  document.getElementById('filter-stage').addEventListener('change', applyFilters);
  document.getElementById('filter-resp').addEventListener('change', applyFilters);
  document.getElementById('filter-search').addEventListener('input', applyFilters);

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.addEventListener('click', () => activateTab(b.dataset.tab));
  });

  // Modal close on backdrop
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.getElementById('cs-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('cs-overlay')) closeStageModal();
  });

  navigate('dashboard');
});
