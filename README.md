# Entradas para eventos

Sistema de **venta y validación de entradas para eventos** que corre 100% en el navegador. Creá eventos,
vendé tickets con código QR, imprimilos y validalos en la puerta con el celular. Sin servidor, sin base de
datos: los datos se guardan en el dispositivo y se pueden exportar/importar como JSON.

> **Demo online:** https://gusdv16.github.io/entrada-eventos/

## Qué hace

- **Eventos:** definís nombre, fecha, lugar, capacidad y tipos de entrada con precio.
- **Venta:** elegís evento y tipo, cargás comprador y cantidad. Se generan tickets con código único y QR.
- **Tickets:** los imprimís (Ctrl+P) y los entregás al comprador.
- **Validación:** en la puerta escaneás el QR con la cámara o ingresás el código a mano. El sistema marca
  el ticket como usado y evita doble ingreso.
- **Reportes:** ventas por evento, por tipo de entrada, ingresos y aforo.

## Cómo usarlo

No requiere instalación: abrís la demo y empezás a usarla. Si querés correrla local:

```bash
npm install
npm run dev      # http://localhost:4321/entrada-eventos/
```

Para compartir datos entre dispositivos: usá **Exportar datos (JSON)** en el inicio y **Importar datos (JSON)**
en el otro dispositivo.

## Detalles técnicos

- **Astro** para el sitio estático, deploy a **GitHub Pages**.
- **qrcode** para la generación de QR en el navegador.
- **BarcodeDetector API** (nativa de Chrome/Edge) para escaneo por cámara, con fallback a ingreso manual.
- **localStorage** para persistencia (demo).
- Todo el procesamiento es local: ningún dato sale del dispositivo.

## Licencia

MIT.
