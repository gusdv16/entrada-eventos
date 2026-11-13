// Persistencia en localStorage para la demo.
// Claves: 'ee_eventos' y 'ee_tickets'. Todo corre en el navegador, sin servidor.

const K_EVENTOS = 'ee_eventos';
const K_TICKETS = 'ee_tickets';

function leer(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch (e) { return []; }
}
function guardar(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export const Store = {
  // --- Eventos ---
  eventos() { return leer(K_EVENTOS); },
  evento(id) { return leer(K_EVENTOS).find((e) => e.id === id) || null; },
  guardarEvento(ev) {
    const list = leer(K_EVENTOS);
    const idx = list.findIndex((e) => e.id === ev.id);
    if (idx >= 0) list[idx] = ev; else list.push(ev);
    guardar(K_EVENTOS, list);
    return ev;
  },
  eliminarEvento(id) {
    guardar(K_EVENTOS, leer(K_EVENTOS).filter((e) => e.id !== id));
    // Elimina también los tickets del evento
    guardar(K_TICKETS, leer(K_TICKETS).filter((t) => t.eventoId !== id));
  },

  // --- Tickets ---
  tickets() { return leer(K_TICKETS); },
  ticket(id) { return leer(K_TICKETS).find((t) => t.id === id) || null; },
  ticketPorCodigo(codigo) { return leer(K_TICKETS).find((t) => t.codigo === codigo) || null; },
  guardarTicket(t) {
    const list = leer(K_TICKETS);
    const idx = list.findIndex((x) => x.id === t.id);
    if (idx >= 0) list[idx] = t; else list.push(t);
    guardar(K_TICKETS, list);
    return t;
  },
  guardarTickets(arr) {
    const list = leer(K_TICKETS);
    for (const t of arr) {
      const idx = list.findIndex((x) => x.id === t.id);
      if (idx >= 0) list[idx] = t; else list.push(t);
    }
    guardar(K_TICKETS, list);
  },
  marcarUsado(id, cuando = new Date().toISOString()) {
    const list = leer(K_TICKETS);
    const idx = list.findIndex((t) => t.id === id);
    if (idx < 0) return null;
    if (list[idx].usado) return list[idx]; // ya usado, no sobrescribir
    list[idx].usado = true;
    list[idx].usadoEn = cuando;
    guardar(K_TICKETS, list);
    return list[idx];
  },
  ticketsDeEvento(eventoId) { return leer(K_TICKETS).filter((t) => t.eventoId === eventoId); },

  // --- Export / Import ---
  exportar() {
    return JSON.stringify({ eventos: leer(K_EVENTOS), tickets: leer(K_TICKETS), exportadoEn: new Date().toISOString() }, null, 2);
  },
  importar(json) {
    const data = JSON.parse(json);
    if (Array.isArray(data.eventos)) guardar(K_EVENTOS, data.eventos);
    if (Array.isArray(data.tickets)) guardar(K_TICKETS, data.tickets);
  },
  reset() {
    localStorage.removeItem(K_EVENTOS);
    localStorage.removeItem(K_TICKETS);
  },
  stats() {
    const eventos = leer(K_EVENTOS);
    const tickets = leer(K_TICKETS);
    const vendidos = tickets.filter((t) => t.estado !== 'cancelado');
    return {
      eventos: eventos.length,
      ticketsVendidos: vendidos.length,
      ingresos: +vendidos.reduce((s, t) => s + (t.precio || 0), 0).toFixed(2),
      usados: tickets.filter((t) => t.usado).length,
      disponibles: tickets.filter((t) => !t.usado && t.estado !== 'cancelado').length,
    };
  },
};
