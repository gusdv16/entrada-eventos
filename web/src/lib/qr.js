// Generación de códigos QR en el navegador usando la librería `qrcode`.
import QRCode from 'qrcode';

// Devuelve un data URL (PNG) del QR para el texto dado.
export async function generarQRDataUrl(texto, { size = 200, margin = 1 } = {}) {
  return QRCode.toDataURL(String(texto), {
    width: size,
    margin,
    errorCorrectionLevel: 'M',
    color: { dark: '#000000', light: '#FFFFFF' },
  });
}

// Devuelve un elemento <img> listo para insertar.
export async function qrImg(texto, size = 200) {
  const url = await generarQRDataUrl(texto, { size });
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'QR ' + texto;
  img.width = size;
  img.height = size;
  img.className = 'qr';
  return img;
}
