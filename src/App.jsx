// src/App.jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [begeniSayisi, setBegeniSayisi] = useState(0);
  const [karanlikMod, setKaranlikMod] = useState(false);
  const [isim, setIsim] = useState("");
  const [kediResmi, setKediResmi] = useState("https://cataas.com/cat");

  // --- YENİ EKLENENLER (LİSTE İÇİN) ---
  const [gorevler, setGorevler] = useState([]); // Boş bir liste
  const [yeniGorev, setYeniGorev] = useState(""); // Yazılan görev metni

  // Görev Ekleme Fonksiyonu
  const gorevEkle = () => {
    if (yeniGorev === "") return; // Boşsa ekleme yapma
    
    // Eski görevlerin hepsini al (...gorevler), yanına yenisini ekle
    setGorevler([...gorevler, yeniGorev]); 
    setYeniGorev(""); // Kutuyu temizle
  }

  // Görev Silme Fonksiyonu (İsteğe bağlı, tıklananı siler)
  const gorevSil = (silinecekIndex) => {
    // Listeyi filtrele: Sırası (indexi) silinecek olanla eşleşmeyenleri tut
    const guncelListe = gorevler.filter((_, index) => index !== silinecekIndex);
    setGorevler(guncelListe);
  }
  // -------------------------------------

  const begeniArttir = () => setBegeniSayisi(begeniSayisi + 1);
  const begeniSifirla = () => setBegeniSayisi(0);
  const yeniKediGetir = () => {
    const rastgeleSayi = Date.now(); 
    setKediResmi(`https://cataas.com/cat?t=${rastgeleSayi}`);
  }

  return (
    <div className={`sayfa-duzeni ${karanlikMod ? 'karanlik' : ''}`}>
      
      <header className="baslik">
        <h2>{isim ? `Merhaba, ${isim}!` : "Benim Sitem"}</h2>
        <button className="mod-butonu" onClick={() => setKaranlikMod(!karanlikMod)}>
          {karanlikMod ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="icerik">
        
        {/* ... İsim ve Kedi kartları burada duruyor (dokunmadık) ... */}
        
        <div className="kart giris-karti">
          <h3>Sizi Tanıyalım</h3>
          <input type="text" placeholder="Adınız nedir?" value={isim}
            onChange={(e) => setIsim(e.target.value)} className="isim-kutusu" />
        </div>

        {/* --- YENİ KART: YAPILACAKLAR LİSTESİ --- */}
        <div className="kart">
          <h3>Yapılacaklar Listesi</h3>
          
          <div className="liste-giris">
            <input 
              type="text" 
              placeholder="Yeni görev yaz..." 
              value={yeniGorev}
              onChange={(e) => setYeniGorev(e.target.value)}
              className="isim-kutusu"
              style={{width: '60%'}} // Biraz daraltalım ki buton sığsın
            />
            <button onClick={gorevEkle} style={{backgroundColor: '#4caf50', color: 'white'}}>Ekle</button>
          </div>

          <ul className="gorev-listesi">
            {/* React'te listeyi ekrana basmanın yolu: .map() */}
            {gorevler.map((gorev, index) => (
              <li key={index} className="gorev-maddesi">
                <span>{gorev}</span>
                <button 
                  onClick={() => gorevSil(index)} 
                  style={{backgroundColor: '#ff6b6b', padding: '5px 10px', fontSize: '12px'}}
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
          
          {/* Görev yoksa mesaj göster */}
          {gorevler.length === 0 && <p style={{fontSize: '12px', color: '#888'}}>Henüz görev eklemediniz.</p>}
        </div>
        {/* --------------------------------------- */}

        <div className="kart">
          <h3>Günün Kedisi</h3>
          <img src={kediResmi} alt="Kedi" className="kedi-resmi" />
          <button onClick={yeniKediGetir}>🔄 Başka Kedi</button>
        </div>

        <div className="kart">
          <h3>Beğeni Sayacı</h3>
          <p>❤️ {begeniSayisi} Beğeni</p>
          <button onClick={begeniArttir}>👍 Beğen</button>
          <button onClick={begeniSifirla} className="sifirla-butonu">🗑️ Sıfırla</button>
        </div>

      </main>

      <footer className="alt-bilgi">
        <p>2024 - React Öğreniyorum</p>
      </footer>
    </div>
  )
}

export default App