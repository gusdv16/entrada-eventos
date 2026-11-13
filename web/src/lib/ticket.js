// Render de un ticket con el diseño del pase (main + stub desprendible).
import { fecha, hora, escapar } from './formato.js';
import { qrImg } from './qr.js';

export async function crearTicket(ev, t) {
  const el = document.createElement('article');
  el.className = 'ticket' + (t.usado ? ' usado' : '');

  const qr = await qrImg(t.codigo, 300);
  const f = fecha(ev.fecha);
  const h = hora(ev.fecha);
  const cuando = h ? `${f} · ${h}` : f;
  const bajada = (ev.bajada || '').trim() || 'Entrada personal e intransferible';
  const serial = `EE · ${t.codigo}`;

  el.innerHTML = `
    <section class="ticket-main">
      <div class="ticket-topline">
        <span class="ticket-brand">Entradas Eventos</span>
        <span class="ticket-badge">${escapar(t.tipoNombre)}</span>
      </div>
      <div class="ticket-evento">
        <h3>${escapar(ev.nombre)}</h3>
        <p>${escapar(bajada)}</p>
      </div>
      <div class="ticket-datos">
        <div><p class="label">Fecha y hora</p><p class="value">${escapar(cuando)}</p></div>
        <div><p class="label">Lugar</p><p class="value">${escapar(ev.lugar || 'A confirmar')}</p></div>
        <div><p class="label">Comprador</p><p class="value">${escapar(t.comprador?.nombre || '—')}</p></div>
        <div><p class="label">Tipo de entrada</p><p class="value type">${escapar(t.tipoNombre)}</p></div>
      </div>
      <div class="ticket-foot">
        <span>Válido para un ingreso</span>
        <span>No se permite reingreso</span>
      </div>
    </section>
    <aside class="ticket-stub">
      <span class="ticket-serial">${escapar(serial)}</span>
      <div class="ticket-qr"><img src="${qr.src}" alt="Código QR ${escapar(t.codigo)}"></div>
      <div class="ticket-scan">
        <strong>Escaneá al entrar</strong>
        <span>Sin reingreso</span>
        <div class="ticket-code">${escapar(t.codigo)}</div>
      </div>
      <div class="ticket-status"><i></i>${t.usado ? 'Usada' : 'Válida'}</div>
    </aside>`;

  return el;
}