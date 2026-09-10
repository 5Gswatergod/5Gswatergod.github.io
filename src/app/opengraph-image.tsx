import { ImageResponse } from 'next/og';

export const alt = 'HungYuan Lo — Creative Developer, AI Engineer, Full-Stack Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 68, background: '#06080a', color: '#f2f7f8', fontFamily: 'sans-serif', border: '1px solid #1f343b' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, letterSpacing: 4, color: '#7ce7d7' }}><span>HL / 026</span><span>PUBLIC SYSTEMS INDEX</span></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>HUNGYUAN LO</div><div style={{ marginTop: 32, fontSize: 28, color: '#9aa8ad' }}>Creative Developer · AI Engineer · Full-Stack Builder</div></div>
      <div style={{ display: 'flex', fontSize: 18, color: '#7d8b90' }}>AI TOOLS / REAL-TIME SYSTEMS / INTERACTIVE SOFTWARE</div>
    </div>, size,
  );
}
