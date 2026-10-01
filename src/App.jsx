import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Moon, Sun, Code, ExternalLink, GitCommit, X, Cpu, Wrench, GitBranch } from 'lucide-react';
import './App.css';

const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Welcome to IrvanOS v1.0.0',
    'Type "help" to see available commands.'
  ]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response;

      switch (cmd) {
        case 'help': response = 'Available commands: about, skills, clear'; break;
        case 'about': response = 'Irvan Falasifa Hasan - Lulusan Teknik Informatika UIN Sunan Gunung Djati.'; break;
        case 'skills': response = 'Python, Machine Learning (C5.0, SHAP), IoT (ESP32), Hardware Troubleshooting.'; break;
        case 'clear': setHistory([]); setInput(''); return;
        case '': response = ''; break;
        default: response = `Command not found: ${cmd}`;
      }

      setHistory([...history, `> ${input}`, response].filter(Boolean));
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="terminal-window"
      >
        <div className="terminal-header">
          <span>user@irvan-portfolio: ~</span>
          <button onClick={onClose}><X size={16} /></button>
        </div>
        <div className="terminal-body">
          {history.map((line, i) => <div key={i}>{line}</div>)}
          <div className="terminal-input-line">
            <span>&gt;</span>
            <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    if (darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [darkMode]);

  // Efek pelacak kursor untuk background glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Menggunakan clientX dan clientY agar titiknya presisi dengan kursor layar
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="page-wrapper">
      {/* Efek Spotlight yang mengikuti kursor */}
      <div 
        className="cursor-glow" 
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`
        }} 
      />

      <div className="app-container">
        <nav className="navbar">
          {/* Logo / Brand GitHub di sebelah kiri */}
          <a href="https://github.com/irvanfalasifa" target="_blank" rel="noopener noreferrer" className="nav-brand" title="GitHub Profile">
            <GitBranch size={20} />
            <span>Vannn</span>
          </a>
          <div className="nav-actions">
            <button onClick={() => setIsTerminalOpen(true)} className="icon-btn" title="Open Terminal">
              <TerminalIcon size={18} /> <span className="btn-text">CLI Mode</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="icon-btn theme-toggle">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>

        <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero">
          <h1>Irvan Falasifa Hasan</h1>
          <h2 className="gradient-text">Bridging Data Science, AI, and Software Engineering</h2>
          <p className="hero-desc">
            Mengintegrasikan analitik data, arsitektur frontend-backend, dan pemodelan Machine Learning berskala industri.
            Bersemangat mendorong inovasi melalui Artificial Intelligence, LLM, dan ekosistem komputasi cerdas.
          </p>
        </motion.header>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpItem} className="section">
          <h2 className="section-title">Tentang Saya</h2>
          <div className="card plain-card">
            <p className="text-muted text-justify">
              Saya adalah lulusan Teknik Informatika dari UIN Sunan Gunung Djati dengan fokus pada Data Science, Data Engineering, dan pengembangan model Machine Learning untuk implementasi skala industri. Saya memiliki ketertarikan mendalam terhadap evolusi Artificial Intelligence, khususnya pemanfaatan Large Language Models (LLM) dalam memecahkan kompleksitas sistem modern. Di samping ekosistem data, saya juga memiliki pemahaman komprehensif dalam pengembangan perangkat lunak secara end-to-end, mencakup arsitektur frontend maupun backend.
            </p>
            <p className="text-muted text-justify">
              Pendekatan logis saya tidak hanya berpusat pada perangkat lunak, tetapi juga meluas ke dunia fisik. Di waktu luang, saya sangat menikmati eksplorasi teknologi secara hands-on—mulai dari memprogram mikrokontroler seperti ESP32, melakukan troubleshooting dan reparasi elektronika tingkat komponen, hingga memodifikasi mechanical keyboard. Kombinasi antara keahlian analitik di level algoritma dan pemahaman struktural pada hardware ini membentuk cara saya merancang sistem yang efisien secara holistik.
            </p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="section">
          <h2 className="section-title">Proyek & Eksplorasi</h2>
          <div className="project-grid">
            
            <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="card">
              <div className="card-header">
                <h3><Cpu size={18} className="inline-icon"/> Integrasi Gemini AI API</h3>
                <div className="card-links"><a href="#"><ExternalLink size={16} /></a></div>
              </div>
              <p className="text-muted text-justify">Implementasi chatbot interaktif pada platform website dengan memanfaatkan kapabilitas Natural Language Processing (NLP) dari Gemini AI API. Sistem ini dirancang untuk memberikan respons otomatis dan cerdas guna meningkatkan pengalaman pengguna.</p>
              <div className="tech-stack">
                <span>JavaScript</span> <span>Node.js</span> <span>Vanilla  </span> <span>Gemini AI API</span>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="card">
              <div className="card-header">
                <h3><Code size={18} className="inline-icon"/> Klasifikasi Machine Learning: Prediksi Masa Studi</h3>
                <div className="card-links"><a href="#"><ExternalLink size={16} /></a></div>
              </div>
              <p className="text-muted text-justify">Perancangan model machine learning dengan memanfaatkan Decision Tree C5.0 yang dioptimasi melalui GridSearchCV. Dilengkapi analisis Explainable AI (XAI) menggunakan SHAP untuk interpretasi faktor dominan secara komputasional.</p>
              <div className="tech-stack">
                <span>Python</span> <span>Scikit-Learn</span> <span>SHAP</span> <span>SMOTE</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="card">
              <div className="card-header">
                <h3><Code size={18} className="inline-icon"/> SIMKAPAI</h3>
                <div className="card-links"><a href="#"><ExternalLink size={16} /></a></div>
              </div>
              <p className="text-muted text-justify">Pengembangan aplikasi web internal instansi untuk kebutuhan digitalisasi dan pengarsipan dokumen kegiatan. Dilengkapi dengan fitur manajemen basis data terpusat untuk memudahkan pelacakan arsip dan meningkatkan efisiensi administrasi.</p>
              <div className="tech-stack">
                <span>Laravel</span> <span>PHP</span> <span>CSS</span>
              </div>
            </motion.div>            

            <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="card">
              <div className="card-header">
                <h3><Wrench size={18} className="inline-icon"/> Hardware Troubleshooting</h3>
              </div>
              <p className="text-muted text-justify">Troubleshooting tingkat komponen pada unit catu daya dan perangkat seluler menggunakan pengujian sirkuit dan multimeter.</p>
              <div className="tech-stack">
                <span>Multimeter</span> <span>Soldering</span> <span>PSU</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="card">
              <div className="card-header">
                <h3><Cpu size={18} className="inline-icon"/> Otomatisasi ESP32</h3>
                <div className="card-links"><a href="#"><ExternalLink size={16} /></a></div>
              </div>
              <p className="text-muted text-justify">Eksplorasi dan konfigurasi pinout mikrokontroler menggunakan platform ESP32 dan ATtiny85 yang terintegrasi dengan modul Wi-Fi.</p>
              <div className="architecture-diagram">
                <code>[Sensor] &rarr; [ESP32 Node] &harr; [Wi-Fi]</code>
              </div>
              <div className="tech-stack">
                <span>ESP32</span> <span>ATtiny85</span> <span>C++</span>
              </div>
            </motion.div>

          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpItem} className="section">
          <h2 className="section-title">Aktivitas Terbaru</h2>
          <div className="activity-list">
            <div className="activity-item">
              <GitCommit size={16} className="activity-icon" />
              <span>Push pembaruan model klasifikasi dan interpretasi SHAP ke <strong>thesis-ml-c50</strong></span>
            </div>
            <div className="activity-item">
              <GitCommit size={16} className="activity-icon" />
              <span>Analisis komponen Schottky dioda pada power supply unit selesai.</span>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Irvan Falasifa Hasan. Built with React & Vite.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;